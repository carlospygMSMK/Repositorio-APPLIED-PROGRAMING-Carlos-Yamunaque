/**
 * analizador-tendencias-diarias.ts
 * Servicio para analizar tendencias de precios por día de la semana (Hito 3).
 */
import type { DatosMinisterio } from '../dominio/datos-ministerio.interface.js';
import type { DatosGraficaDias } from '../dominio/datos-grafica.interface.js';
/**
 * Servicio que analiza tendencias de precios por día de la semana.
 * Implementa la lógica necesaria para el Hito 3.
 */
export declare class AnalizadorTendenciasDiarias {
    /**
     * Calcula el precio promedio para cada día de la semana en un mes.
     * Este es un análisis preparatorio para las gráficas del Hito 3.
     *
     * @param datos - Datos del Ministerio procesados
     * @returns Array de datos de gráficas por combustible y provincia
     *
     * @note Esta es una versión simplificada que analiza solo los datos actuales.
     *       En el Hito 3, se extenderá para analizar datos históricos de un mes completo.
     */
    analizarTendenciasMensuales(datos: DatosMinisterio): DatosGraficaDias[];
    /**
     * Agrupa los datos por día de la semana.
     *
     * @param datos - Datos del Ministerio
     * @param provincia - Provincia a filtrar
     * @param combustible - Combustible a filtrar
     * @returns Mapa de día de semana a precios
     */
    private agruparPorDiaSemana;
    /**
     * Calcula el promedio por día de la semana.
     *
     * @param datosPorDia - Mapa de día a precios
     * @returns Array de datos para cada día
     */
    private calcularPromedioPorDia;
    /**
     * Calcula el promedio general de todos los días.
     *
     * @param diasSemana - Datos de días
     * @returns Precio promedio general
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
//# sourceMappingURL=analizador-tendencias-diarias.d.ts.map