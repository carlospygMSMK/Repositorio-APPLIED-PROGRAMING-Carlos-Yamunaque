#!/bin/bash

# Colores para output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${BLUE}╔═════════════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║  Procesador Hito 3 - Setup y Ejecución         ║${NC}"
echo -e "${BLUE}╚═════════════════════════════════════════════════╝${NC}\n"

# 1. Instalar
echo -e "${YELLOW}📦 Paso 1: Instalando dependencias...${NC}"
npm install
if [ $? -ne 0 ]; then
    echo -e "${RED}❌ Error en instalación${NC}"
    exit 1
fi
echo -e "${GREEN}✓ Dependencias instaladas${NC}\n"

# 2. Compilar
echo -e "${YELLOW}🔨 Paso 2: Compilando TypeScript...${NC}"
npm run build
if [ $? -ne 0 ]; then
    echo -e "${RED}❌ Error en compilación${NC}"
    exit 1
fi
echo -e "${GREEN}✓ Compilación exitosa${NC}\n"

# 3. Tests
echo -e "${YELLOW}🧪 Paso 3: Ejecutando tests...${NC}"
npm test
if [ $? -ne 0 ]; then
    echo -e "${RED}❌ Error en tests${NC}"
    exit 1
fi
echo -e "${GREEN}✓ Tests pasados${NC}\n"

# 4. Ejecutar
echo -e "${YELLOW}🚀 Paso 4: Ejecutando programa (Hitos 1, 2 y 3)...${NC}"
npm start -- --input-file ./data/precios-ejemplo.json

echo -e "\n${GREEN}✅ ¡COMPLETADO!${NC}"
echo -e "Las gráficas se encuentran en: ${BLUE}output/graficas/${NC}"

