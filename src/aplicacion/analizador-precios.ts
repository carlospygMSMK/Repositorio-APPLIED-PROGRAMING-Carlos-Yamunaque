/**
 * analizador-precios.ts
 * Servicio que analiza los datos de precios para generar estadísticas.
 */

import type { DatosMinisterio } from '../dominio/datos-ministerio.interface.js';
import type { EstadisticaPrecio, EstacionTop, InformeDiario } from '../dominio/informe-diario.interface.js';
import type { DatosGraficaDias, DatoBarraDia } from '../dominio/datos-grafica.interface.js';
import { COMBUSTIBLES_INTERES, PROVINCIAS_INTERES } from '../constantes-negocio.js';

/**
 * Servicio para analizar datos de precios y generar informes.
 * Implementa el Patrón Strategy para diferentes tipos de análisis.
 */
export class AnalizadorPrecios {
  /**
   * Nombres de los días de la semana para las gráficas.
   */
  private static readonly NOMBRES_DIAS = [
    'Domingo',
    'Lunes',
    'Martes',
    'Miércoles',
    'Jueves',
    'Viernes',
    'Sábado',
  ];

  /**
   * Genera un informe diario completo con estadísticas y tops.
   *
   * @param datos - Datos del Ministerio procesados
   * @returns Informe diario generado
   */
  generarInformeDiario(datos: DatosMinisterio): InformeDiario {
    const estadisticas = this.calcularEstadisticas(datos);
    const top5Caras = this.obtenerTop5Caras(datos);
    const top5Baratas = this.obtenerTop5Baratas(datos);

    return {
      fecha: datos.fecha,
      estadisticas,
      top5Caras,
      top5Baratas,
    };
  }

  /**
   * Genera datos para gráficas de tendencias diarias (Hito 3).
   * Agrupa los precios por día de la semana y calcula promedios.
   *
   * @param datos - Datos del Ministerio
   * @returns Array de datos de gráficas para cada combustible y provincia
   */
  generarDatosGraficas(datos: DatosMinisterio): DatosGraficaDias[] {
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
   * Calcula estadísticas de precios para cada combustible y provincia.
   *
   * @param datos - Datos del Ministerio
   * @returns Array de estadísticas calculadas
   */
  private calcularEstadisticas(datos: DatosMinisterio): EstadisticaPrecio[] {
    const estadisticas: EstadisticaPrecio[] = [];

    for (const combustible of COMBUSTIBLES_INTERES) {
      for (const provincia of PROVINCIAS_INTERES) {
        const estacionesConPrecio = datos.estaciones
          .filter((e) => e.provincia === provincia)
          .map((e) => this.obtenerPrecioCombustible(e, combustible))
          .filter((p) => p !== null) as number[];

        if (estacionesConPrecio.length > 0) {
          const precioPromedio = estacionesConPrecio.reduce((a, b) => a + b, 0) / estacionesConPrecio.length;
          const precioMinimo = Math.min(...estacionesConPrecio);
          const precioMaximo = Math.max(...estacionesConPrecio);

          estadisticas.push({
            combustible,
            provincia,
            precioPromedio,
            precioMinimo,
            precioMaximo,
            numEstacionesConPrecio: estacionesConPrecio.length,
          });
        }
      }
    }

    return estadisticas;
  }

  /**
   * Obtiene el top 5 de estaciones más caras.
   *
   * @param datos - Datos del Ministerio
   * @returns Top 5 estaciones más caras
   */
  private obtenerTop5Caras(datos: DatosMinisterio): EstacionTop[] {
    const estacionesTop: EstacionTop[] = [];

    for (const combustible of COMBUSTIBLES_INTERES) {
      for (const provincia of PROVINCIAS_INTERES) {
        const estaciones = datos.estaciones
          .filter((e) => e.provincia === provincia)
          .map((e) => {
            const precio = this.obtenerPrecioCombustible(e, combustible);
            return precio !== null ? { estacion: e, precio, combustible } : null;
          })
          .filter((item) => item !== null) as EstacionTop[];

        estacionesTop.push(
          ...estaciones
            .sort((a, b) => b.precio - a.precio)
            .slice(0, 5),
        );
      }
    }

    return estacionesTop.sort((a, b) => b.precio - a.precio).slice(0, 5);
  }

  /**
   * Obtiene el top 5 de estaciones más baratas.
   *
   * @param datos - Datos del Ministerio
   * @returns Top 5 estaciones más baratas
   */
  private obtenerTop5Baratas(datos: DatosMinisterio): EstacionTop[] {
    const estacionesTop: EstacionTop[] = [];

    for (const combustible of COMBUSTIBLES_INTERES) {
      for (const provincia of PROVINCIAS_INTERES) {
        const estaciones = datos.estaciones
          .filter((e) => e.provincia === provincia)
          .map((e) => {
            const precio = this.obtenerPrecioCombustible(e, combustible);
            return precio !== null ? { estacion: e, precio, combustible } : null;
          })
          .filter((item) => item !== null) as EstacionTop[];

        estacionesTop.push(
          ...estaciones
            .sort((a, b) => a.precio - b.precio)
            .slice(0, 5),
        );
      }
    }

    return estacionesTop.sort((a, b) => a.precio - b.precio).slice(0, 5);
  }


  /**
   * Agrupa los datos por día de la semana.
   */
  private agruparPorDiaSemana(
    datos: DatosMinisterio,
    provincia: string,
    combustible: string,
  ): Map<number, number[]> {
    const mapa = new Map<number, number[]>();

    for (let i = 0; i < 7; i++) {
      mapa.set(i, []);
    }

    for (const estacion of datos.estaciones) {
      if (estacion.provincia !== provincia) {
        continue;
      }

      const precio = this.obtenerPrecioCombustible(estacion, combustible);
      if (precio === null) {
        continue;
      }

      const diaSemana = datos.fecha.getDay();
      const precios = mapa.get(diaSemana) ?? [];
      precios.push(precio);
      mapa.set(diaSemana, precios);
    }

    return mapa;
  }

  /**
   * Calcula el promedio por día de la semana.
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
        dia: AnalizadorPrecios.NOMBRES_DIAS[i] ?? 'Desconocido',
        precioPromedio,
        numEstaciones: precios.length,
      });
    }

    return diasSemana;
  }

  /**
   * Calcula el promedio general de todos los días.
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

