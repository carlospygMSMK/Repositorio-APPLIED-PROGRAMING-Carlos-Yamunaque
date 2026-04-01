/*
 * index.ts  Punto de entrada del programa. Lee el fichero JSON de precios del
 * Ministerio, procesa los datos y muestra por consola un resumen de las estaciones cargadas en las provincias de interés.
 */

import { FuelPriceReader } from './fuel-price-reader.js';
import type { EstacionServicio } from './types.js';

// Argparse
const args = process.argv.slice(2);
const [command, file] = process.argv;

if (args.length !== 2 || args[0] !== '--input-file') {
  console.error(`Uso: ${command} ${file} --input-file data/samples-precios.json`);
  process.exit(1);
}

const inputFile = args[1] as string;

// Procesado
try {
  console.log(`\n Leyendo fichero: ${inputFile}`);

  const reader = new FuelPriceReader(inputFile);
  const datos = reader.read();

  console.log(`Fecha de los datos: ${datos.fecha.toLocaleString('es-ES')}`);
  console.log(`Estaciones cargadas (provincias de interés): ${datos.estaciones.length}\n`);

  // Agrupar por provincia para el resumen
  const porProvincia = new Map<string, EstacionServicio[]>();
  for (const estacion of datos.estaciones) {
    const lista = porProvincia.get(estacion.provincia) ?? [];
    lista.push(estacion);
    porProvincia.set(estacion.provincia, lista);
  }

  for (const [provincia, estaciones] of porProvincia) {
    console.log(`  ${provincia}: ${estaciones.length} estación/es`);
    for (const e of estaciones) {
      const ga = e.precios.gasoleoA !== null ? `${e.precios.gasoleoA.toFixed(3)} €/L` : 'N/D';
      const g95 = e.precios.gasolina95E5 !== null ? `${e.precios.gasolina95E5.toFixed(3)} €/L` : 'N/D';
      console.log(`     • [${e.id}] ${e.rotulo} — ${e.direccion}`);
      console.log(`       Gasóleo A: ${ga}  |  Gasolina 95 E5: ${g95}`);
    }
    console.log();
  }

  console.log('Hito 1 completado: datos procesados correctamente.\n');

} catch (err: unknown) {
  const msg = err instanceof Error ? err.message : String(err);
  console.error(` Error: ${msg}`);
  process.exit(1);
}
