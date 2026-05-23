/**
 * precios-combustible.interface.ts
 * Define la estructura de precios de combustibles para los tipos de interés.
 */

/**
 * Interfaz que encapsula los precios de los combustibles de interés para la empresa.
 * Los precios pueden ser null si no están disponibles en la estación.
 */
export interface PreciosCombustible {
  /** Precio del Gasóleo A en €/L, o null si no disponible */
  gasoleoA: number | null;

  /** Precio de Gasolina 95 E5 en €/L, o null si no disponible */
  gasolina95E5: number | null;
}
