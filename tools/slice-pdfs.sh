#!/bin/bash
# ============================================
# Скрипт нарезки PDF в картинки для DrawMaster
# ============================================

set -e

PROJECT_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$PROJECT_ROOT"

echo "🎨 DrawMaster — нарезка PDF"
echo "================================"
echo ""

# Проверка зависимостей
for cmd in pdftoppm; do
    if ! command -v $cmd &> /dev/null; then
        echo "❌ Не найдена команда: $cmd"
        echo "   Установи: sudo apt install poppler-utils"
        exit 1
    fi
done
echo "✅ Зависимости на месте"
echo ""

# ===== 1. ЖИВОТНЫЕ (Эймис) =====
if [ -f "src-pdf/50_animals.pdf" ]; then
    echo "📕 Нарезаю 50_animals.pdf..."
    mkdir -p assets/animals/raw
    pdftoppm -png -r 200 src-pdf/50_animals.pdf assets/animals/raw/page
    echo "   ✅ Готово: $(ls assets/animals/raw/*.png 2>/dev/null | wc -l) страниц"
else
    echo "⚠️  src-pdf/50_animals.pdf не найден — пропускаю"
fi
echo ""

# ===== 2. КОМПОЗИЦИЯ (Паранюшкин) =====
if [ -f "src-pdf/kompoziciya.pdf" ]; then
    echo "📗 Нарезаю kompoziciya.pdf..."
    mkdir -p assets/composition/raw
    pdftoppm -png -r 200 src-pdf/kompoziciya.pdf assets/composition/raw/page
    echo "   ✅ Готово: $(ls assets/composition/raw/*.png 2>/dev/null | wc -l) страниц"
else
    echo "⚠️  src-pdf/kompoziciya.pdf не найден — пропускаю"
fi
echo ""

# ===== 3. АКАДЕМИЧЕСКИЙ РИСУНОК (Ли) =====
if [ -f "src-pdf/osnovy_risunka.pdf" ]; then
    echo "📘 Нарезаю osnovy_risunka.pdf..."
    mkdir -p assets/academic/raw
    pdftoppm -png -r 200 src-pdf/osnovy_risunka.pdf assets/academic/raw/page
    echo "   ✅ Готово: $(ls assets/academic/raw/*.png 2>/dev/null | wc -l) страниц"
else
    echo "⚠️  src-pdf/osnovy_risunka.pdf не найден — пропускаю"
fi
echo ""

echo "🎉 Нарезка завершена!"
