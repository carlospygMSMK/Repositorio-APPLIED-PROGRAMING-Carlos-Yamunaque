/**
 * generador-informe-texto.ts
 * Generador que crea un informe en formato texto legible.
 */
import type { InformeDiario } from '../dominio/informe-diario.interface.js';
/**
 * Generador de informes en formato texto.
 * Implementa una estrategia de formateo legible para terminal/archivo.
 */
export declare class GeneradorInformeTexto {
    /**
     * Genera un informe en formato texto.
     *
     * @param informe - Informe diario a formatear
     * @returns String formateado con el informe
     */
    generar(informe: InformeDiario): string;
}
//# sourceMappingURL=generador-informe-texto.d.ts.map