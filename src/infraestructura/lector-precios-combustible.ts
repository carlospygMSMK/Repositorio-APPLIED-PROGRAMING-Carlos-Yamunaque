/**
 * lector-precios-combustible.ts
 * Lector concreto que procesa el JSON del Ministerio de Transición Ecológica.
 *
 * Responsabilidades:
 *  1. Leer el fichero JSON desde disco
 *  2. Validar la estructura mínima esperada
 *  3. Parsear los campos numéricos (precios con coma decimal española)
 *  4. Filtrar las estaciones de las provincias de interés
 *  5. Devolver la estructura DatosMinisterio lista para informes
 */

import { LectorAbstracto } from './lector-abstracto.js';
import { parsearPrecio, parsearCoordenada, parsearFecha } from './parseadores.js';
import type { RespuestaMinisterioRaw, EstacionServicioRaw } from '../raw/respuesta-ministerio.interface.js';
import type { EstacionServicio } from '../dominio/estacion-servicio.interface.js';
import type { DatosMinisterio } from '../dominio/datos-ministerio.interface.js';
import { PROVINCIAS_MINISTERIO, MAPA_NORMALIZACION_PROVINCIAS } from '../constantes-negocio.js';

/**
 * Mapea una estación raw del Ministerio a la estructura de dominio.
 *
 * @param raw - Estación raw del JSON del Ministerio
 * @returns Estación normalizada de dominio
 */
function mapearEstacion(raw: EstacionServicioRaw): EstacionServicio {
  return {
    id: raw['IDEESS'],
    rotulo: raw['Rótulo'],
    direccion: raw['Dirección'],
    localidad: raw['Localidad'],
    municipio: raw['Municipio'],
    provincia: MAPA_NORMALIZACION_PROVINCIAS[raw['Provincia']] ?? raw['Provincia'],
    codigoPostal: raw['C.P.'],
    latitud: parsearCoordenada(raw['Latitud']),
    longitud: parsearCoordenada(raw['Longitud (WGS84)']),
    horario: raw['Horario'],
    margen: raw['Margen'],
    precios: {
      gasoleoA: parsearPrecio(raw['Precio Gasoleo A']),
      gasolina95E5: parsearPrecio(raw['Precio Gasolina 95 E5']),
    },
  };
}

/**
 * Lector especializado para procesar el JSON de precios de combustibles del Ministerio.
 */
export class LectorPreciosCombustible extends LectorAbstracto<DatosMinisterio> {
  /**
   * Lee el fichero JSON, valida su estructura y devuelve los datos procesados.
   *
   * @returns Datos del Ministerio procesados y filtrados por provincias de interés
   * @throws Error si el JSON no tiene la estructura esperada
   */
  leer(): DatosMinisterio {
    let raw: RespuestaMinisterioRaw;

    try {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      raw = JSON.parse(this.flujoData) as RespuestaMinisterioRaw;
    } catch (err: unknown) {
      const mensaje = err instanceof Error ? err.message : String(err);
      throw new Error(`Error al parsear el JSON: ${mensaje}`);
    }

    this.validarRaw(raw);

    const fecha = parsearFecha(raw.Fecha);

    const estaciones: EstacionServicio[] = raw.ListaEESSPrecio
      .filter((e) => PROVINCIAS_MINISTERIO.includes(e['Provincia']))
      .map(mapearEstacion);

    return { fecha, estaciones };
  }

  /**
   * Valida que el JSON tenga la estructura mínima esperada.
   *
   * @param raw - Objeto raw para validar
   * @throws Error si la validación falla
   */
  private validarRaw(raw: unknown): asserts raw is RespuestaMinisterioRaw {
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
