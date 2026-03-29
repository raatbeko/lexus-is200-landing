/* ========================
   LENIS — плавный скролл
   ======================== */
const lenis = new Lenis({
  duration: 1.4,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  smooth: true,
});

// Связываем Lenis с GSAP ticker
gsap.ticker.add((time) => {
  lenis.raf(time * 1000);
});

gsap.ticker.lagSmoothing(0);

// Связываем Lenis с ScrollTrigger
lenis.on('scroll', ScrollTrigger.update);

/* ========================
   GSAP — регистрируем плагин
   ======================== */
gsap.registerPlugin(ScrollTrigger);

/* ========================
   HEADER — фон при скролле
   ======================== */
const header = document.getElementById('header');

ScrollTrigger.create({
  start: 80,
  onEnter: () => header.classList.add('scrolled'),
  onLeaveBack: () => header.classList.remove('scrolled'),
});

/* ========================
   HEADER — анимация появления
   ======================== */
gsap.from(header, {
  y: -100,
  opacity: 0,
  duration: 0.8,
  ease: 'power2.out',
});

/* ========================
   HERO — анимация при загрузке
   ======================== */

// Метка "A HIKING GUIDE"
gsap.to('.hero__label', {
  opacity: 1,
  duration: 0.8,
  delay: 0.3,
  ease: 'power2.out',
});

// Заголовок — строки появляются снизу с stagger
gsap.to('.hero__title-line', {
  opacity: 1,
  y: 0,
  duration: 0.9,
  delay: 0.5,
  stagger: 0.2,
  ease: 'power2.out',
});

/* ========================
   HERO — parallax при скролле
   Скорости разные → создают глубину
   bg (далеко) движется сильнее, vg (близко) — меньше
   ======================== */
const heroParallax = [
  { selector: '.hero__layer--bg', yPercent: -20 },
  { selector: '.hero__layer--hg', yPercent: -14 },
  { selector: '.hero__layer--mg', yPercent: -8  },
  { selector: '.hero__layer--vg', yPercent: -3  },
];

heroParallax.forEach(({ selector, yPercent }) => {
  gsap.to(selector, {
    yPercent,
    ease: 'none',
    scrollTrigger: {
      trigger: '.hero',
      start: 'top top',
      end: 'bottom top',
      scrub: 1,
    },
  });
});

/* ========================
   СТАТЬИ — анимации при скролле
   Функция принимает идентификатор секции
   ======================== */
function animateArticle(sectionId) {
  const section = document.getElementById(sectionId);
  if (!section) return;

  // Номер секции
  gsap.to(section.querySelector('.article__number'), {
    opacity: 1,
    duration: 0.6,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: section,
      start: 'top 80%',
    },
  });

  // Текстовые элементы с stagger
  const textEls = section.querySelectorAll('.article__label, .article__title, .article__desc, .article__link');

  gsap.to(textEls, {
    opacity: 1,
    y: 0,
    duration: 0.8,
    stagger: 0.15,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: section,
      start: 'top 75%',
    },
  });

  // Фото — появляется чуть позже
  gsap.to(section.querySelector('.article__photo'), {
    opacity: 1,
    y: 0,
    duration: 0.9,
    delay: 0.2,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: section,
      start: 'top 75%',
    },
  });
}

animateArticle('article-01');
animateArticle('article-02');
animateArticle('article-03');
