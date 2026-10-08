/* ============================================
   ЛОГИКА ПРИЛОЖЕНИЯ DrawMaster
   ============================================ */

// === Инициализация Telegram WebApp ===
const tg = window.Telegram?.WebApp;
if (tg) {
    tg.ready();
    tg.expand();
    // Применяем цвета темы Telegram
    if (tg.themeParams.bg_color) {
        document.documentElement.style.setProperty('--bg', tg.themeParams.bg_color);
    }
}

// === Состояние приложения ===
const state = {
    currentModule: null,    // 'animals' | 'composition' | 'academic'
    currentItem: null,      // объект урока
    currentStep: 0          // индекс текущего шага
};

// === DOM-элементы ===
const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => document.querySelectorAll(sel);

const screens = {
    menu: $('#screen-menu'),
    gallery: $('#screen-gallery'),
    viewer: $('#screen-viewer')
};

// === Навигация между экранами ===
function showScreen(name) {
    Object.values(screens).forEach(s => s.classList.remove('active'));
    screens[name].classList.add('active');
    window.scrollTo(0, 0);
}

// === Обработка кликов по меню ===
$$('.menu-card').forEach(card => {
    card.addEventListener('click', () => {
        const moduleKey = card.dataset.module;
        openGallery(moduleKey);
    });
});

// === Открыть галерею уроков ===
function openGallery(moduleKey) {
    const module = window.DATA[moduleKey];
    if (!module) return;

    state.currentModule = moduleKey;
    $('#gallery-title').textContent = module.title;
    
    const grid = $('#gallery-grid');
    grid.innerHTML = '';
    
    module.items.forEach(item => {
        const btn = document.createElement('button');
        btn.className = 'gallery-item';
        btn.innerHTML = `
            <span class="emoji">${item.emoji}</span>
            <span class="name">${item.name}</span>
        `;
        btn.addEventListener('click', () => openViewer(item));
        grid.appendChild(btn);
    });

    showScreen('gallery');
}

// === Открыть просмотр урока ===
function openViewer(item) {
    state.currentItem = item;
    state.currentStep = 0;
    
    $('#viewer-title').textContent = `${item.emoji} ${item.name}`;
    
    renderViewer();
    showScreen('viewer');
}

// === Отрисовка текущего шага ===
function renderViewer() {
    const item = state.currentItem;
    const step = state.currentStep;
    const totalSteps = item.steps.length || 1;

    // Картинка шага
    const img = $('#step-image');
    if (item.steps.length > 0) {
        img.src = item.steps[step];
        img.style.display = 'block';
    } else {
        // Заглушка, если картинок нет
        img.style.display = 'none';
        img.parentElement.innerHTML = `
            <div style="text-align:center; padding:40px; color:var(--hint);">
                <div style="font-size:64px; margin-bottom:16px;">${item.emoji}</div>
                <div style="font-size:14px;">Шаги появятся здесь</div>
                <div style="font-size:12px; margin-top:8px; opacity:0.6;">
                    (добавьте картинки в assets/)
                </div>
            </div>
        `;
    }

    // Счётчик
    $('#step-counter').textContent = `${step + 1} / ${totalSteps}`;

    // Кнопки навигации
    $('#prev-step').disabled = step === 0;
    $('#next-step').disabled = step >= totalSteps - 1;

    // Миниатюры
    renderThumbs();
}

// === Миниатюры шагов ===
function renderThumbs() {
    const container = $('#step-thumbs');
    const item = state.currentItem;
    
    if (item.steps.length === 0) {
        container.innerHTML = '';
        return;
    }

    container.innerHTML = '';
    item.steps.forEach((src, i) => {
        const thumb = document.createElement('img');
        thumb.className = 'thumb' + (i === state.currentStep ? ' active' : '');
        thumb.src = src;
        thumb.addEventListener('click', () => {
            state.currentStep = i;
            renderViewer();
        });
        container.appendChild(thumb);
    });
}

// === Навигация по шагам ===
$('#prev-step').addEventListener('click', () => {
    if (state.currentStep > 0) {
        state.currentStep--;
        renderViewer();
    }
});

$('#next-step').addEventListener('click', () => {
    if (state.currentStep < state.currentItem.steps.length - 1) {
        state.currentStep++;
        renderViewer();
    }
});

// === Свайпы для навигации ===
let touchStartX = 0;
document.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
}, { passive: true });

document.addEventListener('touchend', (e) => {
    if (!screens.viewer.classList.contains('active')) return;
    
    const touchEndX = e.changedTouches[0].screenX;
    const diff = touchStartX - touchEndX;
    
    if (Math.abs(diff) < 50) return;
    
    if (diff > 0) {
        // Свайп влево → следующий шаг
        $('#next-step').click();
    } else {
        // Свайп вправо → предыдущий шаг
        $('#prev-step').click();
    }
}, { passive: true });

// === Кнопки "Назад" ===
$$('[data-back]').forEach(btn => {
    btn.addEventListener('click', () => {
        if (screens.viewer.classList.contains('active')) {
            openGallery(state.currentModule);
        } else if (screens.gallery.classList.contains('active')) {
            showScreen('menu');
        }
    });
});

// === Подсказка ===
$('#hint-btn').addEventListener('click', () => {
    if (!state.currentItem) return;
    $('#hint-text').textContent = state.currentItem.hint || 'Подсказка пока не добавлена.';
    $('#hint-modal').classList.add('active');
});

$('#close-hint').addEventListener('click', () => {
    $('#hint-modal').classList.remove('active');
});

// Закрытие модалки по клику на фон
$('#hint-modal').addEventListener('click', (e) => {
    if (e.target.id === 'hint-modal') {
        e.target.classList.remove('active');
    }
});

// === Кнопка "Назад" в Telegram ===
if (tg) {
    tg.BackButton.onClick(() => {
        if (screens.viewer.classList.contains('active')) {
            openGallery(state.currentModule);
        } else if (screens.gallery.classList.contains('active')) {
            showScreen('menu');
        }
    });
}

// === Стартовый экран ===
showScreen('menu');
console.log('🎨 DrawMaster запущен!');
