/* ============================================
   ЛОГИКА ПРИЛОЖЕНИЯ DrawMaster
   Страница = один урок с 6-8 шагами
   ============================================ */

// === Telegram WebApp ===
const tg = window.Telegram?.WebApp;
if (tg) {
    tg.ready();
    tg.expand();
    if (tg.themeParams.bg_color) {
        document.documentElement.style.setProperty('--bg', tg.themeParams.bg_color);
    }
}

// === Состояние ===
const state = {
    currentModule: null,
    currentItem: null,
    zoomed: false
};

// === DOM ===
const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => document.querySelectorAll(sel);

const screens = {
    menu: $('#screen-menu'),
    gallery: $('#screen-gallery'),
    viewer: $('#screen-viewer')
};

// === Навигация ===
function showScreen(name) {
    Object.values(screens).forEach(s => s.classList.remove('active'));
    screens[name].classList.add('active');
    window.scrollTo(0, 0);
}

// === Меню ===
$$('.menu-card').forEach(card => {
    card.addEventListener('click', () => {
        const moduleKey = card.dataset.module;
        openGallery(moduleKey);
    });
});

// === Галерея ===
function openGallery(moduleKey) {
    const module = window.DATA[moduleKey];
    if (!module) return;

    state.currentModule = moduleKey;
    $('#gallery-title').textContent = module.title;

    const grid = $('#gallery-grid');
    grid.innerHTML = '';

    if (module.items.length === 0) {
        grid.innerHTML = '<p style="text-align:center;color:var(--hint);grid-column:1/-1;padding:40px;">Раздел в разработке 📚</p>';
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

// === Открыть урок ===
function openViewer(item) {
    state.currentItem = item;
    state.zoomed = false;

    $('#viewer-title').textContent = `${item.emoji} ${item.name}`;

    // Загружаем картинку-страницу
    const img = $('#step-image');
    img.src = item.page;
    img.onerror = () => {
        img.src = '';
        img.alt = 'Картинка не найдена: ' + item.page;
    };

    // Скрываем ненужные элементы управления шагами
    $('#step-controls').style.display = 'none';
    $('#step-thumbs').style.display = 'none';
    $('#step-counter').style.display = 'none';
    $('#prev-step').style.display = 'none';
    $('#next-step').style.display = 'none';

    // Сбрасываем зум
    img.classList.remove('zoomed');

    showScreen('viewer');
}

// === Зум по тапу ===
function toggleZoom() {
    const img = $('#step-image');
    state.zoomed = !state.zoomed;
    img.classList.toggle('zoomed', state.zoomed);
}

document.addEventListener('DOMContentLoaded', () => {
    const img = $('#step-image');
    if (img) {
        img.addEventListener('click', toggleZoom);
    }
});

// === Назад ===
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

$('#hint-modal').addEventListener('click', (e) => {
    if (e.target.id === 'hint-modal') {
        e.target.classList.remove('active');
    }
});

// === Telegram BackButton ===
if (tg) {
    tg.BackButton.onClick(() => {
        if (screens.viewer.classList.contains('active')) {
            openGallery(state.currentModule);
        } else if (screens.gallery.classList.contains('active')) {
            showScreen('menu');
        }
    });
}

// === Старт ===
showScreen('menu');
console.log('🎨 DrawMaster запущен! Животных:', window.DATA.animals.items.length);
