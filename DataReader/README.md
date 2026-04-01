# Treating Price Petrol in Spain
Usaremos la línea de comandos para procesar los datos de precios de combustibles publicados por el Ministerio para la Transición Ecológica y el Reto Demográfico (MITERD) de España.

El proyecto está dividido en tres hitos de entrega:

| Hito | Descripción                                                         | Estado     |
------------------------------------------------------------------------------------------
| 1    | Procesado del fichero JSON y generación de estructuras de datos     | Completado |
| 2    | Generación de informe diario con medias y top 5 más caras/baratas   | Pendiente  |
| 3    | Generación de gráficas de variación de precios por día de la semana | Pendiente  |

# Requisitos del sistema
- Node.js v18 o superior

# Uso 
Modo desarrollo (sin compilar)
```bash
npx tsx src/index.ts --input-file data/samples-precios.json
```

# Modo producción (compilado)

```bash
# Compila el proyecto
npm run build
# Ejecuta el binario compilado
node src/index.js --input-file data/sample-precios.json
```

# Parámetros

| Parámetro      | Descripción | Obligatorio |
|----------------|-------------|-------------|
| `--input-file` | Ruta al fichero JSON de precios del Ministerio | Sí |

# Estructura del proyecto

```
fuel-price-processor/
├── src/
│   ├── types.ts              # Interfaces y tipos TypeScript
│   ├── abstract-reader.ts    # Clase abstracta AbstractReader<T>
│   ├── fuel-price-reader.ts  # Lector concreto FuelPriceReader
│   └── index.ts              # Punto de entrada (CLI)
├── data/
│   └── sample-precios.json   # Fichero de muestra del Ministerio
├── dist/                     # Código compilado (generado por tsc)
├── package.json
├── tsconfig.json
├── README.md
└── CONTRIBUTING.md
```

# Flujo de datos

```
Fichero JSON  ──► FuelPriceReader.read()
                        │
                        ├─ 1. JSON.parse() → RespuestaMinisterioRaw
                        ├─ 2. validateRaw() — comprueba estructura mínima
                        ├─ 3. parseFecha() → Date
                        ├─ 4. filter() — filtra por PROVINCIAS_INTERES
                        └─ 5. map(mapEstacion) → EstacionServicio[]
                                │
                                └──► DatosMinisterio
```

# Provincias y combustibles de interés

Provincias:
- Madrid
- Coruña (A) → normalizado como `Coruña`
- Santa Cruz de Tenerife → normalizado como `Tenerife`
- Badajoz

Combustibles:
- Gasóleo A → campo JSON `"Precio Gasoleo A"`
- Gasolina 95 E5 → campo JSON `"Precio Gasolina 95 E5"`

# Fuente de datos

Los datos proceden de la API REST del Ministerio de Industria, Comercio y Turismo:

```
GET https://sedeaplicaciones.minetur.gob.es/ServiciosRESTCarburantes/
        PreciosCarburantes/EstacionesTerrestres/
```

El JSON devuelto tiene esta forma:

```json
{
  "Fecha": "31/03/2026 08:30:00",
  "ListaEESSPrecio": [
    {
      "C.P.": "28001",
      "Dirección": "CALLE SERRANO, 45",
      "Provincia": "Madrid",
      "Rótulo": "REPSOL",
      "Precio Gasoleo A": "1,549",
      "Precio Gasolina 95 E5": "1,659",
      "IDEESS": "1001",
      ...
    }
  ]
}
```
  Los precios en el JSON usan "coma" como separador decimal (formato español). El parser los convierte a numero usando `parseFloat` tras sustituir `,` por `.`.

# Scripts disponibles

| Script          | Descripción |
|-----------------|-------------|
| `npm run dev`   | Ejecuta en modo desarrollo con `tsx` |
| `npm run build` | Compila TypeScript a JavaScript en `/dist` |
| `npm run start` | Ejecuta el binario compilado |
| `npm run lint`  | Verifica tipos sin emitir ficheros |

