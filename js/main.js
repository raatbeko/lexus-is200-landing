// ===== WebP support detection =====
const supportsWebP = (() => {
  const canvas = document.createElement('canvas');
  canvas.width = 1; canvas.height = 1;
  return canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0;
})();

// ===== Immediate mobile detection =====
let isMobile = window.innerWidth <= 768;

window.addEventListener('resize', () => {
  isMobile = window.innerWidth <= 768;
  ScrollTrigger.refresh();
});

// If mobile, skip all JS animations and scripts
if (isMobile) {
  document.documentElement.classList.add('is-mobile');
}

// ===== GSAP + ScrollTrigger =====
gsap.registerPlugin(ScrollTrigger);

// Mobile: prevent layout thrash and scroll jank
if (isMobile) {
  ScrollTrigger.config({
    ignoreMobileResize: true,
    autoRefreshEvents: 'visibilitychange,DOMContentLoaded,load',
  });
  // normalizeScroll убран — нативный скролл браузера плавнее любой JS-замены
}

// ===== HERO TIMELINE =====
const tl = gsap.timeline();
tl.from('.hero__tag', {
  opacity: 0,
  y: 12,
  duration: 0.5,
  stagger: 0.07,
  ease: 'power3.out',
}, 0.8);

// ===== ХЕДЕР =====
const header = document.getElementById('header');

window.addEventListener('scroll', () => {
  if (window.scrollY > 80) {
    header.classList.add('scrolled', 'visible');
  } else {
    header.classList.remove('scrolled', 'visible');
  }
}, { passive: true });

// ===== ГАМБУРГЕР МЕНЮ =====
const burger = document.getElementById('burger');
const mobileMenu = document.getElementById('mobileMenu');
const mobileLinks = document.querySelectorAll('.mobile-menu__link, .mobile-menu__cta');

burger.addEventListener('click', () => {
  const isOpen = burger.classList.toggle('open');
  mobileMenu.classList.toggle('open', isOpen);
  document.body.style.overflow = isOpen ? 'hidden' : '';
});

mobileLinks.forEach(link => {
  link.addEventListener('click', () => {
    burger.classList.remove('open');
    mobileMenu.classList.remove('open');
    document.body.style.overflow = '';
  });
});

document.getElementById('heroArrow').addEventListener('click', () => {
  document.querySelector('#about-section, .about').scrollIntoView({ behavior: 'smooth' });
});

// ===== SLIDE-IN АНИМАЦИИ =====
function createSlideInAnimations() {
  // На мобиле — нативный скролл + GSAP ScrollTrigger конфликтуют (iOS rubber band,
  // momentum scroll даёт "кривые" позиции). Элементы мигают и opacity застревает в 0.
  // Решение как у Tilda: на мобиле вообще без scroll-анимаций — элементы просто видны.
  if (isMobile) return;

  // Helper: пропускает анимацию если элемент не найден в DOM
  const gsapFrom = (target, vars) => {
    if (!document.querySelector(target)) return;
    gsap.from(target, vars);
  };

  const xL = -60;
  const xR = 60;
  const xLg = 80;
  const xRg = 80;
  const xXl = 100;
  const yBase = 40;
  const dur = 0.8;

  // О ПРОЕКТЕ: текст слева, фото справа
  gsap.from('#aboutTitle', {
    opacity: 0,
    x: xL,
    y: 0,
    duration: dur,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '#about-section',
      start: 'top 75%',
      once: true,
    },
  });

  gsap.from('#aboutP1, #aboutP2', {
    opacity: 0,
    x: -40,
    y: 0,
    duration: dur,
    stagger: 0.2,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '#aboutP1',
      start: 'top 80%',
      once: true,
    },
  });

  gsap.from('#aboutPhoto', {
    opacity: 0,
    x: xRg,
    y: 0,
    duration: dur,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '#about-section',
      start: 'top 70%',
      once: true,
    },
  });

  // О ПРОЕКТЕ: круг уменьшается при скролле (scale 1.3 → 1) — только десктоп
  gsap.fromTo('.about__photo',
    { scale: 1.3, transformOrigin: 'center center' },
    {
      scale: 1,
      transformOrigin: 'center center',
      ease: 'none',
      force3D: true,
      scrollTrigger: {
        trigger: '.about',
        start: 'top bottom',
        end: 'center center',
        scrub: 0.5,
      },
    }
  );

  // ОКРУЖЕНИЕ: заголовок сверху
  gsapFrom('#surTitle', {
    opacity: 0,
    y: yBase,
    duration: dur,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '#infrastructure',
      start: 'top 80%',
      once: true,
    },
  });

  // Фото слева
  gsapFrom('#surLeft', {
    opacity: 0,
    x: -80,
    y: 0,
    duration: dur,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '#surLeft',
      start: 'top 75%',
      once: true,
    },
  });

  // Текст справа
  gsapFrom('#surRight', {
    opacity: 0,
    x: xR,
    y: 0,
    duration: 0.9,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '#surRight',
      start: 'top 75%',
      once: true,
    },
  });

  // Карта снизу
  gsap.from('#surMap', {
    opacity: 0,
    y: yBase,
    duration: 0.9,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '#surMap',
      start: 'top 85%',
      once: true,
    },
  });

  // АРХИТЕКТУРА: текст слева, круги справа
  gsapFrom('#archText', {
    opacity: 0,
    x: xL,
    y: 0,
    duration: 0.9,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '#architecture',
      start: 'top 75%',
      once: true,
    },
  });

  gsapFrom('#archBig', {
    opacity: 0,
    x: xXl,
    y: 0,
    duration: dur,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '#archBig',
      start: 'top 80%',
      once: true,
    },
  });

  gsapFrom('#archSmall', {
    opacity: 0,
    x: 60,
    y: 40,
    duration: dur,
    delay: 0.2,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '#archSmall',
      start: 'top 80%',
      once: true,
    },
  });

  // ДВОР: текст слева, фото справа
  gsap.from('#courtyardText', {
    opacity: 0,
    x: xL,
    y: 0,
    duration: 0.9,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '#courtyard',
      start: 'top 75%',
      once: true,
    },
  });

  gsap.from('#cyard1', {
    opacity: 0,
    x: xRg,
    y: 0,
    duration: dur,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '#courtyardCircles',
      start: 'top 80%',
      once: true,
    },
  });

  gsap.from('#cyard2', {
    opacity: 0,
    x: 50,
    y: 30,
    duration: dur,
    delay: 0.2,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '#courtyardCircles',
      start: 'top 80%',
      once: true,
    },
  });

  // ТЕХНИЧЕСКИЕ РЕШЕНИЯ
  gsap.from('.tech__title', {
    opacity: 0,
    y: yBase,
    duration: dur,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '.tech__main',
      start: 'top 80%',
      once: true,
    },
  });

  gsapFrom('.tech__image-wrap', {
    opacity: 0,
    y: yBase,
    duration: 0.9,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '.tech__image-wrap',
      start: 'top 85%',
      once: true,
    },
  });

  // ПЛАНИРОВКИ
  gsap.from('.plans__header', {
    opacity: 0,
    y: yBase,
    duration: dur,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '#plans',
      start: 'top 80%',
      once: true,
    },
  });

  gsap.from('.plans__blocks', {
    opacity: 0,
    y: 30,
    duration: 0.7,
    delay: 0.1,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '.plans__blocks',
      start: 'top 85%',
      once: true,
    },
  });

  gsap.from('.plans__apts', {
    opacity: 0,
    y: 20,
    duration: 0.6,
    delay: 0.2,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '.plans__apts',
      start: 'top 85%',
      once: true,
    },
  });

  // BORSAN SERVICE
  gsap.from('#borsanLeft', {
    opacity: 0,
    x: -80,
    y: 0,
    duration: dur,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '#contacts',
      start: 'top 75%',
      once: true,
    },
  });

  gsap.from('#borsanPhoto', {
    opacity: 0,
    x: xRg,
    y: 0,
    duration: dur,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '#contacts',
      start: 'top 75%',
      once: true,
    },
  });
}

createSlideInAnimations();

// ===== MOBILE АНИМАЦИИ: IntersectionObserver + CSS transitions =====
// Только opacity (без transform) — не нагружает GPU при обратном скролле.
// Элементы уже видимые при загрузке — не скрываем (иначе мигают при скролле вверх).
if (isMobile) {
  const mobTargets = [
    '#aboutTitle', '#aboutP1', '#aboutP2', '#aboutPhoto',
    '#surTitle', '#surLeft', '#surRight', '#surMap',
    '#archText', '#archBig', '#archSmall',
    '#courtyardText', '#cyard1', '#cyard2',
    '.tech__title', '.tech__image-wrap',
    '.plans__header', '.plans__blocks', '.plans__apts',
    '#borsanLeft', '#borsanPhoto',
  ];

  const mobObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('mob-anim--visible');
        mobObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });

  const vh = window.innerHeight;
  mobTargets.forEach(selector => {
    document.querySelectorAll(selector).forEach(el => {
      const rect = el.getBoundingClientRect();
      // Элемент уже в viewport при загрузке — не скрываем, не наблюдаем
      if (rect.top < vh && rect.bottom > 0) return;
      el.classList.add('mob-anim');
      mobObserver.observe(el);
    });
  });
}

// ===== ПЛАНИРОВКИ =====
const plansBase = 'prepared/sections/10_plans/images';
const plansData = {
  1: [
    { size: 'Планировка', rooms: ' ', desc: '', img: `${plansBase}/plan-block1/plan.svg` },
    { size: '48,48 м²', rooms: '2-комнатная', desc: 'Квартира для семьи, которая хочет расти', img: `${plansBase}/plan-block1/plan-1.svg` },
    { size: '63,40 м²', rooms: '2-комнатная', desc: 'Квартира для семьи, которая хочет расти', img: `${plansBase}/plan-block1/plan-2.svg` },
    { size: '64,13 м²', rooms: '2-комнатная', desc: 'Квартира для семьи, которая хочет расти', img: `${plansBase}/plan-block1/plan-3.svg` },
    { size: '68,76 м²', rooms: '3-комнатная', desc: 'Квартира для большой семьи', img: `${plansBase}/plan-block1/plan-4.svg` },
    { size: '82,50 м²', rooms: '3-комнатная', desc: 'Квартира для большой семьи', img: `${plansBase}/plan-block1/plan-5.svg` },
  ],
  2: [
    { size: 'Планировка', rooms: ' ', desc: '', img: `${plansBase}/plan-block2/plan.svg` },
    { size: '48,52 м²', rooms: '1-комнатная', desc: 'Квартира для молодой семьи', img: `${plansBase}/plan-block2/plan-1.svg` },
    { size: '49,32 м²', rooms: '1-комнатная', desc: 'Квартира для молодой семьи', img: `${plansBase}/plan-block2/plan-2.svg` },
    { size: '58,17 м²', rooms: '2-комнатная', desc: 'Квартира для семьи, которая хочет расти', img: `${plansBase}/plan-block2/plan-3.svg` },
    { size: '80,71 м²', rooms: '3-комнатная', desc: 'Квартира для большой семьи', img: `${plansBase}/plan-block2/plan-4.svg` },
    { size: '89,22 м²', rooms: '3-комнатная', desc: 'Квартира для большой семьи', img: `${plansBase}/plan-block2/plan-5.svg` },
    { size: '98,61 м²', rooms: '3-комнатная', desc: 'Квартира для большой семьи', img: `${plansBase}/plan-block2/plan-6.svg` },
    { size: '108,16 м²', rooms: '4-комнатная', desc: 'Квартира для большой семьи', img: `${plansBase}/plan-block2/plan-7.svg` },
  ],
  3: [
    { size: 'Планировка', rooms: ' ', desc: '', img: `${plansBase}/plan-block3/plan.svg` },
    { size: '51,55 м²', rooms: '2-комнатная', desc: 'Квартира для семьи, которая хочет расти', img: `${plansBase}/plan-block3/plan-1.svg` },
    { size: '64,69 м²', rooms: '3-комнатная', desc: 'Квартира для большой семьи', img: `${plansBase}/plan-block3/plan-2.svg` },
    { size: '68,91 м²', rooms: '2-комнатная', desc: 'Квартира для семьи, которая хочет расти', img: `${plansBase}/plan-block3/plan-3.svg` },
    { size: '82,37 м²', rooms: '3-комнатная', desc: 'Квартира для большой семьи', img: `${plansBase}/plan-block3/plan-4.svg` },
  ],
};

const plansApts = document.getElementById('plansApts');
const planSize = document.getElementById('planSize');
const planRooms = document.getElementById('planRooms');
const blockTabs = document.querySelectorAll('.plans__block-tab');

function renderApts(block, activeIndex = 0) {
  plansApts.innerHTML = '';
  plansData[block].forEach((apt, i) => {
    const btn = document.createElement('button');
    btn.className = 'plans__apt-tab' + (i === activeIndex ? ' plans__apt-tab--active' : '');
    btn.textContent = apt.size;
    btn.addEventListener('click', () => selectApt(block, i));
    plansApts.appendChild(btn);
  });
}

let plansInited = false;

// ===== ZOOM + PAN =====
let currentScale = 0.8;
const minScale = 0.3;
const maxScale = 3;
const zoomStep = 0.25;
const planImg = document.getElementById('planSvg');

// Применить начальный зум при загрузке
window.addEventListener('load', () => {
  if (planImg) updateTransform();
});
let translateX = 0, translateY = 0;
let isDragging = false;
let startX, startY;
let initialPinchDistance = null;
let lastTouchX, lastTouchY;

function updateTransform() {
  const card = document.getElementById('planPlanCard');
  const imgRect = planImg.getBoundingClientRect();
  const cardRect = card.getBoundingClientRect();

  const maxX = Math.max(0, (imgRect.width * currentScale - cardRect.width) / 2);
  const maxY = Math.max(0, (imgRect.height * currentScale - cardRect.height) / 2);

  translateX = Math.min(maxX, Math.max(-maxX, translateX));
  translateY = Math.min(maxY, Math.max(-maxY, translateY));

  planImg.style.transform = `scale(${currentScale}) translate(${translateX / currentScale}px, ${translateY / currentScale}px)`;
}

// Кнопки зума
document.getElementById('zoomIn').addEventListener('click', () => {
  if (currentScale < maxScale) {
    currentScale += zoomStep;
    updateTransform();
    planImg.style.cursor = 'grab';
  }
});

document.getElementById('zoomOut').addEventListener('click', () => {
  if (currentScale > minScale) {
    currentScale -= zoomStep;
    if (currentScale <= 1) {
      currentScale = 1;
      translateX = 0;
      translateY = 0;
      planImg.style.cursor = 'default';
    }
    updateTransform();
    planImg.style.cursor = currentScale > 1 ? 'grab' : 'default';
  }
});

document.getElementById('zoomReset').addEventListener('click', () => {
  currentScale = 1;
  translateX = 0;
  translateY = 0;
  updateTransform();
  planImg.style.cursor = 'default';
});

// Мышь
planImg.addEventListener('mousedown', (e) => {
  if (currentScale === 1) return;
  isDragging = true;
  startX = e.clientX - translateX;
  startY = e.clientY - translateY;
  planImg.style.cursor = 'grabbing';
  e.preventDefault();
});

document.addEventListener('mousemove', (e) => {
  if (!isDragging) return;
  translateX = e.clientX - startX;
  translateY = e.clientY - startY;
  updateTransform();
});

document.addEventListener('mouseup', () => {
  if (!isDragging) return;
  isDragging = false;
  planImg.style.cursor = currentScale > 1 ? 'grab' : 'default';
});

// Тач
planImg.addEventListener('touchstart', (e) => {
  if (e.touches.length === 1) {
    lastTouchX = e.touches[0].clientX - translateX;
    lastTouchY = e.touches[0].clientY - translateY;
  }
  if (e.touches.length === 2) {
    initialPinchDistance = Math.hypot(
      e.touches[0].clientX - e.touches[1].clientX,
      e.touches[0].clientY - e.touches[1].clientY
    );
  }
  e.preventDefault();
}, { passive: false });

planImg.addEventListener('touchmove', (e) => {
  const isPanning = e.touches.length === 1 && currentScale > 1;
  const isPinching = e.touches.length === 2 && initialPinchDistance;

  if (isPanning) {
    translateX = e.touches[0].clientX - lastTouchX;
    translateY = e.touches[0].clientY - lastTouchY;
    updateTransform();
  }
  if (isPinching) {
    const currentDistance = Math.hypot(
      e.touches[0].clientX - e.touches[1].clientX,
      e.touches[0].clientY - e.touches[1].clientY
    );
    const ratio = currentDistance / initialPinchDistance;
    currentScale = Math.min(maxScale, Math.max(minScale, currentScale * ratio));
    initialPinchDistance = currentDistance;
    updateTransform();
  }
  // Блокируем дефолт только при реальном жесте — иначе страница может скроллиться
  if (isPanning || isPinching) {
    e.preventDefault();
  }
}, { passive: false });

planImg.addEventListener('touchend', () => {
  initialPinchDistance = null;
});

// Скрыть drag-подсказку после первого взаимодействия
const planCard = document.getElementById('planPlanCard');

planCard.addEventListener('mousedown', () => {
  const hint = document.getElementById('dragHint');
  if (hint) hint.classList.add('hidden');
  setTimeout(() => { if (hint) hint.remove(); }, 400);
}, { once: true });

planCard.addEventListener('touchstart', () => {
  const hint = document.getElementById('dragHint');
  if (hint) hint.classList.add('hidden');
  setTimeout(() => { if (hint) hint.remove(); }, 400);
}, { once: true });

// Мобильный зум поверх фото: перемещаем кнопки в оверлей на карточке
if (window.innerWidth <= 768) {
  const mobileZoom = document.createElement('div');
  mobileZoom.className = 'plans__mobile-zoom';
  // Переносим существующие кнопки (с уже привязанными listeners) в оверлей
  const zoomControls = document.querySelector('.plans__zoom-controls');
  if (zoomControls) {
    while (zoomControls.firstChild) {
      mobileZoom.appendChild(zoomControls.firstChild);
    }
    zoomControls.remove();
  }
  planCard.appendChild(mobileZoom);
}

let selectAptTimer = null;

function selectApt(block, index, skipScroll = false) {
  currentScale = 0.8;
  translateX = 0;
  translateY = 0;
  updateTransform();
  planImg.style.cursor = 'default';

  const apt = plansData[block][index];

  // Debounce rapid tab clicks — wait 80ms before actually loading image
  clearTimeout(selectAptTimer);
  selectAptTimer = setTimeout(() => {
    gsap.to('#planPlanCard', {
      opacity: 0,
      duration: 0.2,
      ease: 'power2.in',
      onComplete: () => {
        planImg.src = apt.img;
        planImg.onload = () => {
          gsap.to('#planPlanCard', { opacity: 1, duration: 0.4, ease: 'power2.out' });
        };
      },
    });
  }, 80);

  planSize.textContent = apt.size;
  planRooms.textContent = apt.rooms;
  document.getElementById('planDesc').textContent = apt.desc;

  document.querySelectorAll('.plans__apt-tab').forEach((b, i) =>
    b.classList.toggle('plans__apt-tab--active', i === index)
  );
}

blockTabs.forEach(tab => {
  tab.addEventListener('click', () => {
    blockTabs.forEach(t => t.classList.remove('plans__block-tab--active'));
    tab.classList.add('plans__block-tab--active');
    const block = +tab.dataset.block;
    plansInited = true;
    renderApts(block, 0);
    selectApt(block, 0);
  });
});

// Defer plans init until user is near the section
const plansSectionEl = document.querySelector('.plans');
if (plansSectionEl) {
  const plansObserver = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting && !plansInited) {
      plansInited = true;
      plansObserver.disconnect();
      renderApts(1, 0);
      selectApt(1, 0, true);
    }
  }, { rootMargin: '200px' });
  plansObserver.observe(plansSectionEl);
}

// ===== COURTYARD: мобильные табы =====
document.querySelectorAll('.courtyard__tab').forEach(tab => {
  tab.addEventListener('click', () => {
    const target = tab.dataset.ctab;
    document.querySelectorAll('.courtyard__tab').forEach(t =>
      t.classList.toggle('courtyard__tab--active', t === tab)
    );
    document.querySelectorAll('.courtyard__tab-panel').forEach(panel =>
      panel.classList.toggle('courtyard__tab-panel--active', panel.id === `cyard-tab-${target}`)
    );
  });
});

// ===== GREEN HALL: переключение зон =====
const ghTabs = document.querySelectorAll('.gh__tab');
const ghCards = document.querySelectorAll('.gh__card');
let isSwitching = false;

function switchZone(zone) {
  if (isSwitching) return;
  isSwitching = true;

  const activeCard = document.querySelector('.gh__card--active');

  ghTabs.forEach(tab => {
    tab.classList.toggle('gh__tab--active', tab.dataset.zone === zone);
  });

  if (activeCard) {
    gsap.to(activeCard, {
      opacity: 0,
      x: -30,
      duration: 0.15,
      ease: 'power2.in',
      onComplete: () => {
        activeCard.classList.remove('gh__card--active');
        activeCard.style.visibility = 'hidden';
        activeCard.style.position = 'absolute';
        activeCard.style.pointerEvents = 'none';

        const newCard = document.getElementById(`zone-${zone}`);
        newCard.style.visibility = 'visible';
        newCard.style.position = 'relative';
        newCard.style.pointerEvents = 'auto';

        gsap.fromTo(newCard,
          { opacity: 0, x: 40 },
          { opacity: 1, x: 0, duration: 0.35, ease: 'power2.out' }
        );
        newCard.classList.add('gh__card--active');

        setTimeout(() => { isSwitching = false; }, 350);
      }
    });
  } else {
    const newCard = document.getElementById(`zone-${zone}`);
    newCard.style.visibility = 'visible';
    newCard.style.position = 'relative';
    newCard.style.pointerEvents = 'auto';
    newCard.classList.add('gh__card--active');
    isSwitching = false;
  }
}

ghTabs.forEach(tab => {
  tab.addEventListener('click', () => {
    switchZone(tab.dataset.zone);
  });
});

// Автопереключение табов GREEN HALL
const ghTabsAuto = document.querySelectorAll('.gh__tab');
if (ghTabsAuto.length > 0) {
  let ghCurrentIndex = 0;
  let ghAutoplay = null;

  function ghSwitchToIndex(index) {
    ghCurrentIndex = index;
    ghTabsAuto.forEach(t => t.classList.remove('gh__tab--active'));
    ghTabsAuto[index].classList.add('gh__tab--active');
    // Триггерим существующую логику показа карточки
    ghTabsAuto[index].dispatchEvent(new Event('click', { bubbles: false }));
  }

  function ghStopAutoplay() {
    if (ghAutoplay) {
      clearInterval(ghAutoplay);
      ghAutoplay = null;
    }
  }

  function ghStartAutoplay() {
    ghStopAutoplay(); // всегда останавливаем перед запуском
    ghAutoplay = setInterval(() => {
      const nextIndex = (ghCurrentIndex + 1) % ghTabsAuto.length;
      ghSwitchToIndex(nextIndex);
    }, 2000);
  }

  // Ручной клик — останавливает, возобновляет через 5 сек
  ghTabsAuto.forEach((tab, i) => {
    tab.addEventListener('click', () => {
      ghCurrentIndex = i;
      ghStopAutoplay();
      setTimeout(ghStartAutoplay, 5000);
    });
  });

  ghStartAutoplay();
}

// ===== ГАЛЕРЕЯ =====
const galleryBase = 'prepared/sections/11_gallery/image';
const galleryImages = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,18,19,20,21,22,23,24,25,26];

function initGallery() {
  const track = document.getElementById('galleryTrack');
  const wrap = document.getElementById('galleryTrackWrap');

  // Строим карточки
  galleryImages.forEach(n => {
    const card = document.createElement('div');
    card.className = 'gallery__card';
    const img = document.createElement('img');
    img.loading = 'lazy';       // MUST be set before src
    img.decoding = 'async';
    img.alt = 'IVORY';
    img.dataset.n = n;
    img.src = `${galleryBase}/${n}.webp`;
    card.appendChild(img);
    card.addEventListener('click', () => openGalleryModal(n));
    track.appendChild(card);
  });

  // Клонируем для бесшовного loop
  track.querySelectorAll('.gallery__card').forEach(card => {
    track.appendChild(card.cloneNode(true));
  });
  // Клонированным карточкам тоже навешиваем клик
  track.querySelectorAll('.gallery__card').forEach(card => {
    card.onclick = () => openGalleryModal(parseInt(card.querySelector('img').dataset.n));
  });

  // Hover пауза (только десктоп)
  wrap.addEventListener('mouseenter', () => {
    track.style.animationPlayState = 'paused';
  });
  wrap.addEventListener('mouseleave', () => {
    track.style.animationPlayState = 'running';
  });
}

// Модалка галереи
let currentModalN = null;

function openGalleryModal(n) {
  currentModalN = n;
  const modal = document.getElementById('galleryModal');
  const modalImg = document.getElementById('galleryModalImg');
  const loader = document.getElementById('galleryModalLoader');

  modal.classList.add('open');
  document.body.style.overflow = 'hidden';

  loader.style.display = 'flex';
  modalImg.style.opacity = '0';

  const img = new Image();
  // WebP в 5-10x меньше JPG — используем для модалки
  img.src = `${galleryBase}/${n}.webp`;
  img.onload = () => {
    modalImg.src = img.src;
    loader.style.display = 'none';
    gsap.to(modalImg, { opacity: 1, duration: 0.3 });
  };
}

function navigateModal(dir) {
  const idx = galleryImages.indexOf(currentModalN);
  openGalleryModal(galleryImages[(idx + dir + galleryImages.length) % galleryImages.length]);
}

function closeGalleryModal() {
  document.getElementById('galleryModal').classList.remove('open');
  document.body.style.overflow = '';
}

document.getElementById('galleryModalClose').addEventListener('click', closeGalleryModal);
document.getElementById('galleryModalPrev').addEventListener('click', () => navigateModal(-1));
document.getElementById('galleryModalNext').addEventListener('click', () => navigateModal(1));
document.getElementById('galleryModal').addEventListener('click', (e) => {
  if (e.target === e.currentTarget) closeGalleryModal();
});

document.addEventListener('keydown', (e) => {
  if (!document.getElementById('galleryModal').classList.contains('open')) return;
  if (e.key === 'ArrowLeft') navigateModal(-1);
  if (e.key === 'ArrowRight') navigateModal(1);
  if (e.key === 'Escape') closeGalleryModal();
});

// Свайп влево/вправо для навигации в модалке (мобильные)
(function() {
  const modal = document.getElementById('galleryModal');
  let swipeStartX = 0;
  let swipeStartY = 0;
  modal.addEventListener('touchstart', (e) => {
    swipeStartX = e.changedTouches[0].clientX;
    swipeStartY = e.changedTouches[0].clientY;
  }, { passive: true });
  modal.addEventListener('touchend', (e) => {
    if (!modal.classList.contains('open')) return;
    const dx = e.changedTouches[0].clientX - swipeStartX;
    const dy = e.changedTouches[0].clientY - swipeStartY;
    // Горизонтальный свайп > 50px и не вертикальный
    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) {
      navigateModal(dx < 0 ? 1 : -1);
    }
  }, { passive: true });
})();

// Defer gallery init until user is near the section
const gallerySection = document.querySelector('.gallery');
if (gallerySection) {
  const galleryObserver = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      galleryObserver.disconnect();
      initGallery();
    }
  }, { rootMargin: '300px' });
  galleryObserver.observe(gallerySection);
}

// ===== ПЛАВНЫЙ СКРОЛЛ К ЯКОРЯМ =====
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', (e) => {
    const href = link.getAttribute('href');
    if (href !== '#') {
      e.preventDefault();
      document.querySelector(href).scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// ===== МОДАЛКА =====
const modalOverlay = document.getElementById('modalOverlay');

function openModalFn() {
  modalOverlay.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeModalFn() {
  modalOverlay.classList.remove('open');
  document.body.style.overflow = '';
  document.getElementById('modalSuccess').style.display = 'none';
  document.getElementById('modalSubmit').style.display = '';
  document.getElementById('modalSubmit').disabled = false;
  document.getElementById('modalSubmit').textContent = 'Отправить заявку';
  document.getElementById('modalName').value = '';
  document.getElementById('modalPhone').value = '';
}

document.getElementById('openModal').addEventListener('click', openModalFn);
document.getElementById('closeModal').addEventListener('click', closeModalFn);
document.getElementById('headerCta').addEventListener('click', (e) => {
  e.preventDefault();
  e.stopPropagation();
  openModalFn();
});
document.getElementById('mobileMenuCta').addEventListener('click', () => {
  burger.classList.remove('open');
  mobileMenu.classList.remove('open');
  document.body.style.overflow = '';
  openModalFn();
});

modalOverlay.addEventListener('click', (e) => {
  if (e.target === modalOverlay) closeModalFn();
});

document.getElementById('modalSubmit').addEventListener('click', async () => {
  const name = document.getElementById('modalName').value.trim();
  const phone = document.getElementById('modalPhone').value.trim();

  if (!name || !phone) {
    alert('Пожалуйста, заполните все поля');
    return;
  }

  const submitBtn = document.getElementById('modalSubmit');
  submitBtn.textContent = 'Отправка...';
  submitBtn.disabled = true;

  try {
    const BITRIX_URL = 'https://YOUR_DOMAIN.bitrix24.ru/rest/crm.lead.add.json';
    await fetch(BITRIX_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        fields: {
          TITLE: `Заявка с сайта IVORY — ${name}`,
          NAME: name,
          PHONE: [{ VALUE: phone, VALUE_TYPE: 'WORK' }],
          SOURCE_ID: 'WEB',
          SOURCE_DESCRIPTION: 'Лендинг IVORY',
        }
      })
    });
  } catch (err) {
    console.error('Bitrix error:', err);
  }

  document.getElementById('modalSuccess').style.display = 'block';
  submitBtn.style.display = 'none';
});

// ===== ФУТЕР: форма заявки =====
document.getElementById('footerSubmit').addEventListener('click', async () => {
  const name = document.getElementById('footerName').value.trim();
  const phone = document.getElementById('footerPhone').value.trim();

  if (!name || !phone) {
    alert('Пожалуйста, заполните все поля');
    return;
  }

  const btn = document.getElementById('footerSubmit');
  btn.textContent = 'Отправка...';
  btn.disabled = true;

  try {
    const BITRIX_URL = 'https://YOUR_DOMAIN.bitrix24.ru/rest/crm.lead.add.json';
    await fetch(BITRIX_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        fields: {
          TITLE: `Заявка с футера IVORY — ${name}`,
          NAME: name,
          PHONE: [{ VALUE: phone, VALUE_TYPE: 'WORK' }],
          SOURCE_ID: 'WEB',
          SOURCE_DESCRIPTION: 'Лендинг IVORY — футер',
        }
      })
    });
  } catch (err) {
    console.error(err);
  }

  document.getElementById('footerSuccess').style.display = 'block';
  document.getElementById('footerName').value = '';
  document.getElementById('footerPhone').value = '';
  btn.style.display = 'none';
});

// ===== Respect prefers-reduced-motion =====
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (prefersReducedMotion) {
  gsap.globalTimeline.pause();
}
