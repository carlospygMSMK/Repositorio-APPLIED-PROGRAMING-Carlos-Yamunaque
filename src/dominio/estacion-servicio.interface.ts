/**
 * estacion-servicio.interface.ts
 * Define la estructura de dominio para una estación de servicio.
 */

import type { PreciosCombustible } from './precios-combustible.interface.js';

/**
 * Representación de dominio de una estación de servicio.
 * Contiene todos los datos relevantes tras el procesado y normalización del JSON del Ministerio.
 */
export interface EstacionServicio {
  /** Identificador único de la estación (IDEESS) */
  id: string;

  /** Nombre/rótulo de la estación */
  rotulo: string;

  /** Dirección completa */
  direccion: string;

  /** Localidad/ciudad */
  localidad: string;

  /** Municipio */
  municipio: string;

  /** Provincia */
  provincia: string;

  /** Código postal */
  codigoPostal: string;

  /** Latitud en grados decimales */
  latitud: number;

  /** Longitud en grados decimales */
  longitud: number;

  /** Horario de funcionamiento */
  horario: string;

  /** Margen comercial */
  margen: string;

  /** Precios de los combustibles de interés */
  precios: PreciosCombustible;
}
