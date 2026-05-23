/**
 * exportador-reportes.ts
 * Exporta informes a CSV, JSON, y otros formatos
 * Hito 3: Exportación de datos
 */
import type { InformeDiario } from '../dominio/informe-diario.interface.js';
/**
 * Servicio para exportar informes a diferentes formatos
 */
export declare class ExportadorReportes {
    /**
     * Exporta el informe a CSV (comma-separated values)
     * Formato para Excel/Sheets
     *
     * @param informe - Informe a exportar
     * @param rutaSalida - Dónde guardar el archivo
     * @returns Promesa que se resuelve cuando se guarda
     */
    exportarCSV(informe: InformeDiario, rutaSalida: string): Promise<void>;
    /**
     * Exporta el informe a JSON (formato estructurado)
     *
     * @param informe - Informe a exportar
     * @param rutaSalida - Dónde guardar el archivo
     * @returns Promesa que se resuelve cuando se guarda
     */
    exportarJSON(informe: InformeDiario, rutaSalida: string): Promise<void>;
    /**
     * Exporta el informe a HTML (para ver en navegador)
     *
     * @param informe - Informe a exportar
     * @param rutaSalida - Dónde guardar el archivo
     * @returns Promesa que se resuelve cuando se guarda
     */
    exportarHTML(informe: InformeDiario, rutaSalida: string): Promise<void>;
    /**
     * Valida que la ruta de salida sea válida
     */
    validarRutaSalida(ruta: string): Promise<boolean>;
}
//# sourceMappingURL=exportador-reportes.d.ts.map