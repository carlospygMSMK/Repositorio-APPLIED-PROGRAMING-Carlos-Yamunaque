/*index.ts Punto de entrada del programa.
 * Orquesta la lectura de datos, análisis y generación de informe y gráficas */
import { LectorPreciosCombustible } from './infraestructura/lector-precios-combustible.js';
import { AnalizadorPrecios } from './aplicacion/analizador-precios.js';
import { GeneradorInformeTexto } from './aplicacion/generador-informe-texto.js';
import { GeneradorGraficas } from './aplicacion/generador-graficas.js';
import { promises as fs } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
/* Función principal que ejecuta el flujo completo del programa */
async function main() {
    try {
        // Parsear argumentos
        const args = process.argv.slice(2);
        if (args.length === 0 || args[0] !== '--input-file' || args.length < 2) {
            console.error('Uso: npm start -- --input-file <ruta-archivo-json>');
            console.error('Ejemplo: npm start -- --input-file ./data/precios.json');
            process.exit(1);
        }
        const rutaArchivo = args[1] ?? '';
        if (!rutaArchivo) {
            console.error('Error: Se requiere especificar la ruta del archivo JSON');
            process.exit(1);
        }
        console.log('\n╔═══════════════════════════════════════════════════════════════╗');
        console.log('║  Procesador de Precios de Combustibles del Ministerio         ║');
        console.log('║  TODOS LOS HITOS: 1, 2 y 3 (Gráficas)                         ║');
        console.log('╚═══════════════════════════════════════════════════════════════╝\n');
        // Hito 1: Lectura y procesado de datos
        console.info(` Leyendo fichero: ${rutaArchivo}`);
        const lector = new LectorPreciosCombustible(rutaArchivo);
        const datosMinisterio = lector.leer();
        console.info(`  Archivo procesado exitosamente`);
        console.info(`  Fecha de los datos: ${datosMinisterio.fecha.toLocaleString('es-ES')}`);
        console.info(`  Estaciones cargadas: ${datosMinisterio.estaciones.length}\n`);
        // Hito 2: Análisis y generación de informe
        console.info(' Hito 2: Generando informe diario...');
        const analizador = new AnalizadorPrecios();
        const informe = analizador.generarInformeDiario(datosMinisterio);
        const generador = new GeneradorInformeTexto();
        const textoInforme = generador.generar(informe);
        console.log(textoInforme);
        console.info(' Hito 2 completado exitosamente.\n');
        // Hito 3: Generación de gráficas
        console.info(' Hito 3: Generando gráficas de tendencias...');
        const datosGraficas = analizador.generarDatosGraficas(datosMinisterio);
        // Crear directorio de salida para gráficas
        const __filename = fileURLToPath(import.meta.url);
        const __dirname = dirname(__filename);
        const rutaSalidaGraficas = join(__dirname, '../output/graficas');
        await fs.mkdir(rutaSalidaGraficas, { recursive: true });
        const generadorGraficas = new GeneradorGraficas();
        let numGraficasGeneradas = 0;
        for (const datos of datosGraficas) {
            // Validar configuración
            const config = {
                titulo: `Tendencias de ${datos.combustible} en ${datos.provincia}`,
                ancho: 800,
                alto: 600,
                formato: 'svg',
                colorBarras: '#4CAF50',
                etiquetaY: 'Precio (€/L)',
                rutaSalida: rutaSalidaGraficas,
            };
            if (!generadorGraficas.validarConfiguracion(config)) {
                console.warn(`  Configuración inválida para ${datos.combustible} en ${datos.provincia}`);
                continue;
            }
            // Generar ambos formatos (JSON y SVG)
            const resultadoJSON = await generadorGraficas.generarJSON(datos, config);
            const resultadoSVG = await generadorGraficas.generarSVG(datos, config);
            if (resultadoJSON.exito) {
                console.info(`   JSON generado: ${resultadoJSON.rutaArchivo}`);
                numGraficasGeneradas++;
            }
            if (resultadoSVG.exito) {
                console.info(`   SVG generado: ${resultadoSVG.rutaArchivo}`);
                numGraficasGeneradas++;
            }
            if (!resultadoJSON.exito) {
                console.warn(`   Error en JSON: ${resultadoJSON.error}`);
            }
            if (!resultadoSVG.exito) {
                console.warn(`   Error en SVG: ${resultadoSVG.error}`);
            }
        }
        console.info(`\n Hito 3 completado: ${numGraficasGeneradas} gráficas generadas\n`);
        console.info('╔═══════════════════════════════════════════════════════════════╗');
        console.info('║   TODOS LOS HITOS COMPLETADOS EXITOSAMENTE                    ║');
        console.info('╚═══════════════════════════════════════════════════════════════╝\n');
    }
    catch (error) {
        const mensaje = error instanceof Error ? error.message : String(error);
        console.error(`\n Error: ${mensaje}\n`);
        process.exit(1);
    }
}
main().catch((error) => {
    const mensaje = error instanceof Error ? error.message : String(error);
    console.error(`\n Error fatal: ${mensaje}\n`);
    process.exit(1);
});
//# sourceMappingURL=index.js.map