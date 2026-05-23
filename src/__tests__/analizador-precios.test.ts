/**
 * analizador-precios.test.ts
 * Suite de tests para el analizador de precios.
 */

import { AnalizadorPrecios } from '../aplicacion/analizador-precios';
import type { DatosMinisterio } from '../dominio/datos-ministerio.interface';
import type { EstacionServicio } from '../dominio/estacion-servicio.interface';

describe('AnalizadorPrecios', () => {
  let analizador: AnalizadorPrecios;

  beforeEach(() => {
    analizador = new AnalizadorPrecios();
  });

  // Datos de prueba
  const crearEstacion = (
    id: string,
    provincia: string,
    gasoleoA: number | null,
    gasolina95E5: number | null,
  ): EstacionServicio => ({
    id,
    rotulo: `Estación ${id}`,
    direccion: 'Calle Test',
    localidad: 'Test City',
    municipio: 'Test Municipality',
    provincia,
    codigoPostal: '28000',
    latitud: 40.0,
    longitud: -3.0,
    horario: '24h',
    margen: '5%',
    precios: {
      gasoleoA,
      gasolina95E5,
    },
  });

  describe('generarInformeDiario', () => {
    it('debe generar un informe válido', () => {
      const datos: DatosMinisterio = {
        fecha: new Date('2026-03-31'),
        estaciones: [
          crearEstacion('1', 'Madrid', 1.5, 1.4),
          crearEstacion('2', 'Madrid', 1.6, 1.45),
          crearEstacion('3', 'Coruña', 1.55, 1.42),
        ],
      };

      const informe = analizador.generarInformeDiario(datos);

      expect(informe.fecha).toEqual(new Date('2026-03-31'));
      expect(informe.estadisticas).toBeDefined();
      expect(informe.top5Caras).toBeDefined();
      expect(informe.top5Baratas).toBeDefined();
    });

    it('debe calcular correctamente el precio promedio', () => {
      const datos: DatosMinisterio = {
        fecha: new Date(),
        estaciones: [
          crearEstacion('1', 'Madrid', 1.0, null),
          crearEstacion('2', 'Madrid', 3.0, null),
          crearEstacion('3', 'Madrid', 2.0, null),
        ],
      };

      const informe = analizador.generarInformeDiario(datos);
      const stat = informe.estadisticas.find(
        (s) => s.provincia === 'Madrid' && s.combustible === 'Gasóleo A',
      );

      expect(stat).toBeDefined();
      expect(stat?.precioPromedio).toBe(2.0);
      expect(stat?.precioMinimo).toBe(1.0);
      expect(stat?.precioMaximo).toBe(3.0);
      expect(stat?.numEstacionesConPrecio).toBe(3);
    });

    it('debe ignorar estaciones sin el combustible disponible', () => {
      const datos: DatosMinisterio = {
        fecha: new Date(),
        estaciones: [
          crearEstacion('1', 'Madrid', 1.5, null),
          crearEstacion('2', 'Madrid', null, 1.4),
          crearEstacion('3', 'Madrid', 1.55, null),
        ],
      };

      const informe = analizador.generarInformeDiario(datos);
      const statGasoleo = informe.estadisticas.find(
        (s) => s.provincia === 'Madrid' && s.combustible === 'Gasóleo A',
      );

      expect(statGasoleo?.numEstacionesConPrecio).toBe(2);
    });

    it('debe obtener correctamente el top 5 más caro', () => {
      const datos: DatosMinisterio = {
        fecha: new Date(),
        estaciones: [
          crearEstacion('1', 'Madrid', 1.5, null),
          crearEstacion('2', 'Madrid', 1.6, null),
          crearEstacion('3', 'Madrid', 1.7, null),
          crearEstacion('4', 'Madrid', 1.8, null),
          crearEstacion('5', 'Madrid', 1.9, null),
          crearEstacion('6', 'Madrid', 1.4, null),
        ],
      };

      const informe = analizador.generarInformeDiario(datos);

      expect(informe.top5Caras.length).toBeGreaterThan(0);
      if (informe.top5Caras.length > 1) {
        const primero = informe.top5Caras[0];
        const segundo = informe.top5Caras[1];
        expect(primero).toBeDefined();
        expect(segundo).toBeDefined();
        if (primero && segundo) {
          expect(primero.precio).toBeGreaterThanOrEqual(segundo.precio);
        }
      }
    });

    it('debe obtener correctamente el top 5 más barato', () => {
      const datos: DatosMinisterio = {
        fecha: new Date(),
        estaciones: [
          crearEstacion('1', 'Madrid', 1.5, null),
          crearEstacion('2', 'Madrid', 1.6, null),
          crearEstacion('3', 'Madrid', 1.7, null),
          crearEstacion('4', 'Madrid', 1.8, null),
          crearEstacion('5', 'Madrid', 1.9, null),
          crearEstacion('6', 'Madrid', 1.4, null),
        ],
      };

      const informe = analizador.generarInformeDiario(datos);

      expect(informe.top5Baratas.length).toBeGreaterThan(0);
      if (informe.top5Baratas.length > 1) {
        const primero = informe.top5Baratas[0];
        const segundo = informe.top5Baratas[1];
        expect(primero).toBeDefined();
        expect(segundo).toBeDefined();
        if (primero && segundo) {
          expect(primero.precio).toBeLessThanOrEqual(segundo.precio);
        }
      }
    });
  });
});
