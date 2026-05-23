/**
 * exportador-reportes.ts
 * Exporta informes a CSV, JSON, y otros formatos
 * Hito 3: Exportación de datos
 */
import { promises as fs } from 'fs';
/**
 * Servicio para exportar informes a diferentes formatos
 */
export class ExportadorReportes {
    /**
     * Exporta el informe a CSV (comma-separated values)
     * Formato para Excel/Sheets
     *
     * @param informe - Informe a exportar
     * @param rutaSalida - Dónde guardar el archivo
     * @returns Promesa que se resuelve cuando se guarda
     */
    async exportarCSV(informe, rutaSalida) {
        // Encabezados
        let csv = 'Combustible,Provincia,Precio Promedio,Precio Mínimo,Precio Máximo,Num Estaciones\n';
        // Filas de estadísticas
        for (const estadistica of informe.estadisticas) {
            csv += `${estadistica.combustible},"${estadistica.provincia}",${estadistica.precioPromedio.toFixed(3)},${estadistica.precioMinimo.toFixed(3)},${estadistica.precioMaximo.toFixed(3)},${estadistica.numEstacionesConPrecio}\n`;
        }
        // Sección de top 5 caras
        csv += '\n\nTOP 5 ESTACIONES MÁS CARAS\n';
        csv += 'Nombre Estación,Combustible,Precio\n';
        for (const estacion of informe.top5Caras) {
            csv += `"${estacion.estacion.rotulo}",${estacion.combustible},${estacion.precio.toFixed(3)}\n`;
        }
        // Sección de top 5 baratas
        csv += '\n\nTOP 5 ESTACIONES MÁS BARATAS\n';
        csv += 'Nombre Estación,Combustible,Precio\n';
        for (const estacion of informe.top5Baratas) {
            csv += `"${estacion.estacion.rotulo}",${estacion.combustible},${estacion.precio.toFixed(3)}\n`;
        }
        await fs.writeFile(rutaSalida, csv, 'utf-8');
    }
    /**
     * Exporta el informe a JSON (formato estructurado)
     *
     * @param informe - Informe a exportar
     * @param rutaSalida - Dónde guardar el archivo
     * @returns Promesa que se resuelve cuando se guarda
     */
    async exportarJSON(informe, rutaSalida) {
        const contenido = JSON.stringify({
            fecha: informe.fecha.toISOString(),
            estadisticas: informe.estadisticas.map(est => ({
                combustible: est.combustible,
                provincia: est.provincia,
                precioPromedio: parseFloat(est.precioPromedio.toFixed(3)),
                precioMinimo: parseFloat(est.precioMinimo.toFixed(3)),
                precioMaximo: parseFloat(est.precioMaximo.toFixed(3)),
                numEstacionesConPrecio: est.numEstacionesConPrecio,
            })),
            top5Caras: informe.top5Caras.map(est => ({
                estacion: {
                    id: est.estacion.id,
                    rotulo: est.estacion.rotulo,
                    provincia: est.estacion.provincia,
                },
                combustible: est.combustible,
                precio: parseFloat(est.precio.toFixed(3)),
            })),
            top5Baratas: informe.top5Baratas.map(est => ({
                estacion: {
                    id: est.estacion.id,
                    rotulo: est.estacion.rotulo,
                    provincia: est.estacion.provincia,
                },
                combustible: est.combustible,
                precio: parseFloat(est.precio.toFixed(3)),
            })),
        }, null, 2);
        await fs.writeFile(rutaSalida, contenido, 'utf-8');
    }
    /**
     * Exporta el informe a HTML (para ver en navegador)
     *
     * @param informe - Informe a exportar
     * @param rutaSalida - Dónde guardar el archivo
     * @returns Promesa que se resuelve cuando se guarda
     */
    async exportarHTML(informe, rutaSalida) {
        let html = `<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Informe de Precios de Combustibles</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 20px; }
        h1, h2 { color: #333; }
        table { border-collapse: collapse; width: 100%; margin: 20px 0; }
        th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
        th { background-color: #4CAF50; color: white; }
        tr:nth-child(even) { background-color: #f2f2f2; }
        .precio { font-weight: bold; }
        .fecha { color: #666; font-size: 0.9em; }
    </style>
</head>
<body>
    <h1>Informe de Precios de Combustibles</h1>
    <p class="fecha">Generado: ${informe.fecha.toLocaleString('es-ES')}</p>
    
    <h2>Estadísticas por Provincia y Combustible</h2>
    <table>
        <tr>
            <th>Combustible</th>
            <th>Provincia</th>
            <th>Precio Promedio (€/L)</th>
            <th>Precio Mínimo (€/L)</th>
            <th>Precio Máximo (€/L)</th>
            <th>Estaciones</th>
        </tr>
`;
        for (const est of informe.estadisticas) {
            html += `        <tr>
            <td>${est.combustible}</td>
            <td>${est.provincia}</td>
            <td class="precio">${est.precioPromedio.toFixed(3)}</td>
            <td>${est.precioMinimo.toFixed(3)}</td>
            <td>${est.precioMaximo.toFixed(3)}</td>
            <td>${est.numEstacionesConPrecio}</td>
        </tr>
`;
        }
        html += `    </table>
    
    <h2>Top 5 Estaciones Más Caras</h2>
    <table>
        <tr>
            <th>Posición</th>
            <th>Estación</th>
            <th>Combustible</th>
            <th>Precio (€/L)</th>
        </tr>
`;
        informe.top5Caras.forEach((est, indice) => {
            html += `        <tr>
            <td>${indice + 1}</td>
            <td>${est.estacion.rotulo} (${est.estacion.provincia})</td>
            <td>${est.combustible}</td>
            <td class="precio">${est.precio.toFixed(3)}</td>
        </tr>
`;
        });
        html += `    </table>
    
    <h2>Top 5 Estaciones Más Baratas</h2>
    <table>
        <tr>
            <th>Posición</th>
            <th>Estación</th>
            <th>Combustible</th>
            <th>Precio (€/L)</th>
        </tr>
`;
        informe.top5Baratas.forEach((est, indice) => {
            html += `        <tr>
            <td>${indice + 1}</td>
            <td>${est.estacion.rotulo} (${est.estacion.provincia})</td>
            <td>${est.combustible}</td>
            <td class="precio">${est.precio.toFixed(3)}</td>
        </tr>
`;
        });
        html += `    </table>
</body>
</html>`;
        await fs.writeFile(rutaSalida, html, 'utf-8');
    }
    /**
     * Valida que la ruta de salida sea válida
     */
    async validarRutaSalida(ruta) {
        try {
            await fs.access(ruta);
            return true;
        }
        catch {
            // Si no existe, intenta crear la carpeta
            try {
                await fs.mkdir(ruta, { recursive: true });
                return true;
            }
            catch {
                return false;
            }
        }
    }
}
//# sourceMappingURL=exportador-reportes.js.map