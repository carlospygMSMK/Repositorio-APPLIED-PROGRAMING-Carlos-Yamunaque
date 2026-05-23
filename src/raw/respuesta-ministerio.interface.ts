/* respuesta-ministerio.interface.ts Define las interfaces para los datos raw del Ministerio. 
Los nombres de propiedades reproducen exactamente los del JSON original*/

/*Tipo para representar precios en formato string (pueden ser "1,539" o vacíos) */
export type PrecioStr = string;

/* Estructura raw de una estación de servicio tal como viene del JSON del Ministerio.
 * Nota: Los nombres de propiedades incluyen espacios y caracteres especiales,
 * por lo que se accede con notación de corchetes */
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

/*Estructura raíz de la respuesta del Ministerio de Transición Ecológica*/
export interface RespuestaMinisterioRaw {
  /* Fecha y hora en formato "DD/MM/YYYY HH:mm:ss" */
  Fecha: string;

  /* Lista de estaciones con sus precios */
  ListaEESSPrecio: EstacionServicioRaw[];
}
