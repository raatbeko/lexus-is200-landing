// ===== LENIS — плавный скролл =====
const lenis = new Lenis({
  duration: 1.4,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  smooth: true,
});

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

// ScrollTrigger знает про Lenis
lenis.on('scroll', ScrollTrigger.update);
gsap.ticker.lagSmoothing(0);

// ===== GSAP + ScrollTrigger =====
gsap.registerPlugin(ScrollTrigger);

// ===== ХЕДЕР: усиление при скролле =====
const header = document.getElementById('header');

lenis.on('scroll', (e) => {
  if (e.scroll > 60) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});

// ===== ГАМБУРГЕР МЕНЮ =====
const burger     = document.getElementById('burger');
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

// ===== HERO: анимация входа =====
gsap.timeline({ delay: 0.2 })
  // IVORY: fade in + scale 1.05 → 1, duration 1.5s
  .from('#heroTitle', {
    opacity: 0,
    scale: 1.05,
    duration: 1.5,
    ease: 'power2.out',
  })
  // "жилой комплекс": fade in снизу, delay 0.5s от старта
  .from('#heroSubtitle', {
    opacity: 0,
    y: 24,
    duration: 0.9,
    ease: 'power2.out',
  }, 0.5)
  // Слоган: fade in справа, delay 0.8s от старта
  .from('#heroSlogan', {
    opacity: 0,
    x: 40,
    duration: 0.9,
    ease: 'power2.out',
  }, 0.8)
  // Стрелка: fade in последней
  .from('#heroArrow', {
    opacity: 0,
    duration: 0.6,
    ease: 'power2.out',
  }, 1.1);

// Баунс стрелки — бесконечно
gsap.to('#heroArrow', {
  y: 10,
  duration: 1,
  ease: 'power1.inOut',
  yoyo: true,
  repeat: -1,
  delay: 1.8,
});

// Клик по стрелке → скролл к следующей секции
document.getElementById('heroArrow').addEventListener('click', () => {
  lenis.scrollTo('#about');
});

// ===== HERO: параллакс трёх слоёв =====
// Каждый слой движется с разной скоростью — создаёт глубину
const parallaxLayers = [
  { id: '#layerBg',  yPercent: -8  },  // фон — медленнее
  { id: '#layerTop', yPercent: -20 },  // здание — быстрее
];

parallaxLayers.forEach(({ id, yPercent }) => {
  gsap.to(id, {
    yPercent,
    ease: 'none',
    scrollTrigger: {
      trigger: '#hero',
      start: 'top top',
      end: 'bottom top',
      scrub: 1,
    },
  });
});

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

const plansApts    = document.getElementById('plansApts');
const plansDisplay = document.getElementById('plansDisplay');
const planImage    = document.getElementById('planImage');
const planSize     = document.getElementById('planSize');
const planRooms    = document.getElementById('planRooms');
const blockTabs    = document.querySelectorAll('.plans__block-tab');
let currentBlock   = 1;

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
    { opacity: 0, y: 15 },
    { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' }
  );
}

blockTabs.forEach(tab => {
  tab.addEventListener('click', () => {
    blockTabs.forEach(t => t.classList.remove('plans__block-tab--active'));
    tab.classList.add('plans__block-tab--active');
    currentBlock = +tab.dataset.block;
    renderApts(currentBlock, 0);
    selectApt(currentBlock, 0);
  });
});

// Инициализация — сразу показываем первую планировку
renderApts(1, 0);
selectApt(1, 0);

// ===== GREEN HALL: плавный скролл к якорю через Lenis =====
document.querySelectorAll('.gh__nav-item').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    lenis.scrollTo(link.getAttribute('href'), { offset: -80 });
  });
});

// ===== ДВОР: анимации =====
gsap.from('#courtyardText', {
  opacity: 0,
  x: -50,
  duration: 1,
  ease: 'power2.out',
  scrollTrigger: { trigger: '#courtyardText', start: 'top 80%' },
});

gsap.from('#cyard1', {
  opacity: 0,
  y: -40,
  duration: 1,
  ease: 'power2.out',
  scrollTrigger: { trigger: '#courtyardCircles', start: 'top 80%' },
});

gsap.from('#cyard2', {
  opacity: 0,
  y: 40,
  duration: 1,
  delay: 0.2,
  ease: 'power2.out',
  scrollTrigger: { trigger: '#courtyardCircles', start: 'top 80%' },
});

// ===== АРХИТЕКТУРА: анимация при появлении =====

gsap.from('#archText', {
  opacity: 0,
  x: -50,
  duration: 1,
  ease: 'power2.out',
  scrollTrigger: { trigger: '#archText', start: 'top 80%' },
});

gsap.from('#archBig', {
  opacity: 0,
  x: 80,
  duration: 1,
  ease: 'power2.out',
  scrollTrigger: { trigger: '#archBig', start: 'top 80%' },
});

gsap.from('#archSmall', {
  opacity: 0,
  y: 50,
  duration: 1,
  delay: 0.3,
  ease: 'power2.out',
  scrollTrigger: { trigger: '#archSmall', start: 'top 85%' },
});

// ===== ОКРУЖЕНИЕ: анимация при появлении =====

gsap.from('#surTitle', {
  opacity: 0,
  y: 40,
  duration: 0.9,
  ease: 'power2.out',
  scrollTrigger: { trigger: '#surTitle', start: 'top 80%' },
});

gsap.from('#surLeft', {
  opacity: 0,
  x: -50,
  duration: 1,
  ease: 'power2.out',
  scrollTrigger: { trigger: '#surLeft', start: 'top 80%' },
});

gsap.from('#surRight', {
  opacity: 0,
  x: 50,
  duration: 1,
  ease: 'power2.out',
  scrollTrigger: { trigger: '#surRight', start: 'top 80%' },
});

gsap.from('#surMap', {
  opacity: 0,
  y: 40,
  duration: 0.9,
  ease: 'power2.out',
  scrollTrigger: { trigger: '#surMap', start: 'top 85%' },
});

// ===== О ПРОЕКТЕ: анимация при появлении =====

// Заголовок fade in снизу
gsap.from('#aboutTitle', {
  opacity: 0,
  y: 40,
  duration: 0.9,
  ease: 'power2.out',
  scrollTrigger: { trigger: '#aboutTitle', start: 'top 80%' },
});

// Параграфы stagger 0.2s
gsap.from('#aboutP1, #aboutP2', {
  opacity: 0,
  y: 30,
  duration: 0.8,
  stagger: 0.2,
  ease: 'power2.out',
  scrollTrigger: { trigger: '#aboutP1', start: 'top 80%' },
});

// Фото scale 0.9 → 1
gsap.from('#aboutPhoto', {
  opacity: 0,
  scale: 0.9,
  duration: 1,
  ease: 'power2.out',
  scrollTrigger: { trigger: '#aboutPhoto', start: 'top 80%' },
});

// ===== ФАКТЫ: анимация при появлении =====

// Фото слева
gsap.from('#factsImage', {
  x: -60,
  opacity: 0,
  duration: 1,
  ease: 'power2.out',
  scrollTrigger: {
    trigger: '#factsImage',
    start: 'top 80%',
  },
});

// ScrollTrigger для countUp
ScrollTrigger.create({
  trigger: '.facts__content',
  start: 'top 75%',
  once: true,
  onEnter: () => {
    // Числа считаются через GSAP
    const num18 = { val: 0 };
    gsap.to(num18, {
      val: 18,
      duration: 1.4,
      ease: 'power2.out',
      onUpdate: () => {
        document.getElementById('num18').textContent = Math.round(num18.val);
      },
    });

    const num3 = { val: 0 };
    gsap.to(num3, {
      val: 3,
      duration: 1,
      ease: 'power2.out',
      delay: 0.3,
      onUpdate: () => {
        document.getElementById('num3').textContent = Math.round(num3.val);
      },
    });

    // Плавное появление блоков
    gsap.from('.facts__stat, .facts__divider', {
      opacity: 0,
      y: 30,
      duration: 0.8,
      stagger: 0.15,
      ease: 'power2.out',
    });
  },
});

// ===== ТЕХНИЧЕСКИЕ РЕШЕНИЯ: анимации =====
gsap.from('.tech__mother-circle', {
  opacity: 0,
  x: -60,
  duration: 1,
  ease: 'power2.out',
  scrollTrigger: { trigger: '.tech__mother', start: 'top 80%' },
});

gsap.from('.tech__mother-text', {
  opacity: 0,
  x: 40,
  duration: 1,
  ease: 'power2.out',
  scrollTrigger: { trigger: '.tech__mother', start: 'top 80%' },
});

gsap.from('.tech__title', {
  opacity: 0,
  y: 30,
  duration: 0.9,
  ease: 'power2.out',
  scrollTrigger: { trigger: '.tech__title', start: 'top 82%' },
});

gsap.from('.tech__image-wrap', {
  opacity: 0,
  y: 40,
  duration: 1,
  ease: 'power2.out',
  scrollTrigger: { trigger: '.tech__image-wrap', start: 'top 82%' },
});

// ===== BORSAN SERVICE: анимации =====
gsap.from('#borsanLeft', {
  opacity: 0,
  x: -50,
  duration: 1,
  ease: 'power2.out',
  scrollTrigger: { trigger: '#borsanLeft', start: 'top 80%' },
});

gsap.from('#borsanPhoto', {
  opacity: 0,
  x: 60,
  duration: 1,
  ease: 'power2.out',
  scrollTrigger: { trigger: '#borsanPhoto', start: 'top 80%' },
});
