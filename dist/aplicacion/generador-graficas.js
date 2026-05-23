/**
 * generador-graficas.ts
 * Genera gráficas de barras con datos de tendencias de precios
 * Hito 3: Visualización de datos
 */
import { promises as fs } from 'fs';
import { join } from 'path';
/**
 * Servicio para generar gráficas en formato JSON y SVG
 * En una aplicación real usaría Chart.js o D3.js
 */
export class GeneradorGraficas {
    /**
     * Genera una gráfica en formato JSON (datos crudos)
     *
     * @param datos - Datos de la gráfica
     * @param config - Configuración (tamaño, título, etc.)
     * @returns Resultado con ruta del archivo generado
     */
    async generarJSON(datos, config) {
        try {
            const contenido = JSON.stringify({
                titulo: config.titulo,
                combustible: datos.combustible,
                provincia: datos.provincia,
                mes: datos.mes,
                anio: datos.anio,
                precioPromedioGeneral: datos.precioPromedioGeneral,
                diasSemana: datos.diasSemana,
            }, null, 2);
            const nombreArchivo = `grafica-${datos.provincia}-${datos.combustible.replace(' ', '_')}-${datos.anio}-${datos.mes}.json`;
            const rutaArchivo = join(config.rutaSalida, nombreArchivo);
            await fs.writeFile(rutaArchivo, contenido, 'utf-8');
            const stats = await fs.stat(rutaArchivo);
            return {
                rutaArchivo,
                formato: 'json',
                tamanio: stats.size,
                timestamp: new Date(),
                exito: true,
            };
        }
        catch (error) {
            return {
                rutaArchivo: '',
                formato: 'json',
                tamanio: 0,
                timestamp: new Date(),
                exito: false,
                error: error instanceof Error ? error.message : 'Error desconocido',
            };
        }
    }
    /**
     * Genera una gráfica en formato SVG (vector)
     *
     * @param datos - Datos de la gráfica
     * @param config - Configuración
     * @returns Resultado con ruta del archivo
     */
    async generarSVG(datos, config) {
        try {
            const svg = this.crearSVG(datos, config);
            const nombreArchivo = `grafica-${datos.provincia}-${datos.combustible.replace(' ', '_')}-${datos.anio}-${datos.mes}.svg`;
            const rutaArchivo = join(config.rutaSalida, nombreArchivo);
            await fs.writeFile(rutaArchivo, svg, 'utf-8');
            const stats = await fs.stat(rutaArchivo);
            return {
                rutaArchivo,
                formato: 'svg',
                tamanio: stats.size,
                timestamp: new Date(),
                exito: true,
            };
        }
        catch (error) {
            return {
                rutaArchivo: '',
                formato: 'svg',
                tamanio: 0,
                timestamp: new Date(),
                exito: false,
                error: error instanceof Error ? error.message : 'Error desconocido',
            };
        }
    }
    /**
     * Crea el código SVG de una gráfica de barras
     *
     * @param datos - Datos a visualizar
     * @param config - Configuración
     * @returns String con código SVG
     */
    crearSVG(datos, config) {
        const anchoGrafica = config.ancho - 100;
        const altoGrafica = config.alto - 150;
        const anchoColumna = anchoGrafica / datos.diasSemana.length;
        const escala = altoGrafica / Math.max(...datos.diasSemana.map(d => d.precioPromedio), 2);
        let svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg width="${config.ancho}" height="${config.alto}" xmlns="http://www.w3.org/2000/svg">
  <rect width="${config.ancho}" height="${config.alto}" fill="white"/>
  
  <!-- Título -->
  <text x="${config.ancho / 2}" y="30" font-size="20" font-weight="bold" text-anchor="middle">
    ${config.titulo}
  </text>
  
  <!-- Eje Y (Precio) -->
  <line x1="50" y1="50" x2="50" y2="${50 + altoGrafica}" stroke="black" stroke-width="2"/>
  <text x="15" y="35" font-size="12" text-anchor="middle">${config.etiquetaY}</text>
  
  <!-- Eje X (Días) -->
  <line x1="50" y1="${50 + altoGrafica}" x2="${50 + anchoGrafica}" y2="${50 + altoGrafica}" stroke="black" stroke-width="2"/>
  
  <!-- Columnas -->
`;
        datos.diasSemana.forEach((dia, indice) => {
            const x = 50 + indice * anchoColumna + anchoColumna / 4;
            const altoColumna = dia.precioPromedio * escala;
            const y = 50 + altoGrafica - altoColumna;
            svg += `  <rect x="${x}" y="${y}" width="${anchoColumna / 2}" height="${altoColumna}" fill="${config.colorBarras}" stroke="black" stroke-width="1"/>
  <text x="${x + anchoColumna / 4}" y="${50 + altoGrafica + 20}" font-size="12" text-anchor="middle">${dia.dia}</text>
  <text x="${x + anchoColumna / 4}" y="${y - 5}" font-size="10" text-anchor="middle">${dia.precioPromedio.toFixed(3)}</text>
`;
        });
        svg += `</svg>`;
        return svg;
    }
    /**
     * Valida que la configuración sea correcta
     */
    validarConfiguracion(config) {
        return config.ancho > 200 && config.alto > 200 && config.formato !== undefined;
    }
}
//# sourceMappingURL=generador-graficas.js.map