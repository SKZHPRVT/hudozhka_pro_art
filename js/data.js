/* ============================================
   БАЗА ДАННЫХ: Рисуем 50 животных (Эймис)
   Каждая страница = 1 урок = 6-8 шагов
   ============================================ */

const DATA = {
    // ===== МОДУЛЬ 1: РИСУЕМ ЖИВОТНЫХ =====
    animals: {
        title: 'Рисуем животных',
        subtitle: '50 уроков по методу Ли Эймиса',
        items: [
            { id: 'butterfly',   name: 'Бабочка',      emoji: '🦋', page: 'assets/animals/butterfly/page.png',   hint: 'Симметрия — ключ к успеху. Левое и правое крыло должны быть зеркальны.' },
            { id: 'bird1',       name: 'Птица',        emoji: '🐦', page: 'assets/animals/bird1/page.png',       hint: 'Начни с овала тела и круга головы. Обрати внимание на форму клюва.' },
            { id: 'bird2',       name: 'Птица (полёт)', emoji: '🕊️', page: 'assets/animals/bird2/page.png',      hint: 'Обрати внимание на размах крыльев. Композиция — динамичная диагональ.' },
            { id: 'parrot',      name: 'Попугай',      emoji: '🦜', page: 'assets/animals/parrot/page.png',      hint: 'Тело — большой овал, голова — малый круг. Длинный хвост создаёт ритм.' },
            { id: 'bird3',       name: 'Птица',        emoji: '🐧', page: 'assets/animals/bird3/page.png',       hint: 'Птица сидит на ветке. Обрати внимание на композиционный центр.' },
            { id: 'bird4',       name: 'Снегирь',      emoji: '🐦', page: 'assets/animals/bird4/page.png',       hint: 'Маленькая птичка. Используй ритм перьев для передачи текстуры.' },
            { id: 'rabbit',      name: 'Заяц',         emoji: '🐰', page: 'assets/animals/rabbit/page.png',      hint: 'Длинные уши и мощные задние лапы. Тело — сочетание овалов.' },
            { id: 'turtle',      name: 'Черепаха',     emoji: '🐢', page: 'assets/animals/turtle/page.png',      hint: 'Панцирь — купол. Используй эллипсы в перспективе.' },
            { id: 'snail',       name: 'Улитка',       emoji: '🐌', page: 'assets/animals/snail/page.png',       hint: 'Раковина — спираль. Начни с круга и закручивай.' },
            { id: 'frog',        name: 'Лягушка',      emoji: '🐸', page: 'assets/animals/frog/page.png',        hint: 'Приземистая поза. Задние лапы — пружина.' },
            { id: 'squirrel',    name: 'Белка',        emoji: '🐿️', page: 'assets/animals/squirrel/page.png',    hint: 'Пушистый хвост — доминанта. Он больше тела.' },
            { id: 'mouse',       name: 'Мышь',         emoji: '🐭', page: 'assets/animals/mouse/page.png',       hint: 'Маленькое тело, длинный хвост. Уши — круги.' },
            { id: 'cat-sit',     name: 'Кошка (сидит)', emoji: '🐱', page: 'assets/animals/cat-sit/page.png',    hint: 'Треугольник — основа силуэта. Хвост обёрнут вокруг лап.' },
            { id: 'cat-stand',   name: 'Кошка (стоит)', emoji: '🐈', page: 'assets/animals/cat-stand/page.png',  hint: 'Хищник в стойке. Обрати внимание на изгиб спины.' },
            { id: 'leopard',     name: 'Леопард',      emoji: '🐆', page: 'assets/animals/leopard/page.png',     hint: 'Пятна — ритм по всему телу. Длинный хвост создаёт баланс.' },
            { id: 'tiger',       name: 'Тигр',         emoji: '🐅', page: 'assets/animals/tiger/page.png',       hint: 'Полосы идут по форме тела. Доминанта — голова.' },
            { id: 'lion-head',   name: 'Лев (голова)', emoji: '🦁', page: 'assets/animals/lion-head/page.png',   hint: 'Грива обрамляет голову как рама. Доминанта композиции.' },
            { id: 'lion-body',   name: 'Лев',          emoji: '🦁', page: 'assets/animals/lion-body/page.png',   hint: 'Царь зверей. Мощная грудь, грива, хвост с кисточкой.' },
            { id: 'dog1',        name: 'Собака',       emoji: '🐕', page: 'assets/animals/dog1/page.png',        hint: 'Стоячая поза. Начни с прямоугольников корпуса.' },
            { id: 'dog2',        name: 'Овчарка',      emoji: '🐕‍🦺', page: 'assets/animals/dog2/page.png',       hint: 'Уши торчком — характерная черта породы.' },
            { id: 'horse',       name: 'Конь',         emoji: '🐎', page: 'assets/animals/horse/page.png',       hint: 'Динамичная поза. Встающий на дыбы конь — диагональ.' },
            { id: 'horse-head',  name: 'Голова коня',  emoji: '🐴', page: 'assets/animals/horse-head/page.png',  hint: 'Вытянутая морда. Уши — треугольники.' },
            { id: 'buffalo',     name: 'Буйвол',       emoji: '🐃', page: 'assets/animals/buffalo/page.png',     hint: 'Массивное тело. Горб — доминанта силуэта.' },
            { id: 'elephant',    name: 'Слон',         emoji: '🐘', page: 'assets/animals/elephant/page.png',    hint: 'Хобот — характерная черта. Уши — большие пласты.' },
            { id: 'camel',       name: 'Верблюд',      emoji: '🐫', page: 'assets/animals/camel/page.png',       hint: 'Горб — центр композиции. Длинная шея.' },
            { id: 'monkey',      name: 'Обезьяна',     emoji: '🐒', page: 'assets/animals/monkey/page.png',      hint: 'Длинный хвост создаёт динамическую диагональ.' },
            { id: 'seal',        name: 'Тюлень',       emoji: '🦭', page: 'assets/animals/seal/page.png',        hint: 'Обтекаемая форма. Ласты — плавники.' },
            { id: 'penguin',     name: 'Пингвин',      emoji: '🐧', page: 'assets/animals/penguin/page.png',     hint: 'Прямоугольная фигура. Чёрно-белый контраст.' },
            { id: 'deer',        name: 'Олень',        emoji: '🦌', page: 'assets/animals/deer/page.png',        hint: 'Рога — доминанта. Изящные ноги.' },
            { id: 'bear',        name: 'Медведь',      emoji: '🐻', page: 'assets/animals/bear/page.png',        hint: 'Массивное тело. Идёт вразвалку.' },
            { id: 'dolphin',     name: 'Дельфин',      emoji: '🐬', page: 'assets/animals/dolphin/page.png',     hint: 'Обтекаемая форма. Плавники — треугольники.' },
            { id: 'duckling',    name: 'Утёнок',       emoji: '🐤', page: 'assets/animals/duckling/page.png',    hint: 'Пушистый комочек. Круглая голова, малый клюв.' },
            { id: 'duck',        name: 'Утка',         emoji: '🦆', page: 'assets/animals/duck/page.png',        hint: 'Тело — овал, голова — круг. Плоский клюв.' },
            { id: 'swan',        name: 'Лебедь',       emoji: '🦢', page: 'assets/animals/swan/page.png',        hint: 'Изящная S-образная шея. Доминанта силуэта.' },
            { id: 'rooster',     name: 'Петух',        emoji: '🐓', page: 'assets/animals/rooster/page.png',     hint: 'Пышный хвост. Используй ритм перьев.' },
            { id: 'turkey',      name: 'Индюк',        emoji: '🦃', page: 'assets/animals/turkey/page.png',      hint: 'Веер хвоста. Характерная бородка.' },
            { id: 'pig',         name: 'Свинья',       emoji: '🐷', page: 'assets/animals/pig/page.png',         hint: 'Розовое тело — овал. Пятачок — круг.' },
            { id: 'cow',         name: 'Корова',       emoji: '🐮', page: 'assets/animals/cow/page.png',         hint: 'Пятна — ритм. Рога и вымя.' },
            { id: 'rhino',       name: 'Носорог',      emoji: '🦏', page: 'assets/animals/rhino/page.png',       hint: 'Рог — доминанта. Толстая кожа — текстура.' },
            { id: 'giraffe',     name: 'Жираф',        emoji: '🦒', page: 'assets/animals/giraffe/page.png',     hint: 'Длинная шея. Пятна — ритм по телу.' },
            { id: 'kangaroo',    name: 'Кенгуру',      emoji: '🦘', page: 'assets/animals/kangaroo/page.png',    hint: 'Мощные задние лапы. Длинный хвост — баланс.' },
            { id: 'fish1',       name: 'Рыбка',        emoji: '🐠', page: 'assets/animals/fish1/page.png',       hint: 'Симметричный силуэт. Плавники — веера.' },
            { id: 'fish2',       name: 'Рыба',         emoji: '🐟', page: 'assets/animals/fish2/page.png',       hint: 'Чешуя — ритм по телу. Плавники — треугольники.' },
            { id: 'shark',       name: 'Акула',        emoji: '🦈', page: 'assets/animals/shark/page.png',       hint: 'Хищный силуэт. Плавник на спине — доминанта.' },
            { id: 'crab',        name: 'Краб',         emoji: '🦀', page: 'assets/animals/crab/page.png',        hint: 'Клешни — доминанта. Панцирь — овал.' },
            { id: 'dinosaur',    name: 'Динозавр',     emoji: '🦖', page: 'assets/animals/dinosaur/page.png',    hint: 'Хищник. Острые зубы, длинный хвост.' },
            { id: 'lizard',      name: 'Ящерица',      emoji: '🦎', page: 'assets/animals/lizard/page.png',      hint: 'Длинный хвост. Чешуя — текстура.' },
            { id: 'spider',      name: 'Паук',         emoji: '🕷️', page: 'assets/animals/spider/page.png',      hint: 'Симметрия из 8 лап. Тело — два круга.' },
            { id: 'beetle',      name: 'Жук',          emoji: '🪲', page: 'assets/animals/beetle/page.png',      hint: 'Симметрия тела. Панцирь — овал.' },
            { id: 'dragonfly',   name: 'Стрекоза',     emoji: '🦗', page: 'assets/animals/dragonfly/page.png',   hint: 'Прозрачные крылья. Симметрия — ключ к успеху.' }
        ]
    },

    // ===== МОДУЛЬ 2: КОМПОЗИЦИЯ (пока пусто) =====
    composition: {
        title: 'Композиция',
        subtitle: 'Теория и практика',
        items: []
    },

    // ===== МОДУЛЬ 3: АКАДЕМИЧЕСКИЙ РИСУНОК (пока пусто) =====
    academic: {
        title: 'Академический рисунок',
        subtitle: 'Основы учебного рисунка',
        items: []
    }
};

window.DATA = DATA;
console.log('📚 База данных загружена:', {
    animals: DATA.animals.items.length,
    composition: DATA.composition.items.length,
    academic: DATA.academic.items.length
});
