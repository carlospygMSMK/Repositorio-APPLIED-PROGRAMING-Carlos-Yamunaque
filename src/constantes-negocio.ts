/*  Define las provincias y combustibles de interés según la política empresarial.*/

/* Combustibles de interés para la empresa */
export const COMBUSTIBLES_INTERES = ['Gasóleo A', 'Gasolina 95 E5'] as const;

/* Tipo derivado de los combustibles de interés */
export type CombustibleInteres = typeof COMBUSTIBLES_INTERES[number];

/*   Provincias de interés para la empresa */
export const PROVINCIAS_INTERES = ['Madrid', 'Coruña', 'Tenerife', 'Badajoz'] as const;

/* Tipo derivado de las provincias de interés */
export type ProvinciaInteres = typeof PROVINCIAS_INTERES[number];

/* Mapa de normalización: convierte el nombre de provincia del JSON del Ministerio
 * al nombre interno usado en la aplicación */
export const MAPA_NORMALIZACION_PROVINCIAS: Record<string, ProvinciaInteres> = {
  'Madrid': 'Madrid',
  'Coruña (A)': 'Coruña',
  'Santa Cruz de Tenerife': 'Tenerife',
  'Badajoz': 'Badajoz',
};

/* Provincias del Ministerio que nos interesan */
export const PROVINCIAS_MINISTERIO = Object.keys(MAPA_NORMALIZACION_PROVINCIAS);
