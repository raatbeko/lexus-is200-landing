// ===== ИНИЦИАЛИЗАЦИЯ LENIS (плавный скролл) =====
const lenis = new Lenis({
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  smooth: true,
});

function rafLoop(time) {
  lenis.raf(time);
  requestAnimationFrame(rafLoop);
}
requestAnimationFrame(rafLoop);

// Связываем Lenis с GSAP ScrollTrigger
lenis.on('scroll', ScrollTrigger.update);
gsap.ticker.add((time) => {
  lenis.raf(time * 1000);
});
gsap.ticker.lagSmoothing(0);

// ===== РЕГИСТРАЦИЯ ПЛАГИНОВ GSAP =====
gsap.registerPlugin(ScrollTrigger);

// ===== HEADER: появление сверху при загрузке =====
gsap.from('#header', {
  y: '-100%',
  duration: 0.8,
  ease: 'power3.out',
  delay: 0.3,
});

// ===== HEADER: фон при скролле =====
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});

// Активный пункт навигации при скролле
const navLinks = document.querySelectorAll('.header__nav-link');
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 120;
    if (window.scrollY >= sectionTop) {
      current = section.getAttribute('id');
    }
  });
  navLinks.forEach((link) => {
    link.classList.remove('active');
    const href = link.getAttribute('href').replace('#', '');
    if (href === current) {
      link.classList.add('active');
    }
  });
});

// ===== HERO: анимации при загрузке =====
const heroTl = gsap.timeline({ delay: 0.1 });

// Надпись eyebrow
heroTl.to('.hero__eyebrow', {
  opacity: 1,
  y: 0,
  duration: 0.6,
  ease: 'power2.out',
});

// Каждое слово заголовка с задержкой (stagger)
heroTl.to('.hero__word', {
  y: 0,
  opacity: 1,
  duration: 0.8,
  stagger: 0.15,
  ease: 'power3.out',
}, '-=0.2');

// Кнопка CTA
heroTl.to('.hero__cta', {
  opacity: 1,
  duration: 0.6,
  ease: 'power2.out',
}, '-=0.3');

// Слоган справа
heroTl.to('.hero__slogan', {
  opacity: 1,
  duration: 0.8,
  ease: 'power2.out',
}, '-=0.4');

// Плавный parallax на фоне hero при скролле
gsap.to('.hero__bg', {
  y: '-15%',
  ease: 'none',
  scrollTrigger: {
    trigger: '.hero',
    start: 'top top',
    end: 'bottom top',
    scrub: true,
  },
});

// ===== FEATURES: анимации при скролле =====

// Заголовок секции
gsap.from('.features .section-title', {
  y: 60,
  opacity: 0,
  duration: 0.9,
  ease: 'power3.out',
  scrollTrigger: {
    trigger: '.features',
    start: 'top 80%',
  },
});

gsap.from('.features .section-sub', {
  y: 30,
  opacity: 0,
  duration: 0.7,
  delay: 0.2,
  ease: 'power2.out',
  scrollTrigger: {
    trigger: '.features',
    start: 'top 80%',
  },
});

// Карточки с stagger
gsap.to('.feature-card', {
  y: 0,
  opacity: 1,
  duration: 0.8,
  stagger: 0.15,
  ease: 'power3.out',
  scrollTrigger: {
    trigger: '.features__grid',
    start: 'top 80%',
  },
});

// ===== SLOGAN: анимации при скролле =====

// Parallax фона slogan
gsap.to('.slogan__bg', {
  y: '-10%',
  ease: 'none',
  scrollTrigger: {
    trigger: '.slogan',
    start: 'top bottom',
    end: 'bottom top',
    scrub: true,
  },
});

// Красная вертикальная линия
gsap.to('.slogan__line', {
  scaleY: 1,
  duration: 0.6,
  ease: 'power2.out',
  scrollTrigger: {
    trigger: '.slogan',
    start: 'top 70%',
  },
});

// Текст слогана
gsap.to('.slogan__text-wrap', {
  y: 0,
  opacity: 1,
  duration: 1,
  ease: 'power3.out',
  scrollTrigger: {
    trigger: '.slogan',
    start: 'top 65%',
  },
});

// ===== SPECS: анимации при скролле =====

// Заголовок
gsap.from('.specs .section-title', {
  y: 50,
  opacity: 0,
  duration: 0.9,
  ease: 'power3.out',
  scrollTrigger: {
    trigger: '.specs',
    start: 'top 80%',
  },
});

// Строки характеристик с stagger
gsap.to('.specs__item', {
  x: 0,
  opacity: 1,
  duration: 0.6,
  stagger: 0.08,
  ease: 'power2.out',
  scrollTrigger: {
    trigger: '.specs__list',
    start: 'top 80%',
  },
});

// Фото машины справа
gsap.to('.specs__right', {
  x: 0,
  opacity: 1,
  duration: 1,
  ease: 'power3.out',
  scrollTrigger: {
    trigger: '.specs__inner',
    start: 'top 75%',
  },
});

// ===== COUNT UP: счётчики цифр =====
function countUp(el, target, isFloat) {
  const duration = 1500; // миллисекунды
  const start = performance.now();
  const decimals = isFloat ? 1 : 0;

  function update(time) {
    const elapsed = time - start;
    const progress = Math.min(elapsed / duration, 1);
    // Easing: ease-out cubic
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = eased * target;
    el.textContent = current.toFixed(decimals);
    if (progress < 1) {
      requestAnimationFrame(update);
    } else {
      el.textContent = target.toFixed(decimals);
    }
  }
  requestAnimationFrame(update);
}

// Запускаем счётчики при появлении секции specs
ScrollTrigger.create({
  trigger: '.specs__list',
  start: 'top 75%',
  once: true,
  onEnter: () => {
    document.querySelectorAll('.count-up').forEach((el) => {
      const target = parseFloat(el.dataset.target);
      const isFloat = el.dataset.float === '1';
      countUp(el, target, isFloat);
    });
  },
});

// ===== CONTACT: анимации при скролле =====
gsap.to('.contact__title', {
  y: 0,
  opacity: 1,
  duration: 0.9,
  ease: 'power3.out',
  scrollTrigger: {
    trigger: '.contact',
    start: 'top 80%',
  },
});

gsap.to('.contact__sub', {
  y: 0,
  opacity: 1,
  duration: 0.7,
  ease: 'power2.out',
  scrollTrigger: {
    trigger: '.contact',
    start: 'top 75%',
  },
});

gsap.to('.contact__form', {
  y: 0,
  opacity: 1,
  duration: 0.8,
  delay: 0.15,
  ease: 'power3.out',
  scrollTrigger: {
    trigger: '.contact',
    start: 'top 75%',
  },
});

// ===== COLOR PICKER =====
const cpColors = [
  {
    file:  'car-black.png',
    name:  'OBSIDIAN BLACK',
    price: 'от 8 500 $',
    desc:  'Классический чёрный. Агрессивный и безвременный.',
    glow:  'rgba(26,26,26,0.35)',
  },
  {
    file:  'car-white.png',
    name:  'PEARL WHITE',
    price: 'от 8 200 $',
    desc:  'Белый перламутр. Чистота японского дизайна.',
    glow:  'rgba(220,220,220,0.12)',
  },
  {
    file:  'car-gray.png',
    name:  'PLATINUM SILVER',
    price: 'от 7 900 $',
    desc:  'Серебро. Технологичность в каждом отблеске.',
    glow:  'rgba(168,168,168,0.18)',
  },
  {
    file:  'car-blue.png',
    name:  'MIDNIGHT BLUE',
    price: 'от 8 100 $',
    desc:  'Ночной синий. Редкий цвет для тонких ценителей.',
    glow:  'rgba(26,58,110,0.35)',
  },
];

const cpName     = document.getElementById('cpName');
const cpPrice    = document.getElementById('cpPrice');
const cpDesc     = document.getElementById('cpDesc');
const cpGlow     = document.getElementById('cpGlow');
const cpCounter  = document.getElementById('cpCounter');
const cpSwatches = document.querySelectorAll('.cp-swatch');

// Обновление UI при смене слайда
function cpUpdateUI(index) {
  const data = cpColors[index];

  // Свечение
  cpGlow.style.background = `radial-gradient(ellipse at center, ${data.glow} 0%, transparent 70%)`;

  // Текст: fade out → обновить → fade in
  gsap.to([cpName, cpPrice, cpDesc], {
    opacity: 0,
    y: -10,
    duration: 0.15,
    ease: 'power1.in',
    onComplete: () => {
      cpName.textContent  = data.name;
      cpPrice.textContent = data.price;
      cpDesc.textContent  = data.desc;
      gsap.to([cpName, cpPrice, cpDesc], {
        opacity: 1,
        y: 0,
        duration: 0.3,
        stagger: 0.05,
        ease: 'power2.out',
      });
    },
  });

  // Активный кружок и счётчик
  cpSwatches.forEach((s) => s.classList.remove('active'));
  cpSwatches[index].classList.add('active');
  cpCounter.textContent = `0${index + 1} / 04`;
}

// Инициализация Swiper
const cpSwiper = new Swiper('.cp-swiper', {
  effect: 'fade',
  fadeEffect: { crossFade: true },
  grabCursor: true,
  loop: true,
  speed: 600,
  on: {
    slideChange() {
      cpUpdateUI(this.realIndex);
    },
  },
});

// Кружки → slideToLoop
cpSwatches.forEach((swatch) => {
  swatch.addEventListener('click', () => {
    cpSwiper.slideToLoop(parseInt(swatch.dataset.index));
  });
});

// PREV / NEXT
document.getElementById('cpPrev').addEventListener('click', () => {
  cpSwiper.slidePrev();
});
document.getElementById('cpNext').addEventListener('click', () => {
  cpSwiper.slideNext();
});

// Появление секции при скролле
gsap.from('.colorpicker__info', {
  x: -60,
  opacity: 0,
  duration: 0.9,
  ease: 'power3.out',
  scrollTrigger: {
    trigger: '.colorpicker',
    start: 'top 75%',
  },
});
gsap.from('.colorpicker__stage', {
  y: 60,
  opacity: 0,
  duration: 1,
  ease: 'power3.out',
  scrollTrigger: {
    trigger: '.colorpicker',
    start: 'top 75%',
  },
});
gsap.from('.colorpicker__swatches', {
  x: 60,
  opacity: 0,
  duration: 0.9,
  ease: 'power3.out',
  scrollTrigger: {
    trigger: '.colorpicker',
    start: 'top 75%',
  },
});

// ===== МОБИЛЬНОЕ МЕНЮ (бургер) =====
const burgerBtn  = document.getElementById('burgerBtn');
const mobileNav  = document.getElementById('mobileNav');

if (burgerBtn && mobileNav) {
  burgerBtn.addEventListener('click', () => {
    const isOpen = burgerBtn.classList.toggle('open');
    mobileNav.classList.toggle('open', isOpen);
  });

  // Закрыть при клике на ссылку
  mobileNav.querySelectorAll('.header__mobile-link').forEach((link) => {
    link.addEventListener('click', () => {
      burgerBtn.classList.remove('open');
      mobileNav.classList.remove('open');
    });
  });
}

// ===== ФОРМА: обработка отправки =====
const form = document.getElementById('contactForm');
if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    btn.textContent = 'ЗАЯВКА ОТПРАВЛЕНА';
    btn.style.background = '#1a6b1a';
    btn.disabled = true;
    // Сбросить через 3 секунды
    setTimeout(() => {
      btn.textContent = 'ОТПРАВИТЬ ЗАЯВКУ';
      btn.style.background = '';
      btn.disabled = false;
      form.reset();
    }, 3000);
  });
}
