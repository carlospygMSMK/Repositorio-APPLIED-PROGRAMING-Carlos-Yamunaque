/*
 * types.ts Definición de tipos TypeScript para el procesado de datos de precios de combustibles del 
 * Ministerio La estructura refleja el formato del servicio REST:
 * https://sedeaplicaciones.minetur.gob.es/ServiciosRESTCarburantes/PreciosCarburantes/EstacionesTerrestres/
 */

/* Precio en formato español: "1,539" → number o vacío si no disponible. */
export type PrecioStr = string;
/* Combustibles de interés para la empresa */
export type CombustibleInteres = 'Gasoleo A' | 'Gasolina 95 E5';
/* Provincias de interés para la empresa */
export type ProvinciaInteres = 'Madrid' | 'Coruña' | 'Tenerife' | 'Badajoz';

// Estructura raw del JSON del Ministerio

/* EstacionServicioRaw: Los nombres de las propiedades reproducen exactamente los del JSON original (incluyendo espacios y caracteres especiales), por lo que debemos acceder a ellas con
notación de corchetes.*/
export interface EstacionServicioRaw {
  'C.P.': string;
  'Dirección': string;
  'Horario': string;
  'Latitud': string;
  'Localidad': string;
  'Longitud (WGS84)': string;
  'Margen': string;
  'Municipio': string;
  'Precio Biodiesel': PrecioStr;
  'Precio Bioetanol': PrecioStr;
  'Precio Gas Natural Comprimido': PrecioStr;
  'Precio Gas Natural Licuado': PrecioStr;
  'Precio Gases licuados del petróleo': PrecioStr;
  'Precio Gasoleo A': PrecioStr;
  'Precio Gasoleo B': PrecioStr;
  'Precio Gasoleo Premium': PrecioStr;
  'Precio Gasolina 95 E10': PrecioStr;
  'Precio Gasolina 95 E5': PrecioStr;
  'Precio Gasolina 95 E5 Premium': PrecioStr;
  'Precio Gasolina 98 E10': PrecioStr;
  'Precio Gasolina 98 E5': PrecioStr;
  'Precio Hidrogeno': PrecioStr;
  'Provincia': string;
  'Remisión': string;
  'Rótulo': string;
  'Tipo Venta': string;
  '% BioEtanol': string;
  '% Éster metílico': string;
  'IDEESS': string;
  'IDMunicipio': string;
  'IDProvincia': string;
  'IDCCAA': string;
}

/*RespuestaMinisterioRaw: Estructura raíz del JSON devuelto por la API del Ministerio.*/
export interface RespuestaMinisterioRaw {
  /* Fecha y hora de la consulta en formato "DD/MM/YYYY HH:mm:ss" */
  Fecha: string;
  /* Lista de estaciones de servicio con sus precios */
  ListaEESSPrecio: EstacionServicioRaw[];
}

// Estructuras de dominio (procesadas)

/*PreciosCombustible: Mapa de precios ya convertidos a number (o null si no disponibles) para los combustibles de interés.*/
export interface PreciosCombustible {
  gasoleoA: number | null;
  gasolina95E5: number | null;
}

/* EstacionServicio: Representación limpia y tipada de una estación de servicio, derivada de EstacionServicioRaw tras el parseo.*/
export interface EstacionServicio {
  id: string;
  rotulo: string;
  direccion: string;
  localidad: string;
  municipio: string;
  provincia: string;
  codigoPostal: string;
  latitud: number;
  longitud: number;
  horario: string;
  margen: string;
  precios: PreciosCombustible;
}

/*DatosMinisterio: Resultado final del procesado: fecha de consulta y lista de estaciones filtradas por provincias de interés.*/
export interface DatosMinisterio {
  fecha: Date;
  estaciones: EstacionServicio[];
}
