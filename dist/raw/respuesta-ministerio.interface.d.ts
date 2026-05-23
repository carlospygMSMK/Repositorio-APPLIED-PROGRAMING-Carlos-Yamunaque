export type PrecioStr = string;
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
export interface RespuestaMinisterioRaw {
    Fecha: string;
    ListaEESSPrecio: EstacionServicioRaw[];
}
//# sourceMappingURL=respuesta-ministerio.interface.d.ts.map