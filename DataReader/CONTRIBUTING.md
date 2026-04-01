# Guía de contribución

Esta guía describe el proceso y las convenciones que seguimos en el proyecto.

# Principios de diseño

El proyecto aplica los siguientes principios de **SOLID** y **Clean Code**:

| Principio                 | Aplicación en el proyecto |
|---------------------------|---------------------------|
| S - Single Responsibility | Cada clase tiene una única responsabilidad (`FuelPriceReader` solo lee y parsea; `index.ts` solo orquesta la CLI) |
| O — Open/Closed           | `AbstractReader<T>` está abierto a extensión (nuevos lectores) sin modificar el código existente |
| L — Liskov Substitution   | `FuelPriceReader` puede sustituir a `AbstractReader<DatosMinisterio>` en cualquier contexto |
| I — Interface Segregation | Las interfaces (`EstacionServicio`, `DatosMinisterio`) son pequeñas y específicas |
| D — Dependency Inversion  | El código de alto nivel depende de abstracciones (`AbstractReader`), no de implementaciones concretas |


# Convenciones de commits
```
| Tipo       | Cuándo usarlo |
|------------|---------------|
| `feat`     | Nueva funcionalidad |
| `fix`      | Corrección de bug |
| `refactor` | Cambio de código sin nueva funcionalidad ni fix |
| `docs`     | Solo cambios en documentación |
| `test`     | Añadir o modificar tests |
| `chore`    | Tareas de mantenimiento (deps, config) |
```

```
Ejemplos:

feat(reader): add province normalization map
fix(parser): handle empty precio fields correctly
docs: update README with Hito 2 instructions
refactor(types): rename PreciosCombustible fields to camelCase
```

# Convenciones de código


- Preferir `interface` sobre `type` para estructuras de datos.
- Preferir `readonly` en propiedades que no deben mutar.
- No usar `any`; usar `unknown` y hacer type-narrowing explícito.
- Usar `const` por defecto; `let` solo cuando sea necesario reasignar.

# Nomenclatura

```
| Elemento              | Convención  | Ejemplo |
|-----------------------|-------------|---------|
| Clases                | `PascalCase`| `FuelPriceReader` |
| Interfaces            | `PascalCase`| `EstacionServicio` |
| Variables / funciones | `camelCase` | `parsePrecio` |
| Constantes de módulo  | `UPPER_SNAKE_CASE` | `PROVINCIAS_INTERES` |
| Ficheros              | `kebab-case` | `fuel-price-reader.ts` |
```

# Documentación inline

```typescript
/*
 * Convierte un precio en formato español ("1,539") a número.
 * Devuelve null si la cadena está vacía o no es un número válido.
 */
function parsePrecio(precioStr: string): number | null { ... }
```

# Estructura esperada al añadir nuevos lectores

Si necesitas añadir soporte para un nuevo formato de datos (por ejemplo lector CSV):

```
src/
├── abstract-reader.ts         # NO modificar
├── fuel-price-reader.ts       # Lector JSON actual
└── fuel-price-csv-reader.ts   # Nuevo lector CSV (extiende AbstractReader)

El nuevo lector debe:
1. Extender `AbstractReader<DatosMinisterio>`.
2. Implementar el método `read(): DatosMinisterio`.
3. Reutilizar los helpers de parseo existentes cuando sea posible.
```
