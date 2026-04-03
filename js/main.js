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
  if (window.scrollY > 60) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
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
  // На мобильных x-анимации вызывают горизонтальный скролл — используем только y
  const xL = isMobile ? 0 : -60;
  const xR = isMobile ? 0 : 60;
  const xLg = isMobile ? 0 : 80;
  const xRg = isMobile ? 0 : 80;
  const xXl = isMobile ? 0 : 100;
  const yBase = isMobile ? 30 : 40;

  // О ПРОЕКТЕ: текст слева, фото справа
  gsap.from('#aboutTitle', {
    opacity: 0,
    x: xL,
    y: isMobile ? yBase : 0,
    duration: 0.8,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '#about-section',
      start: 'top 75%',
    },
  });

  gsap.from('#aboutP1, #aboutP2', {
    opacity: 0,
    x: isMobile ? 0 : -40,
    y: isMobile ? yBase : 0,
    duration: 0.8,
    stagger: 0.2,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '#aboutP1',
      start: 'top 80%',
    },
  });

  gsap.from('#aboutPhoto', {
    opacity: 0,
    x: xRg,
    y: isMobile ? yBase : 0,
    duration: 1,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '#about-section',
      start: 'top 70%',
    },
  });

  // ОКРУЖЕНИЕ: заголовок сверху
  gsap.from('#surTitle', {
    opacity: 0,
    y: yBase,
    duration: 0.8,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '#infrastructure',
      start: 'top 80%',
    },
  });

  // Фото слева
  gsap.from('#surLeft', {
    opacity: 0,
    x: isMobile ? 0 : -80,
    y: isMobile ? yBase : 0,
    duration: 1,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '#surLeft',
      start: 'top 75%',
    },
  });

  // Текст справа
  gsap.from('#surRight', {
    opacity: 0,
    x: xR,
    y: isMobile ? yBase : 0,
    duration: 0.9,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '#surRight',
      start: 'top 75%',
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
    },
  });

  // АРХИТЕКТУРА: текст слева, круги справа
  gsap.from('#archText', {
    opacity: 0,
    x: xL,
    y: isMobile ? yBase : 0,
    duration: 0.9,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '#architecture',
      start: 'top 75%',
    },
  });

  gsap.from('#archBig', {
    opacity: 0,
    x: xXl,
    y: isMobile ? yBase : 0,
    duration: 1,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '#archBig',
      start: 'top 80%',
    },
  });

  gsap.from('#archSmall', {
    opacity: 0,
    x: isMobile ? 0 : 60,
    y: isMobile ? yBase : 40,
    duration: 0.8,
    delay: 0.2,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '#archSmall',
      start: 'top 80%',
    },
  });

  // ДВОР: текст слева, фото справа
  gsap.from('#courtyardText', {
    opacity: 0,
    x: xL,
    y: isMobile ? yBase : 0,
    duration: 0.9,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '#courtyard',
      start: 'top 75%',
    },
  });

  gsap.from('#cyard1', {
    opacity: 0,
    x: xRg,
    y: isMobile ? yBase : 0,
    duration: 1,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '#courtyardCircles',
      start: 'top 80%',
    },
  });

  gsap.from('#cyard2', {
    opacity: 0,
    x: isMobile ? 0 : 50,
    y: isMobile ? yBase : 30,
    duration: 0.8,
    delay: 0.2,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '#courtyardCircles',
      start: 'top 80%',
    },
  });

  // ТЕХНИЧЕСКИЕ РЕШЕНИЯ
  gsap.from('.tech__title', {
    opacity: 0,
    y: yBase,
    duration: 0.8,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '.tech__main',
      start: 'top 80%',
    },
  });

  gsap.from('.tech__image-wrap', {
    opacity: 0,
    y: yBase,
    duration: 0.9,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '.tech__image-wrap',
      start: 'top 85%',
    },
  });

  // ПЛАНИРОВКИ
  gsap.from('.plans__header', {
    opacity: 0,
    y: yBase,
    duration: 0.8,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '#plans',
      start: 'top 80%',
    },
  });

  gsap.from('.plans__blocks', {
    opacity: 0,
    y: isMobile ? 20 : 30,
    duration: 0.7,
    delay: 0.1,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '.plans__blocks',
      start: 'top 85%',
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
    },
  });

  // BORSAN SERVICE
  gsap.from('#borsanLeft', {
    opacity: 0,
    x: isMobile ? 0 : -80,
    y: isMobile ? yBase : 0,
    duration: 1,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '#contacts',
      start: 'top 75%',
    },
  });

  gsap.from('#borsanPhoto', {
    opacity: 0,
    x: xRg,
    y: isMobile ? yBase : 0,
    duration: 1,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '#contacts',
      start: 'top 75%',
    },
  });
}

createSlideInAnimations();

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

// ===== ZOOM + PAN =====
let currentScale = 1;
const minScale = 0.5;
const maxScale = 3;
const zoomStep = 0.25;
const planImg = document.getElementById('planSvg');
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
  if (e.touches.length === 1 && currentScale > 1) {
    translateX = e.touches[0].clientX - lastTouchX;
    translateY = e.touches[0].clientY - lastTouchY;
    updateTransform();
  }
  if (e.touches.length === 2 && initialPinchDistance) {
    const currentDistance = Math.hypot(
      e.touches[0].clientX - e.touches[1].clientX,
      e.touches[0].clientY - e.touches[1].clientY
    );
    const ratio = currentDistance / initialPinchDistance;
    currentScale = Math.min(maxScale, Math.max(minScale, currentScale * ratio));
    initialPinchDistance = currentDistance;
    updateTransform();
  }
  e.preventDefault();
}, { passive: false });

planImg.addEventListener('touchend', () => {
  initialPinchDistance = null;
});

function selectApt(block, index) {
  currentScale = 1;
  translateX = 0;
  translateY = 0;
  updateTransform();
  planImg.style.cursor = 'default';

  const apt = plansData[block][index];

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

  planSize.textContent = apt.size;
  planRooms.textContent = apt.rooms;
  document.getElementById('planDesc').textContent = apt.desc;

  document.querySelectorAll('.plans__apt-tab').forEach((b, i) =>
    b.classList.toggle('plans__apt-tab--active', i === index)
  );

  if (isMobile) {
    setTimeout(() => {
      document.getElementById('planPlanCard')
        .scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 300);
  }
}

blockTabs.forEach(tab => {
  tab.addEventListener('click', () => {
    blockTabs.forEach(t => t.classList.remove('plans__block-tab--active'));
    tab.classList.add('plans__block-tab--active');
    const block = +tab.dataset.block;
    renderApts(block, 0);
    selectApt(block, 0);
  });
});

renderApts(1, 0);
selectApt(1, 0);

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

// ===== ГАЛЕРЕЯ: анимация карточек =====
gsap.from('.gallery__card', {
  opacity: 0,
  y: 50,
  duration: 0.8,
  stagger: 0.15,
  ease: 'power3.out',
  scrollTrigger: {
    trigger: '.gallery__grid',
    start: 'top 80%',
  },
});

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

// ===== Respect prefers-reduced-motion =====
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (prefersReducedMotion) {
  gsap.globalTimeline.pause();
}
