/**
 * informe-diario.interface.ts
 * Define la estructura del informe diario generado por el Hito 2.
 */

import type { EstacionServicio } from '../dominio/estacion-servicio.interface.js';

/**
 * Estadística de precio para un combustible en una provincia.
 */
export interface EstadisticaPrecio {
  /** Nombre del combustible */
  combustible: string;

  /** Provincia */
  provincia: string;

  /** Precio promedio en €/L */
  precioPromedio: number;

  /** Precio mínimo en €/L */
  precioMinimo: number;

  /** Precio máximo en €/L */
  precioMaximo: number;

  /** Número de estaciones con este combustible disponible */
  numEstacionesConPrecio: number;
}

/**
 * Información de una estación en el top (más cara o más barata).
 */
export interface EstacionTop {
  /** Estación de servicio */
  estacion: EstacionServicio;

  /** Precio del combustible en esta estación */
  precio: number;

  /** Tipo de combustible */
  combustible: string;
}

/**
 * Informe diario con análisis de precios.
 */
export interface InformeDiario {
  /** Fecha del informe */
  fecha: Date;

  /** Estadísticas de precios por combustible y provincia */
  estadisticas: EstadisticaPrecio[];

  /** Top 5 estaciones más caras por combustible y provincia */
  top5Caras: EstacionTop[];

  /** Top 5 estaciones más baratas por combustible y provincia */
  top5Baratas: EstacionTop[];
}
