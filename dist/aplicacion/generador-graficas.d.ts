/**
 * generador-graficas.ts
 * Genera gráficas de barras con datos de tendencias de precios
 * Hito 3: Visualización de datos
 */
import type { DatosGraficaDias, ConfiguracionGrafica, ResultadoGrafica } from '../dominio/datos-grafica.interface.js';
/**
 * Servicio para generar gráficas en formato JSON y SVG
 * En una aplicación real usaría Chart.js o D3.js
 */
export declare class GeneradorGraficas {
    /**
     * Genera una gráfica en formato JSON (datos crudos)
     *
     * @param datos - Datos de la gráfica
     * @param config - Configuración (tamaño, título, etc.)
     * @returns Resultado con ruta del archivo generado
     */
    generarJSON(datos: DatosGraficaDias, config: ConfiguracionGrafica): Promise<ResultadoGrafica>;
    /**
     * Genera una gráfica en formato SVG (vector)
     *
     * @param datos - Datos de la gráfica
     * @param config - Configuración
     * @returns Resultado con ruta del archivo
     */
    generarSVG(datos: DatosGraficaDias, config: ConfiguracionGrafica): Promise<ResultadoGrafica>;
    /**
     * Crea el código SVG de una gráfica de barras
     *
     * @param datos - Datos a visualizar
     * @param config - Configuración
     * @returns String con código SVG
     */
    private crearSVG;
    /**
     * Valida que la configuración sea correcta
     */
    validarConfiguracion(config: ConfiguracionGrafica): boolean;
}
//# sourceMappingURL=generador-graficas.d.ts.map