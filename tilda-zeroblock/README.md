# Перенос лендинга IVORY в Tilda (Zero Block)

## Структура файлов

| Файл | Куда вставлять в Tilda |
|------|------------------------|
| `1_head-scripts.html` | Настройки → HTML-код → `<head>` |
| `2_html-body.html` | Zero Block → HTML |
| `3_css.css` | Zero Block → CSS |
| `4_js_maps.js` | Настройки страницы → перед `</body>` |
| `4_js_main.js` | Zero Block → JS |

---

## Шаг 1 — Подготовка: загрузка медиафайлов

Загрузи все картинки через **Tilda → Медиатека** и запиши URL каждого файла.
Затем замени пути `prepared/...` в `2_html-body.html` и `4_js_main.js` на реальные URL из Tilda CDN.

### Список файлов для загрузки

**Основные изображения:**
```
prepared/sections/01_hero/image/background.webp
prepared/sections/01_hero/image/building.webp
prepared/sections/03_about/image/interior-circle.webp
prepared/sections/06_courtyard/image/courtyard-wide.webp
prepared/sections/06_courtyard/image/playground-aerial.webp
prepared/sections/07_green_hall/image/green-hall.webp
prepared/sections/07_green_hall/image/winter-garden.webp
prepared/sections/07_green_hall/image/sport-room.webp
prepared/sections/07_green_hall/image/library.webp
prepared/sections/07_green_hall/image/coworking.webp
prepared/sections/09_borsan/image/borsan-team.webp
prepared/sections/09_borsan/image/borsan-icon.svg
prepared/footer/image/BORSAN.svg
prepared/footer/image/icon.jpg
```

**Иконки технических решений:**
```
prepared/sections/08_technical/image/icon_lift.svg
prepared/sections/08_technical/image/icon_facade.svg
prepared/sections/08_technical/image/icon_window.svg
prepared/sections/08_technical/image/icon_360.svg
prepared/sections/08_technical/image/icon_parking.svg
prepared/sections/08_technical/image/icon_ceiling.svg
prepared/sections/08_technical/image/icon_access.svg
```

**Планировки (SVG):**
```
prepared/sections/10_plans/images/plan-block1/plan.svg
prepared/sections/10_plans/images/plan-block1/plan-1.svg  ... plan-5.svg
prepared/sections/10_plans/images/plan-block2/plan.svg
prepared/sections/10_plans/images/plan-block2/plan-1.svg  ... plan-7.svg
prepared/sections/10_plans/images/plan-block3/plan.svg
prepared/sections/10_plans/images/plan-block3/plan-1.svg  ... plan-4.svg
```

**Галерея:**
```
prepared/sections/11_gallery/image/1.webp  ...  26.webp  (без 17)
```

После загрузки:
- В `2_html-body.html` — найди строки с комментарием `<!-- IMAGE: ... -->` и замени `src="prepared/..."` на `src="https://cdn.tilda.ws/..."` 
- В `4_js_main.js` — замени строки `plansBase` и `galleryBase`:
  ```js
  // Было:
  const plansBase = 'prepared/sections/10_plans/images';
  const galleryBase = 'prepared/sections/11_gallery/image';
  
  // Стало (пример):
  const plansBase = 'https://cdn.tilda.ws/ВАШ_ПРОЕКТ/plans';
  const galleryBase = 'https://cdn.tilda.ws/ВАШ_ПРОЕКТ/gallery';
  ```

---

## Шаг 2 — Шрифт Great Vibes

**Вариант А (проще) — Google Fonts:**
В файле `3_css.css` убери блоки `@font-face` для Great Vibes (строки 1–17).
Шрифт уже подключён через Google Fonts в `1_head-scripts.html`.

**Вариант Б — загрузить локальные файлы:**
1. Загрузи `fonts/great-vibes-cyrillic.woff2` и `fonts/great-vibes-latin.woff2` в хостинг/CDN
2. В `3_css.css` замени `YOUR_CDN_URL` на реальный URL

---

## Шаг 3 — Настройки сайта в Tilda

1. Открой **Tilda** → твой сайт → **Настройки сайта**
2. Перейди в раздел **HTML-код**
3. В поле **Код в блоке HEAD** вставь содержимое `1_head-scripts.html`
4. Сохрани

---

## Шаг 4 — Создание страницы

1. Создай новую страницу
2. Удали все стандартные блоки Tilda (если есть)
3. Добавь блок **Zero Block** (T123)

> ⚠️ Zero Block требует тариф **Business** или выше.

---

## Шаг 5 — Вставка HTML в Zero Block

1. Открой Zero Block → нажми **HTML**
2. Вставь содержимое `2_html-body.html`
3. Нажми **Применить**

---

## Шаг 6 — Вставка CSS

1. В Zero Block откройте раздел **Стили** (иконка кисти)
2. Вставь содержимое `3_css.css`
3. Примени

> Если CSS не помещается — можно разместить его в **Настройки сайта → Свой CSS**.

---

## Шаг 7 — Вставка основного JS

1. В Zero Block открой раздел **JS** (иконка `</>`  или Script)
2. Вставь содержимое `4_js_main.js`
3. Примени

---

## Шаг 8 — Вставка Google Maps JS

1. Перейди в **Настройки страницы** → **Ещё** → **Добавить HTML перед `</body>`**
2. Вставь содержимое `4_js_maps.js` внутри тегов `<script>...</script>`
3. После этого добавь строку с загрузчиком карты:
   ```html
   <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBhwxvBopFiAyR16Gf-h59JH-KeObd_E-4&loading=async&callback=initMap" async defer></script>
   ```
4. Сохрани

> Важно: строка с `maps.googleapis.com` должна идти **после** кода с функцией `initMap`.

---

## Шаг 9 — Проверка и публикация

Перед публикацией проверь:

- [ ] Все изображения загружаются (нет сломанных иконок)
- [ ] Hero-секция отображается на весь экран
- [ ] Google Maps инициализируется и показывает маркеры
- [ ] Планировки переключаются (кнопки блоков и квартир)
- [ ] Галерея прокручивается автоматически, клик открывает модалку
- [ ] Форма заявки отправляет (или проверь Bitrix24 URL в `4_js_main.js`)
- [ ] Мобильное меню открывается/закрывается
- [ ] Анимации при скролле работают

---

## Шаг 10 — Настройка Bitrix24 (форма заявки)

В `4_js_main.js` найди строку:
```js
const BITRIX_URL = 'https://YOUR_DOMAIN.bitrix24.ru/rest/crm.lead.add.json';
```
Замени `YOUR_DOMAIN` на свой домен Bitrix24. Встречается в двух местах.

---

## Известные ограничения Tilda

| Проблема | Решение |
|----------|---------|
| CSS слишком большой для Zero Block | Перенести в **Настройки сайта → Свой CSS** |
| JS конфликтует с Tilda | Обернуть весь код в `(function(){...})()` |
| Фиксированный хедер перекрывает якоря | Добавить `scroll-margin-top: 80px` к секциям |
| Шрифты не отображаются | Проверить подключение в `<head>` |

---

## Структура проекта для справки

```
tilda-zeroblock/
├── README.md              ← этот файл
├── 1_head-scripts.html    ← вставить в <head>
├── 2_html-body.html       ← вставить в Zero Block HTML
├── 3_css.css              ← вставить в Zero Block CSS
├── 4_js_main.js           ← вставить в Zero Block JS
└── 4_js_maps.js           ← вставить перед </body>
```
