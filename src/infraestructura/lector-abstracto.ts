/* Define la clase abstracta base para todos los lectores de archivos */

import fs from 'node:fs';

/* Plain Old JavaScript Object - mapa de clave:valor genérico */
export interface POJO {
  [key: string]: unknown;
}

/* Envuelve datos POJO junto con su número de línea para trazabilidad */
export class Item {
  private readonly numeroFila: number;
  private readonly datos: POJO;

  constructor(numeroFila: number, datos: POJO) {
    this.numeroFila = numeroFila;
    this.datos = datos;
  }

  obtenerNumeroFila(): number {
    return this.numeroFila;
  }

  obtenerDatos(): POJO {
    return this.datos;
  }
}

/**
 * Clase abstracta base para lectores de archivos.
 * Define el contrato que todo lector debe cumplir.
 * @typeParam T - El tipo de datos que retorna el método `leer()`
 */
export abstract class LectorAbstracto<T> {
  private readonly ruta: string;
  protected readonly flujoData: string;

  constructor(ruta: string) {
    this.ruta = ruta;
    try {
      this.flujoData = fs.readFileSync(ruta, 'utf-8');
    } catch (error: unknown) {
      const mensaje = error instanceof Error ? error.message : String(error);
      throw new Error(`No se pudo leer el fichero "${ruta}": ${mensaje}`);
    }
  }

  obtenerRuta(): string {
    return this.ruta;
  }

  /**
   * Lee y procesa el contenido del fichero.
   * Debe ser implementado por las subclases.
   *
   * @returns Los datos procesados en la estructura de dominio correspondiente
   * @throws Error si hay problemas en el procesado
   */
  abstract leer(): T;
}
