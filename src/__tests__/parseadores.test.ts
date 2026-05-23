/**
 * parseadores.test.ts
 * Suite de tests para las funciones de parseado.
 */

import { parsearPrecio, parsearCoordenada, parsearFecha } from '../infraestructura/parseadores';

describe('Parseadores', () => {
  describe('parsearPrecio', () => {
    it('debe parsear un precio válido en formato español', () => {
      expect(parsearPrecio('1,539')).toBe(1.539);
    });

    it('debe parsear precios con múltiples decimales', () => {
      expect(parsearPrecio('1,23456')).toBe(1.23456);
    });

    it('debe retornar null para string vacío', () => {
      expect(parsearPrecio('')).toBeNull();
    });

    it('debe retornar null para string con solo espacios', () => {
      expect(parsearPrecio('   ')).toBeNull();
    });

    it('debe retornar null para string inválido', () => {
      expect(parsearPrecio('abc')).toBeNull();
    });

    it('debe parsear precios con espacios', () => {
      expect(parsearPrecio('  1,539  ')).toBe(1.539);
    });
  });

  describe('parsearCoordenada', () => {
    it('debe parsear una coordenada válida', () => {
      expect(parsearCoordenada('40,425660')).toBe(40.42566);
    });

    it('debe retornar 0 para string vacío', () => {
      expect(parsearCoordenada('')).toBe(0);
    });

    it('debe retornar 0 para string inválido', () => {
      expect(parsearCoordenada('abc')).toBe(0);
    });

    it('debe parsear coordenadas negativas', () => {
      expect(parsearCoordenada('-40,425660')).toBe(-40.42566);
    });
  });

  describe('parsearFecha', () => {
    it('debe parsear una fecha válida en formato DD/MM/YYYY HH:mm:ss', () => {
      const fecha = parsearFecha('31/03/2026 08:30:00');
      expect(fecha.getDate()).toBe(31);
      expect(fecha.getMonth()).toBe(2); // Marzo
      expect(fecha.getFullYear()).toBe(2026);
      expect(fecha.getHours()).toBe(8);
      expect(fecha.getMinutes()).toBe(30);
    });

    it('debe retornar fecha actual para string inválido', () => {
      const fecha = parsearFecha('invalid');
      const ahora = new Date();
      // Verificar que es aproximadamente ahora
      expect(Math.abs(fecha.getTime() - ahora.getTime())).toBeLessThan(1000);
    });

    it('debe retornar fecha actual para string vacío', () => {
      const fecha = parsearFecha('');
      const ahora = new Date();
      expect(Math.abs(fecha.getTime() - ahora.getTime())).toBeLessThan(1000);
    });
  });
});
