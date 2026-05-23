export interface POJO {
    [key: string]: unknown;
}
export declare class Item {
    private readonly numeroFila;
    private readonly datos;
    constructor(numeroFila: number, datos: POJO);
    obtenerNumeroFila(): number;
    obtenerDatos(): POJO;
}
/**
 * Clase abstracta base para lectores de archivos.
 * Define el contrato que todo lector debe cumplir.
 * @typeParam T - El tipo de datos que retorna el método `leer()`
 */
export declare abstract class LectorAbstracto<T> {
    private readonly ruta;
    protected readonly flujoData: string;
    constructor(ruta: string);
    obtenerRuta(): string;
    /**
     * Lee y procesa el contenido del fichero.
     * Debe ser implementado por las subclases.
     *
     * @returns Los datos procesados en la estructura de dominio correspondiente
     * @throws Error si hay problemas en el procesado
     */
    abstract leer(): T;
}
//# sourceMappingURL=lector-abstracto.d.ts.map