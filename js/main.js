// ===== Immediate mobile detection =====
let isMobile = window.innerWidth <= 768;

window.addEventListener('resize', () => {
  isMobile = window.innerWidth <= 768;
});

console.log('Initial isMobile:', isMobile, 'width:', window.innerWidth);

// If mobile, skip all JS animations and scripts
if (isMobile) {
  document.documentElement.classList.add('is-mobile');
}

// ===== GSAP + ScrollTrigger =====
gsap.registerPlugin(ScrollTrigger);

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
      trigger: '#gallery',
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
  gsap.from('.tech__mother-circle', {
    opacity: 0,
    x: isMobile ? 0 : -80,
    y: isMobile ? yBase : 0,
    duration: 1,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '.tech__mother',
      start: 'top 75%',
    },
  });

  gsap.from('.tech__mother-text', {
    opacity: 0,
    x: xR,
    y: isMobile ? yBase : 0,
    duration: 0.9,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '.tech__mother',
      start: 'top 75%',
    },
  });

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
    { size: '48 м²', rooms: '1-комнатная', img: `${plansBase}/plan-block1/22.jpg` },
    { size: '63 м²', rooms: '2-комнатная', img: `${plansBase}/plan-block1/23.jpg` },
    { size: '64 м²', rooms: '2-комнатная', img: `${plansBase}/plan-block1/24.jpg` },
    { size: '68 м²', rooms: '2-комнатная', img: `${plansBase}/plan-block1/25.jpg` },
    { size: '82 м²', rooms: '3-комнатная', img: `${plansBase}/plan-block1/26.jpg` },
    { size: '92 м²', rooms: '3-комнатная', img: `${plansBase}/plan-block1/27.jpg` },
  ],
  2: [
    { size: '48 м²', rooms: '1-комнатная', img: `${plansBase}/plan-block2/28.jpg` },
    { size: '49 м²', rooms: '1-комнатная', img: `${plansBase}/plan-block2/29.jpg` },
    { size: '58 м²', rooms: '2-комнатная', img: `${plansBase}/plan-block2/30.jpg` },
    { size: '80 м²', rooms: '3-комнатная', img: `${plansBase}/plan-block2/31.jpg` },
    { size: '89 м²', rooms: '3-комнатная', img: `${plansBase}/plan-block2/32.jpg` },
    { size: '98 м²', rooms: '3-комнатная', img: `${plansBase}/plan-block2/33.jpg` },
    { size: '108 м²', rooms: '4-комнатная', img: `${plansBase}/plan-block2/34.jpg` },
    { size: '120 м²', rooms: '4-комнатная', img: `${plansBase}/plan-block2/35.jpg` },
  ],
  3: [
    { size: '51 м²', rooms: '1-комнатная', img: `${plansBase}/plan-block3/36.jpg` },
    { size: '64 м²', rooms: '2-комнатная', img: `${plansBase}/plan-block3/37.jpg` },
    { size: '68 м²', rooms: '2-комнатная', img: `${plansBase}/plan-block3/38.jpg` },
    { size: '98 м²', rooms: '3-комнатная', img: `${plansBase}/plan-block3/39.jpg` },
    { size: '110 м²', rooms: '4-комнатная', img: `${plansBase}/plan-block3/40.jpg` },
  ],
};

const plansApts = document.getElementById('plansApts');
const plansDisplay = document.getElementById('plansDisplay');
const planImage = document.getElementById('planImage');
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

function selectApt(block, index) {
  const apt = plansData[block][index];
  
  document.querySelectorAll('.plans__apt-tab').forEach((b, i) =>
    b.classList.toggle('plans__apt-tab--active', i === index)
  );
  
  planImage.src = apt.img;
  planImage.alt = apt.size;
  planSize.textContent = apt.size;
  planRooms.textContent = apt.rooms;
  
  gsap.fromTo(plansDisplay, 
    { opacity: 0, y: 20, scale: 0.98 },
    { opacity: 1, y: 0, scale: 1, duration: 0.4, ease: 'power2.out' }
  );
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

// Preload всех картинок планировок при загрузке страницы
Object.values(plansData).flat().forEach(apt => {
  const img = new Image();
  img.src = apt.img;
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
        activeCard.style.display = 'none';

        const newCard = document.getElementById(`zone-${zone}`);
        newCard.style.display = 'grid';

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
    newCard.style.display = 'grid';
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
  gsap.globalTimeline.timeScale(0);
}
