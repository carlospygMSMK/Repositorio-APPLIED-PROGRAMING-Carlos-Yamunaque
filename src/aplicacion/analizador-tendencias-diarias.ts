/**
 * analizador-tendencias-diarias.ts
 * Servicio para analizar tendencias de precios por día de la semana (Hito 3).
 */

import type { DatosMinisterio } from '../dominio/datos-ministerio.interface.js';
import type { DatosGraficaDias, DatoBarraDia } from '../dominio/datos-grafica.interface.js';
import { COMBUSTIBLES_INTERES, PROVINCIAS_INTERES } from '../constantes-negocio.js';

/**
 * Mapa para obtener el nombre del día de la semana.
 */
const NOMBRES_DIAS = [
  'Domingo',
  'Lunes',
  'Martes',
  'Miércoles',
  'Jueves',
  'Viernes',
  'Sábado',
];

/**
 * Servicio que analiza tendencias de precios por día de la semana.
 * Implementa la lógica necesaria para el Hito 3.
 */
export class AnalizadorTendenciasDiarias {
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
  analizarTendenciasMensuales(datos: DatosMinisterio): DatosGraficaDias[] {
    const resultados: DatosGraficaDias[] = [];
    const fecha = datos.fecha;
    const mes = fecha.getMonth() + 1;
    const anio = fecha.getFullYear();

    for (const combustible of COMBUSTIBLES_INTERES) {
      for (const provincia of PROVINCIAS_INTERES) {
        // Agrupar por día de la semana
        const datosPorDia = this.agruparPorDiaSemana(datos, provincia, combustible);

        // Calcular promedios
        const diasSemana = this.calcularPromedioPorDia(datosPorDia);

        // Calcular promedio general
        const precioPromedioGeneral = this.calcularPromedioGeneral(diasSemana);

        if (diasSemana.length > 0) {
          resultados.push({
            combustible,
            provincia,
            diasSemana,
            mes,
            anio,
            precioPromedioGeneral,
          });
        }
      }
    }

    return resultados;
  }

  /**
   * Agrupa los datos por día de la semana.
   *
   * @param datos - Datos del Ministerio
   * @param provincia - Provincia a filtrar
   * @param combustible - Combustible a filtrar
   * @returns Mapa de día de semana a precios
   */
  private agruparPorDiaSemana(
    datos: DatosMinisterio,
    provincia: string,
    combustible: string,
  ): Map<number, number[]> {
    const mapa = new Map<number, number[]>();

    // Inicializar mapa para los 7 días
    for (let i = 0; i < 7; i++) {
      mapa.set(i, []);
    }

    // Agrupar datos por día de la semana
    for (const estacion of datos.estaciones) {
      if (estacion.provincia !== provincia) {
        continue;
      }

      const precio = this.obtenerPrecioCombustible(estacion, combustible);
      if (precio === null) {
        continue;
      }

      // En una implementación real, aquí se analizaría histórico
      // Por ahora, usamos el día actual como ejemplo
      const diaSemana = datos.fecha.getDay();
      const precios = mapa.get(diaSemana) ?? [];
      precios.push(precio);
      mapa.set(diaSemana, precios);
    }

    return mapa;
  }

  /**
   * Calcula el promedio por día de la semana.
   *
   * @param datosPorDia - Mapa de día a precios
   * @returns Array de datos para cada día
   */
  private calcularPromedioPorDia(datosPorDia: Map<number, number[]>): DatoBarraDia[] {
    const diasSemana: DatoBarraDia[] = [];

    for (let i = 0; i < 7; i++) {
      const precios = datosPorDia.get(i);
      if (!precios || precios.length === 0) {
        continue;
      }

      const precioPromedio = precios.reduce((a, b) => a + b, 0) / precios.length;

      diasSemana.push({
        dia: NOMBRES_DIAS[i] ?? 'Desconocido',
        precioPromedio,
        numEstaciones: precios.length,
      });
    }

    return diasSemana;
  }

  /**
   * Calcula el promedio general de todos los días.
   *
   * @param diasSemana - Datos de días
   * @returns Precio promedio general
   */
  private calcularPromedioGeneral(diasSemana: DatoBarraDia[]): number {
    if (diasSemana.length === 0) {
      return 0;
    }

    const suma = diasSemana.reduce((acc, dia) => acc + dia.precioPromedio, 0);
    return suma / diasSemana.length;
  }

  /**
   * Obtiene el precio de un combustible específico de una estación.
   *
   * @param estacion - Estación de servicio
   * @param combustible - Nombre del combustible
   * @returns Precio o null si no disponible
   */
  private obtenerPrecioCombustible(estacion: any, combustible: string): number | null {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    if (combustible === 'Gasóleo A') {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return estacion.precios.gasoleoA;
    }
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    if (combustible === 'Gasolina 95 E5') {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return estacion.precios.gasolina95E5;
    }
    return null;
  }
}
