/*
 * Este es el lector concreto que procesa el fichero JSON del Ministerio para lat ransición Ecológica con los precios de combustibles de todas las
 * estaciones de servicio de España.
 *
 * Responsabilidades (Hito 1):
 *  1. Leer el fichero JSON desde disco.
 *  2. Validar la estructura mínima esperada.
 *  3. Parsear los campos numéricos (precios con coma decimal española).
 *  4. Filtrar las estaciones de las provincias de interés.
 *  5. Devolver la estructura DatosMinisterio lista para informes.
 */

import { AbstractReader } from './abstract-reader.js';
import type {
  RespuestaMinisterioRaw,
  EstacionServicioRaw,
  EstacionServicio,
  DatosMinisterio,
  ProvinciaInteres,
} from './types.js';

// Constantes de configuración de negocio

/*
 * Provincias de interés para la empresa distribuidora. Los valores coinciden con el campo "Provincia" del JSON del Ministerio.
 * Nota: La Coruña aparece como "Coruña (A)" en el dataset oficial.
 */
export const PROVINCIAS_INTERES: readonly string[] = [
  'Madrid',
  'Coruña (A)',
  'Santa Cruz de Tenerife',
  'Badajoz',
];

/*Mapa de normalización: convierte el nombre de provincia del dataset al nombre interno usado en la aplicación.*/
export const MAPA_PROVINCIAS: Readonly<Record<string, ProvinciaInteres>> = {
  'Madrid': 'Madrid',
  'Coruña (A)': 'Coruña',
  'Santa Cruz de Tenerife': 'Tenerife',
  'Badajoz': 'Badajoz',
};

// Helpers de parseo
/*Convierte un precio en formato español ("1,539") a número flotante. Devuelve null si el string está vacío o no es un número válido.*/
function parsePrecio(precioStr: string): number | null {
  if (!precioStr || precioStr.trim() === '') return null;
  const normalised = precioStr.trim().replace(',', '.');
  const value = parseFloat(normalised);
  return isNaN(value) ? null : value;
}

/*Convierte una coordenada en formato español ("40,425660") a número. Devuelve 0 si el string es inválido.*/
function parseCoordenada(coordStr: string): number {
  if (!coordStr || coordStr.trim() === '') return 0;
  const normalised = coordStr.trim().replace(',', '.');
  const value = parseFloat(normalised);
  return isNaN(value) ? 0 : value;
}

/*Parsea la fecha del Ministerio "DD/MM/YYYY HH:mm:ss" a objeto Date.*/
function parseFecha(fechaStr: string): Date {
  // Formato: "31/03/2026 08:30:00"
  const [datePart, timePart] = fechaStr.split(' ');
  if (!datePart) return new Date();
  const [day, month, year] = (datePart).split('/');
  const isoStr = `${year}-${month}-${day}T${timePart ?? '00:00:00'}`;
  const date = new Date(isoStr);
  return isNaN(date.getTime()) ? new Date() : date;
}

// Mapeo de raw → dominio
/*Transforma una EstacionServicioRaw en una EstacionServicio de dominio.*/
function mapEstacion(raw: EstacionServicioRaw): EstacionServicio {
  return {
    id: raw['IDEESS'],
    rotulo: raw['Rótulo'],
    direccion: raw['Dirección'],
    localidad: raw['Localidad'],
    municipio: raw['Municipio'],
    provincia: MAPA_PROVINCIAS[raw['Provincia']] ?? raw['Provincia'],
    codigoPostal: raw['C.P.'],
    latitud: parseCoordenada(raw['Latitud']),
    longitud: parseCoordenada(raw['Longitud (WGS84)']),
    horario: raw['Horario'],
    margen: raw['Margen'],
    precios: {
      gasoleoA: parsePrecio(raw['Precio Gasoleo A']),
      gasolina95E5: parsePrecio(raw['Precio Gasolina 95 E5']),
    },
  };
}

// FuelPriceReader
/* Lee y procesa el fichero JSON de precios de combustibles extiende `AbstractReader<DatosMinisterio>` e implementa `read()`.*/
export class FuelPriceReader extends AbstractReader<DatosMinisterio> {
/*
* Lee el fichero JSON, valida su estructura y devuelve los datos procesados filtrados por las provincias de interés.
* @throws Error si el JSON no tiene la estructura esperada.
*/
  public read(): DatosMinisterio {
    let raw: RespuestaMinisterioRaw;

    try {
      raw = JSON.parse(this.dataStream) as RespuestaMinisterioRaw;
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      throw new Error(`Error al parsear el JSON: ${msg}`);
    }

    this.validateRaw(raw);

    const fecha = parseFecha(raw.Fecha);

    const estaciones: EstacionServicio[] = raw.ListaEESSPrecio
      .filter(e => PROVINCIAS_INTERES.includes(e['Provincia']))
      .map(mapEstacion);

    return { fecha, estaciones };
  }

  // Validación
  private validateRaw(raw: unknown): asserts raw is RespuestaMinisterioRaw {
    if (typeof raw !== 'object' || raw === null) {
      throw new Error('El JSON raíz debe ser un objeto.');
    }
    const obj = raw as Record<string, unknown>;
    if (typeof obj['Fecha'] !== 'string') {
      throw new Error('Campo "Fecha" ausente o no es string.');
    }
    if (!Array.isArray(obj['ListaEESSPrecio'])) {
      throw new Error('Campo "ListaEESSPrecio" ausente o no es un array.');
    }
  }
}
