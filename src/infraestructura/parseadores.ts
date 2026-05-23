/* Funciones auxiliares para parsear datos del JSON del Ministerio */

/**
 * Parsea un precio en formato español ("1,539") a número.
 * Devuelve null si el string está vacío o no es válido.
 *
 * @param precioStr - Precio en formato español con coma como separador decimal
 * @returns Precio como número, o null si no disponible
 */
export function parsearPrecio(precioStr: string): number | null {
  if (!precioStr || precioStr.trim() === '') {
    return null;
  }
  const normalizado = precioStr.trim().replace(',', '.');
  const valor = parseFloat(normalizado);
  return Number.isNaN(valor) ? null : valor;
}

/**
 * Parsea una coordenada en formato español ("40,425660") a número.
 * Devuelve 0 si el string es inválido.
 *
 * @param coordStr - Coordenada en formato español
 * @returns Coordenada como número, o 0 si inválida
 */
export function parsearCoordenada(coordStr: string): number {
  if (!coordStr || coordStr.trim() === '') {
    return 0;
  }
  const normalizado = coordStr.trim().replace(',', '.');
  const valor = parseFloat(normalizado);
  return Number.isNaN(valor) ? 0 : valor;
}

/**
 * Parsea la fecha del Ministerio "DD/MM/YYYY HH:mm:ss" a objeto Date.
 *
 * @param fechaStr - Fecha en formato español del Ministerio
 * @returns Objeto Date, o fecha actual si es inválida
 */
export function parsearFecha(fechaStr: string): Date {
  const [datePart, timePart] = fechaStr.split(' ');
  if (!datePart) {
    return new Date();
  }
  const [dia, mes, anio] = datePart.split('/');
  const isoStr = `${anio}-${mes}-${dia}T${timePart ?? '00:00:00'}`;
  const fecha = new Date(isoStr);
  return Number.isNaN(fecha.getTime()) ? new Date() : fecha;
}
