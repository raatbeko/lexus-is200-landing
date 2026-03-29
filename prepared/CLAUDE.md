# MNTN — HIKING GUIDE SITE

## Концепция
Редакционный сайт о походах и горах.
Тёмный стиль. Большие фото. Много воздуха между элементами.
Текст и фото чередуются — зигзаг паттерн (текст слева/фото справа, потом наоборот).

## Стек
- HTML5, CSS3, JavaScript (Vanilla)
- GSAP + ScrollTrigger (анимации появления)
- Lenis (плавный скролл)
- Все библиотеки через CDN

## Структура output
index.html
css/style.css
js/main.js
assets/fonts/
assets/images/

## Правила кода
- на какой размер ставлены настройки positions в промптах далее (w1920, h4600) это доска с фигмы, далее будут такие параметры запомни это.
- Все цвета через CSS переменные в :root
- Шрифты: заголовки + основной текст (см. main/prompt.txt)
- Мобильная адаптация: 768px и 480px
- Все img: loading="lazy", object-fit: cover
- Комментарии на русском

## Как читать prepared/
1. CLAUDE.md
2. main/prompt.txt + colors.txt
3. header/prompt.txt
4. sections/ по порядку 01_ → 04_
5. footer/prompt.txt

## Команда запуска
Каждый раз когда заканчиваешь одну секцию дай знать и проси продолжать или нет.
Когда я напишу СТАРТ — прочитай все файлы в prepared/
и создай index.html, css/style.css, js/main.js с нуля.