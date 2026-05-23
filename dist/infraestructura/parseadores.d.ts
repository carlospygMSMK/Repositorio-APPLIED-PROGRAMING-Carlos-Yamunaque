/**
 * Parsea un precio en formato español ("1,539") a número.
 * Devuelve null si el string está vacío o no es válido.
 *
 * @param precioStr - Precio en formato español con coma como separador decimal
 * @returns Precio como número, o null si no disponible
 */
export declare function parsearPrecio(precioStr: string): number | null;
/**
 * Parsea una coordenada en formato español ("40,425660") a número.
 * Devuelve 0 si el string es inválido.
 *
 * @param coordStr - Coordenada en formato español
 * @returns Coordenada como número, o 0 si inválida
 */
export declare function parsearCoordenada(coordStr: string): number;
/**
 * Parsea la fecha del Ministerio "DD/MM/YYYY HH:mm:ss" a objeto Date.
 *
 * @param fechaStr - Fecha en formato español del Ministerio
 * @returns Objeto Date, o fecha actual si es inválida
 */
export declare function parsearFecha(fechaStr: string): Date;
//# sourceMappingURL=parseadores.d.ts.map