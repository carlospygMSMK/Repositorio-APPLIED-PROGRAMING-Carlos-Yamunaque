# Procesador de Precios de Combustibles

Aplicación TypeScript que procesa datos de precios de combustibles emitidos por el Ministerio de Transición Ecológica y genera informes diarios con análisis de mercado.

## Descripción del Proyecto

Este proyecto forma parte del **Hito 2** de la asignatura **Programación Aplicada y Principios de Diseño** (Unit 20). La aplicación implementa los principios SOLID, buenas prácticas de codificación limpia y patrones de diseño.

### Características

- ✅ **Hito 1**: Lectura y procesado de ficheros JSON
- ✅ **Hito 2**: Generación de informes diarios con estadísticas
- ✅ **Pruebas unitarias**: Cobertura del código significativo
- ✅ **Análisis estático**: ESLint configurado
- ✅ **TypeScript estricto**: Máxima seguridad de tipos

## Estructura del Proyecto

```
src/
├── __tests__/                    # Suite de tests
│   ├── analizador-precios.test.ts
│   └── parseadores.test.ts
├── aplicacion/                   # Capa de aplicación
│   ├── analizador-precios.ts     # Análisis de datos
│   └── generador-informe-texto.ts # Generación de informes
├── dominio/                      # Modelos de dominio
│   ├── datos-ministerio.interface.ts
│   ├── estacion-servicio.interface.ts
│   ├── informe-diario.interface.ts
│   └── precios-combustible.interface.ts
├── infraestructura/              # Capa de infraestructura
│   ├── lector-abstracto.ts       # Clase base para lectores
│   ├── lector-precios-combustible.ts # Lector concreto
│   └── parseadores.ts            # Funciones de parseado
├── raw/                          # Estructuras de datos raw
│   └── respuesta-ministerio.interface.ts
├── constantes-negocio.ts         # Configuración empresarial
└── index.ts                      # Punto de entrada
```

## Instalación

### Requisitos

- Node.js 18+
- npm 9+

### Pasos de Instalación

```bash
# 1. Clonar o descargar el repositorio
cd procesador-precios-combustible

# 2. Instalar dependencias
npm install

# 3. Compilar el proyecto
npm run build

# 4. (Opcional) Ejecutar en modo desarrollo
npm run dev
```

## Uso

### Ejecutar el programa

```bash
npm start -- --input-file <ruta-archivo-json>
```

**Ejemplo:**

```bash
npm start -- --input-file ./data/precios.json
```

### Formato del archivo JSON

El archivo debe seguir la estructura emitida por el Ministerio de Transición Ecológica:

```json
{
  "Fecha": "31/03/2026 08:30:00",
  "ListaEESSPrecio": [
    {
      "IDEESS": "12345",
      "Rótulo": "Nombre Estación",
      "Dirección": "Calle Principal, 123",
      "Localidad": "Madrid",
      "Municipio": "Madrid",
      "Provincia": "Madrid",
      "C.P.": "28000",
      "Latitud": "40,425660",
      "Longitud (WGS84)": "-3,688340",
      "Horario": "24h",
      "Margen": "5%",
      "Precio Gasoleo A": "1,539",
      "Precio Gasolina 95 E5": "1,459",
      ...
    }
  ]
}
```

## Desarrollo

### Scripts disponibles

```bash
# Compilación
npm run build              # Compilar a JavaScript

# Desarrollo
npm run dev               # Ejecutar en modo desarrollo con tsx
npm run typecheck         # Verificar tipos sin compilar

# Linting
npm run lint              # Ejecutar ESLint
npm run lint:fix          # Ejecutar ESLint con auto-fix

# Testing
npm test                  # Ejecutar tests una vez
npm run test:watch       # Tests en modo watch
npm run test:coverage    # Informe de cobertura
```

### Principios SOLID Aplicados

#### Single Responsibility Principle (SRP)
- Cada clase tiene una única responsabilidad
- `LectorPreciosCombustible`: solo lectura de datos
- `AnalizadorPrecios`: solo análisis
- `GeneradorInformeTexto`: solo formateo

#### Open/Closed Principle (OCP)
- Clases abiertas a extensión, cerradas a modificación
- `LectorAbstracto<T>` permite crear nuevos lectores sin modificar código existente

#### Liskov Substitution Principle (LSP)
- `LectorPreciosCombustible` es sustituble por `LectorAbstracto`

#### Interface Segregation Principle (ISP)
- Interfaces específicas y focalizadas:
  - `PreciosCombustible`
  - `EstacionServicio`
  - `DatosMinisterio`

#### Dependency Inversion Principle (DIP)
- Las clases dependen de abstracciones, no de implementaciones concretas
- Inyección de dependencias en métodos

### Patrones de Diseño

- **Strategy Pattern**: `AnalizadorPrecios` para diferentes estrategias de análisis
- **Template Method**: `LectorAbstracto<T>` define la estructura común
- **Factory Pattern**: Función `mapearEstacion()` para crear objetos de dominio

### Código Limpio

- ✅ Nombres claros y descriptivos en español
- ✅ Funciones pequeñas y enfocadas
- ✅ Sin comentarios obvios
- ✅ Manejo explícito de errores
- ✅ Tipos explícitos en TypeScript
- ✅ Sin código duplicado

## Pruebas

### Ejecutar Tests

```bash
npm test
```

### Cobertura de Tests

```bash
npm run test:coverage
```

Los tests cubren:
- Parseadores de precios, coordenadas y fechas
- Análisis de estadísticas de precios
- Identificación de top 5 más caros y baratos

## Análisis Estático

### ESLint

```bash
npm run lint
```

Detecta problemas de código como:
- Variables no utilizadas
- Tipos implícitos
- Promesas flotantes
- Código sospechoso que podría ser bug

### Type Checking

```bash
npm run typecheck
```

Verifica toda la seguridad de tipos sin compilar.

## Hito 2: Generación de Informes

El programa genera un informe completo que incluye:

### Estadísticas por Provincia y Combustible
- Precio promedio
- Precio mínimo
- Precio máximo
- Número de estaciones disponibles

### Top 5 Estaciones Más Caras
- Por combustible
- Con dirección completa
- Precio exacto

### Top 5 Estaciones Más Baratas
- Por combustible
- Con dirección completa
- Precio exacto

**Ejemplo de salida:**

```
═══════════════════════════════════════════════════════════════
        INFORME DIARIO DE PRECIOS DE COMBUSTIBLES
═══════════════════════════════════════════════════════════════
Fecha: 31/3/2026, 8:30:00

ESTADÍSTICAS DE PRECIOS
───────────────────────────────────────────────────────────────
Gasóleo A - Madrid:
  Promedio: €1.550/L
  Mínimo:   €1.539/L
  Máximo:   €1.589/L
  Estaciones: 25
...
```

## Refactorización Implementada

### De la versión anterior a esta versión

#### Estructura de ficheros
- **Antes**: Todo en `types.ts`
- **Ahora**: Interfaz por fichero (p.ej. `estacion-servicio.interface.ts`)

#### Nomenclatura
- **Antes**: Mezcla de inglés y español
- **Ahora**: 100% en español consistente

#### Linting
- **Antes**: Solo `tsc --noEmit`
- **Ahora**: ESLint configurado profesionalmente

#### Tests
- **Antes**: No había
- **Ahora**: Suite completa con Jest

## Próximos Pasos (Hito 3)

- Implementación de gráficas con Chart.js
- CI/CD con GitHub Actions ✅ (workflows creados)
- Análisis de tendencias a lo largo del mes ✅ (estructura lista)
- Exportación a PDF, CSV, Excel
- Dashboard web interactivo (opcional)

### Roadmap Detallado

Ver `ROADMAP_HITO_3.md` para el plan completo del Hito 3, incluyendo:
- Especificaciones de gráficas
- Configuración de CI/CD (GitHub Actions)
- Estructura de exportadores
- Timeline estimado

## Licencia

ISC

## Autor

Carlos - MSMK University College
