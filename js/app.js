/* ============================================
   ЛОГИКА ПРИЛОЖЕНИЯ DrawMaster
   Страница = один урок (6-8 шагов на листе)
   ============================================ */

// === Telegram WebApp (не блокирует работу если не в Telegram) ===
const tg = window.Telegram?.WebApp;
if (tg) {
    tg.ready();
    tg.expand();
    if (tg.themeParams.bg_color) {
        document.documentElement.style.setProperty('--bg', tg.themeParams.bg_color);
    }
}

// === Состояние приложения ===
const state = {
    currentModule: null,
    currentItem: null,
    zoomed: false
};

// === Хелперы ===
const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => document.querySelectorAll(sel);

const screens = {
    menu: $('#screen-menu'),
    gallery: $('#screen-gallery'),
    viewer: $('#screen-viewer')
};

// === Навигация между экранами ===
function showScreen(name) {
    Object.values(screens).forEach(s => s && s.classList.remove('active'));
    if (screens[name]) {
        screens[name].classList.add('active');
    }
    window.scrollTo(0, 0);
}

// === Главное меню → клики по карточкам ===
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

    // Если раздел пустой (композиция / академический)
    if (!module.items || module.items.length === 0) {
        grid.innerHTML = `
            <div style="grid-column: 1/-1; text-align: center; padding: 60px 20px; color: var(--hint);">
                <div style="font-size: 64px; margin-bottom: 16px;">📚</div>
                <div style="font-size: 16px;">Раздел в разработке</div>
                <div style="font-size: 13px; margin-top: 8px; opacity: 0.7;">Скоро здесь появятся материалы</div>
            </div>
        `;
        showScreen('gallery');
        return;
    }

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

// === Открыть урок (просмотр страницы с шагами) ===
function openViewer(item) {
    state.currentItem = item;
    state.zoomed = false;

    $('#viewer-title').textContent = `${item.emoji} ${item.name}`;

    const img = $('#step-image');
    img.src = item.page;
    img.alt = item.name;
    img.classList.remove('zoomed');

    img.onerror = () => {
        img.alt = 'Картинка не найдена: ' + item.page;
        img.style.opacity = '0.3';
    };

    img.onload = () => {
        img.style.opacity = '1';
    };

    showScreen('viewer');
}

// === Зум по тапу на картинку ===
function toggleZoom() {
    const img = $('#step-image');
    state.zoomed = !state.zoomed;
    img.classList.toggle('zoomed', state.zoomed);
}

const stepImage = $('#step-image');
if (stepImage) {
    stepImage.addEventListener('click', toggleZoom);
}

// === Кнопки «Назад» ===
$$('[data-back]').forEach(btn => {
    btn.addEventListener('click', () => {
        if (screens.viewer && screens.viewer.classList.contains('active')) {
            openGallery(state.currentModule);
        } else if (screens.gallery && screens.gallery.classList.contains('active')) {
            showScreen('menu');
        }
    });
});

// === Подсказка (💡) ===
const hintBtn = $('#hint-btn');
if (hintBtn) {
    hintBtn.addEventListener('click', () => {
        if (!state.currentItem) return;
        $('#hint-text').textContent = state.currentItem.hint || 'Подсказка пока не добавлена.';
        $('#hint-modal').classList.add('active');
    });
}

const closeHint = $('#close-hint');
if (closeHint) {
    closeHint.addEventListener('click', () => {
        $('#hint-modal').classList.remove('active');
    });
}

const hintModal = $('#hint-modal');
if (hintModal) {
    hintModal.addEventListener('click', (e) => {
        if (e.target.id === 'hint-modal') {
            e.target.classList.remove('active');
        }
    });
}

// === Telegram BackButton ===
if (tg && tg.BackButton) {
    tg.BackButton.onClick(() => {
        if (screens.viewer && screens.viewer.classList.contains('active')) {
            openGallery(state.currentModule);
        } else if (screens.gallery && screens.gallery.classList.contains('active')) {
            showScreen('menu');
        }
    });
}

// === Стартовый экран ===
showScreen('menu');
console.log('🎨 DrawMaster запущен! Животных:', window.DATA?.animals?.items?.length || 0);
