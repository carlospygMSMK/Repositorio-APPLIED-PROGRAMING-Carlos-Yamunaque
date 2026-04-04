/*Define la clase abstracta AbstractReader y la interfaz genérica que deben implementar todos los lectores de datos del proyecto.*/
import fs from 'node:fs';

/*POJO — Plain Old JavaScript Object (clave:valor) Se usa como tipo intermedio antes de la validación y mapeo de dominio.*/
export interface POJO {
  [key: string]: unknown;
}

/*
 * Item: Envuelve un objeto POJO junto con su número de fila, permitiendo trazabilidad durante el procesado.
 */
export class Item {
  private readonly rowNumber: number;
  private readonly data: POJO;

  constructor(rowNumber: number, data: POJO) {
    this.rowNumber = rowNumber;
    this.data = data;
  }

  getRowNumber(): number {
    return this.rowNumber;
  }

  getData(): POJO {
    return this.data;
  }
}

/*
 * AbstractReader<T> Clase base genérica para cualquier lector de fichero.
 * Lee el fichero en el constructor y expone el método abstracto `read()` 
 * que cada subclase debe implementar para devolver los datos en el tipo T deseado.
 * @typeParam T - Tipo de datos que retorna el método `read()`
 */

export abstract class AbstractReader<T> {
  private readonly path: string;
  protected readonly dataStream: string;

  constructor(path: string) {
    this.path = path;
    try {
      this.dataStream = fs.readFileSync(path, 'utf-8');
    } catch (error: unknown) {
      const msg = error instanceof Error ? error.message : String(error);
      throw new Error(`No se pudo leer el fichero "${path}": ${msg}`);
    }
  }

  getPath(): string {
    return this.path;
  }

  /*
   * Lee y procesa el contenido del fichero, devolviendo los datos
   * en la estructura de dominio correspondiente.
   */
  public abstract read(): T;
}