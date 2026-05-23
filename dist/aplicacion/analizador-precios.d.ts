/**
 * analizador-precios.ts
 * Servicio que analiza los datos de precios para generar estadísticas.
 */
import type { DatosMinisterio } from '../dominio/datos-ministerio.interface.js';
import type { InformeDiario } from '../dominio/informe-diario.interface.js';
import type { DatosGraficaDias } from '../dominio/datos-grafica.interface.js';
/**
 * Servicio para analizar datos de precios y generar informes.
 * Implementa el Patrón Strategy para diferentes tipos de análisis.
 */
export declare class AnalizadorPrecios {
    /**
     * Nombres de los días de la semana para las gráficas.
     */
    private static readonly NOMBRES_DIAS;
    /**
     * Genera un informe diario completo con estadísticas y tops.
     *
     * @param datos - Datos del Ministerio procesados
     * @returns Informe diario generado
     */
    generarInformeDiario(datos: DatosMinisterio): InformeDiario;
    /**
     * Genera datos para gráficas de tendencias diarias (Hito 3).
     * Agrupa los precios por día de la semana y calcula promedios.
     *
     * @param datos - Datos del Ministerio
     * @returns Array de datos de gráficas para cada combustible y provincia
     */
    generarDatosGraficas(datos: DatosMinisterio): DatosGraficaDias[];
    /**
     * Calcula estadísticas de precios para cada combustible y provincia.
     *
     * @param datos - Datos del Ministerio
     * @returns Array de estadísticas calculadas
     */
    private calcularEstadisticas;
    /**
     * Obtiene el top 5 de estaciones más caras.
     *
     * @param datos - Datos del Ministerio
     * @returns Top 5 estaciones más caras
     */
    private obtenerTop5Caras;
    /**
     * Obtiene el top 5 de estaciones más baratas.
     *
     * @param datos - Datos del Ministerio
     * @returns Top 5 estaciones más baratas
     */
    private obtenerTop5Baratas;
    /**
     * Agrupa los datos por día de la semana.
     */
    private agruparPorDiaSemana;
    /**
     * Calcula el promedio por día de la semana.
     */
    private calcularPromedioPorDia;
    /**
     * Calcula el promedio general de todos los días.
     */
    private calcularPromedioGeneral;
    /**
     * Obtiene el precio de un combustible específico de una estación.
     *
     * @param estacion - Estación de servicio
     * @param combustible - Nombre del combustible
     * @returns Precio o null si no disponible
     */
    private obtenerPrecioCombustible;
}
//# sourceMappingURL=analizador-precios.d.ts.map