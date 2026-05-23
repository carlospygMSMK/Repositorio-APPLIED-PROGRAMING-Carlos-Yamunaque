/* Define la clase abstracta base para todos los lectores de archivos */
import fs from 'node:fs';
/* Envuelve datos POJO junto con su número de línea para trazabilidad */
export class Item {
    constructor(numeroFila, datos) {
        this.numeroFila = numeroFila;
        this.datos = datos;
    }
    obtenerNumeroFila() {
        return this.numeroFila;
    }
    obtenerDatos() {
        return this.datos;
    }
}
/**
 * Clase abstracta base para lectores de archivos.
 * Define el contrato que todo lector debe cumplir.
 * @typeParam T - El tipo de datos que retorna el método `leer()`
 */
export class LectorAbstracto {
    constructor(ruta) {
        this.ruta = ruta;
        try {
            this.flujoData = fs.readFileSync(ruta, 'utf-8');
        }
        catch (error) {
            const mensaje = error instanceof Error ? error.message : String(error);
            throw new Error(`No se pudo leer el fichero "${ruta}": ${mensaje}`);
        }
    }
    obtenerRuta() {
        return this.ruta;
    }
}
//# sourceMappingURL=lector-abstracto.js.map