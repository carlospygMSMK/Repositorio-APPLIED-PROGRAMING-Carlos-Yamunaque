# Guía de Contribución

## Cómo Contribuir

Gracias por tu interés en contribuir a este proyecto. Este documento proporciona directrices para mantener la calidad del código.

## Flujo de Trabajo

1. **Crear una rama** desde `main`
   ```bash
   git checkout -b feature/descripcion-cambio
   ```

2. **Hacer commits atómicos** con mensajes claros
   ```bash
   git commit -m "feat: añadir nueva característica"
   ```

3. **Seguir los estándares de código**
   - Ejecutar ESLint: `npm run lint`
   - Ejecutar TypeScript check: `npm run typecheck`
   - Ejecutar tests: `npm test`

4. **Push y crear Pull Request**
   ```bash
   git push origin feature/descripcion-cambio
   ```

## Estándares de Código

### Nomenclatura

- **Variables y funciones**: camelCase en español
  ```typescript
  const numeroPrecio = 1.5;
  function calcularPromedio() { }
  ```

- **Interfaces**: PascalCase con sufijo `.interface.ts`
  ```typescript
  // estacion-servicio.interface.ts
  export interface EstacionServicio { }
  ```

- **Clases**: PascalCase
  ```typescript
  class AnalizadorPrecios { }
  ```

- **Constantes**: UPPER_SNAKE_CASE
  ```typescript
  export const PROVINCIAS_INTERES = ['Madrid'];
  ```

### Estructura de Archivos

```
src/
├── __tests__/             # Tests
├── aplicacion/            # Lógica de negocio
├── dominio/              # Modelos de dominio
├── infraestructura/      # Acceso a datos, I/O
├── raw/                  # Estructuras raw/externas
└── constantes-negocio.ts # Configuración
```

### TypeScript Estricto

Todos los archivos deben tener tipos explícitos:

```typescript
// ✓ Bien
function parsearPrecio(precioStr: string): number | null {
  return null;
}

// ✗ Mal
function parsearPrecio(precioStr) {
  return null;
}
```

### Funciones y Métodos

- Máximo 20 líneas
- Un nivel de abstracción por función
- Nombres descriptivos

```typescript
// ✓ Bien
function obtenerTop5Caras(estaciones: EstacionServicio[]): EstacionTop[] {
  return estaciones
    .map(mapearATop)
    .sort((a, b) => b.precio - a.precio)
    .slice(0, 5);
}

// ✗ Mal
function getTop(items) {
  // 50 líneas de lógica mezclada
}
```

### Manejo de Errores

Siempre usar try-catch explícito o retornar `Result`:

```typescript
// ✓ Bien
try {
  const datos = JSON.parse(contenido);
} catch (error: unknown) {
  const mensaje = error instanceof Error ? error.message : String(error);
  throw new Error(`Error al parsear: ${mensaje}`);
}

// ✗ Mal
const datos = JSON.parse(contenido); // Puede fallar
```

## Tests

### Crear Tests

1. Crear archivo en `src/__tests__/` con sufijo `.test.ts`
2. Usar Jest describe/it

```typescript
describe('AnalizadorPrecios', () => {
  it('debe calcular el promedio correctamente', () => {
    expect(promedio([1, 2, 3])).toBe(2);
  });
});
```

### Cobertura

- Mínimo 70% de cobertura por categoría
- Priorizar tests de funciones críticas
- Incluir casos edge

## ESLint y TypeScript

### Ejecutar antes de commit

```bash
npm run lint
npm run typecheck
npm test
```

### Reglas Importantes

- ❌ `console.error()` solo en error handling
- ❌ Variables no usadas (error)
- ❌ `any` (error)
- ❌ Promesas flotantes (error)
- ⚠️ `console.log()` en producción

## Commits

### Formato de Mensaje

Usar Conventional Commits:

```
<tipo>(<scope>): <descripción>

<cuerpo detallado (opcional)>

<pie de página (opcional)>
```

### Tipos

- `feat`: Nueva característica
- `fix`: Corrección de bug
- `refactor`: Cambio de código sin alterar funcionalidad
- `test`: Añadir o modificar tests
- `docs`: Documentación
- `chore`: Tareas de mantenimiento

### Ejemplos

```
feat(analizador): añadir cálculo de desviación estándar

fix(lector): corregir parseado de fechas en enero

refactor(infraestructura): extraer función de normalización de provincias

test(parseadores): añadir tests para coordenadas negativas

docs: actualizar README con instrucciones de instalación
```

## Pull Requests

### Descripción

Incluir:
- Descripción clara del cambio
- Problema que resuelve
- Cambios significativos
- Tests añadidos

### Template

```markdown
## Descripción
Brief description of changes

## Problema
Issue or feature request this addresses

## Cambios
- Bullet point 1
- Bullet point 2

## Tests
- [ ] Tests añadidos/actualizados
- [ ] Cobertura ≥ 70%

## Checklist
- [ ] ESLint pasa: `npm run lint`
- [ ] TypeScript pasa: `npm run typecheck`
- [ ] Tests pasan: `npm test`
- [ ] Documentación actualizada
- [ ] Commit messages siguen el formato
```

## Revisión de Código

### Puntos a verificar

- ✅ Código sigue SOLID
- ✅ Sin duplicación
- ✅ Nombres claros
- ✅ Tests adecuados
- ✅ Documentación actualizada
- ✅ Sin breaking changes

## Reportar Bugs

1. Verificar que el bug existe en `main`
2. Proporcionar pasos para reproducir
3. Incluir versión de Node.js
4. Adjuntar logs si es posible

## Preguntas

¿Dudas? Abre una issue o contacta a los maintainers.

Gracias por contribuir! 🚀
