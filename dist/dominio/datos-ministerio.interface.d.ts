/**
 * datos-ministerio.interface.ts
 * Define la estructura de salida del procesado de datos del Ministerio.
 */
import type { EstacionServicio } from './estacion-servicio.interface.js';
/**
 * Estructura que encapsula los datos procesados del Ministerio.
 * Es el resultado final del Hito 1.
 */
export interface DatosMinisterio {
    /** Fecha y hora de los datos según el Ministerio */
    fecha: Date;
    /** Lista de estaciones filtradas por provincias de interés */
    estaciones: EstacionServicio[];
}
//# sourceMappingURL=datos-ministerio.interface.d.ts.map