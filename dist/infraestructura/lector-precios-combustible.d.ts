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
import type { DatosMinisterio } from '../dominio/datos-ministerio.interface.js';
/**
 * Lector especializado para procesar el JSON de precios de combustibles del Ministerio.
 */
export declare class LectorPreciosCombustible extends LectorAbstracto<DatosMinisterio> {
    /**
     * Lee el fichero JSON, valida su estructura y devuelve los datos procesados.
     *
     * @returns Datos del Ministerio procesados y filtrados por provincias de interés
     * @throws Error si el JSON no tiene la estructura esperada
     */
    leer(): DatosMinisterio;
    /**
     * Valida que el JSON tenga la estructura mínima esperada.
     *
     * @param raw - Objeto raw para validar
     * @throws Error si la validación falla
     */
    private validarRaw;
}
//# sourceMappingURL=lector-precios-combustible.d.ts.map