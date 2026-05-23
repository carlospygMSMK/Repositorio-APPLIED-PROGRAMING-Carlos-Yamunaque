/**
 * datos-grafica.interface.ts
 * Define las estructuras para datos de gráficas (Hito 3).
 */
/**
 * Dato de una barra en la gráfica.
 */
export interface DatoBarraDia {
    /** Día de la semana (lunes, martes, etc.) */
    dia: string;
    /** Precio promedio para ese día */
    precioPromedio: number;
    /** Número de estaciones con datos para ese día */
    numEstaciones: number;
}
/**
 * Conjunto de datos para una gráfica de barras por día de la semana.
 */
export interface DatosGraficaDias {
    /** Combustible (ej. "Gasóleo A") */
    combustible: string;
    /** Provincia */
    provincia: string;
    /** Datos para cada día de la semana */
    diasSemana: DatoBarraDia[];
    /** Mes analizado (1-12) */
    mes: number;
    /** Año analizado */
    anio: number;
    /** Precio promedio general para el período */
    precioPromedioGeneral: number;
}
/**
 * Configuración para la generación de una gráfica.
 */
export interface ConfiguracionGrafica {
    /** Ancho en píxeles */
    ancho: number;
    /** Alto en píxeles */
    alto: number;
    /** Título de la gráfica */
    titulo: string;
    /** Etiqueta del eje Y */
    etiquetaY: string;
    /** Color de las barras (hex) */
    colorBarras: string;
    /** Formato de salida: 'png', 'svg', 'json' */
    formato: 'png' | 'svg' | 'json';
    /** Ruta de salida */
    rutaSalida: string;
}
/**
 * Resultado de la generación de una gráfica.
 */
export interface ResultadoGrafica {
    /** Ruta del archivo generado */
    rutaArchivo: string;
    /** Formato generado */
    formato: string;
    /** Tamaño del archivo en bytes */
    tamanio: number;
    /** Timestamp de generación */
    timestamp: Date;
    /** Éxito o error */
    exito: boolean;
    /** Mensaje de error (si aplica) */
    error?: string;
}
//# sourceMappingURL=datos-grafica.interface.d.ts.map