# LEXUS IS 200 — PROJECT BRIEF

## Стек
- HTML5, CSS3, JavaScript (Vanilla)
- GSAP + ScrollTrigger (анимации)
- Lenis (плавный скролл)
- Все библиотеки через CDN

## Структура output
index.html
css/style.css
js/main.js
assets/fonts/
assets/images/

## Правила кода
- Все цвета ТОЛЬКО через CSS переменные в :root
- Все <img> с loading="lazy" и object-fit: cover
- Мобильная адаптация: breakpoints 768px и 480px
- JS разбить на функции, комментарии на русском
- Плавный скролл через Lenis
- Анимации появления через GSAP ScrollTrigger

## Как читать prepared/
1. CLAUDE.md (этот файл)
2. main/prompt.txt
3. main/colors.txt
4. header/prompt.txt
5. sections/ по порядку: 01_, 02_, 03_, 04_, 05_, 06_
6. footer/prompt.txt
7. Изображения брать из images/ внутри каждой секции

## Команда запуска
Каждый раз когда заканчиваешь одну секцию дай знать и проси продолжать или нет.
Когда я напишу СТАРТ — прочитай все файлы в prepared/
и создай index.html, css/style.css, js/main.js с нуля.
