/**
 * generador-informe-texto.ts
 * Generador que crea un informe en formato texto legible.
 */
/**
 * Generador de informes en formato texto.
 * Implementa una estrategia de formateo legible para terminal/archivo.
 */
export class GeneradorInformeTexto {
    /**
     * Genera un informe en formato texto.
     *
     * @param informe - Informe diario a formatear
     * @returns String formateado con el informe
     */
    generar(informe) {
        const lineas = [];
        lineas.push('═══════════════════════════════════════════════════════════════');
        lineas.push('        INFORME DIARIO DE PRECIOS DE COMBUSTIBLES');
        lineas.push('═══════════════════════════════════════════════════════════════');
        lineas.push(`Fecha: ${informe.fecha.toLocaleString('es-ES')}`);
        lineas.push('');
        // Estadísticas
        lineas.push('ESTADÍSTICAS DE PRECIOS');
        lineas.push('───────────────────────────────────────────────────────────────');
        for (const stat of informe.estadisticas) {
            lineas.push(`${stat.combustible} - ${stat.provincia}:`);
            lineas.push(`  Promedio: €${stat.precioPromedio.toFixed(3)}/L`);
            lineas.push(`  Mínimo:   €${stat.precioMinimo.toFixed(3)}/L`);
            lineas.push(`  Máximo:   €${stat.precioMaximo.toFixed(3)}/L`);
            lineas.push(`  Estaciones: ${stat.numEstacionesConPrecio}`);
            lineas.push('');
        }
        // Top 5 Caras
        lineas.push('TOP 5 ESTACIONES MÁS CARAS');
        lineas.push('───────────────────────────────────────────────────────────────');
        for (let i = 0; i < informe.top5Caras.length; i++) {
            const item = informe.top5Caras[i];
            if (!item) {
                continue;
            }
            lineas.push(`${i + 1}. ${item.estacion.rotulo}`);
            lineas.push(`   Dirección: ${item.estacion.direccion}`);
            lineas.push(`   Municipio: ${item.estacion.municipio}, ${item.estacion.provincia}`);
            lineas.push(`   ${item.combustible}: €${item.precio.toFixed(3)}/L`);
            lineas.push('');
        }
        // Top 5 Baratas
        lineas.push('TOP 5 ESTACIONES MÁS BARATAS');
        lineas.push('───────────────────────────────────────────────────────────────');
        for (let i = 0; i < informe.top5Baratas.length; i++) {
            const item = informe.top5Baratas[i];
            if (!item) {
                continue;
            }
            lineas.push(`${i + 1}. ${item.estacion.rotulo}`);
            lineas.push(`   Dirección: ${item.estacion.direccion}`);
            lineas.push(`   Municipio: ${item.estacion.municipio}, ${item.estacion.provincia}`);
            lineas.push(`   ${item.combustible}: €${item.precio.toFixed(3)}/L`);
            lineas.push('');
        }
        lineas.push('═══════════════════════════════════════════════════════════════');
        return lineas.join('\n');
    }
}
//# sourceMappingURL=generador-informe-texto.js.map