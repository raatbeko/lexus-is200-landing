// ===== КОНФИГУРАЦИЯ =====
const TOTAL_FRAMES = 122;
const FRAME_PATH   = 'prepared/canvas/frames/';
const IS_MOBILE    = window.innerWidth <= 480;

// ===== CANVAS =====
const canvas  = document.getElementById('canvas');
const ctx     = canvas.getContext('2d');
const wrapper = document.getElementById('canvas-wrapper');

// ===== КАДРЫ (до resizeCanvas — иначе TDZ) =====
const frames = [];
let currentFrame = 0;

function resizeCanvas() {
  if (window.innerWidth < 768) {
    // Мобильный: canvas 16:9, wrapper центрирует на светлом фоне
    canvas.width  = window.innerWidth;
    canvas.height = Math.round(window.innerWidth * 9 / 16);
  } else {
    // Десктоп: canvas fullscreen
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  if (frames.length) drawFrame(currentFrame);
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

function padNum(n) {
  return String(n).padStart(4, '0');
}

function drawFrame(idx) {
  idx = Math.max(0, Math.min(idx, frames.length - 1));
  currentFrame = idx;
  const f = frames[idx];
  if (!f || !f.complete || !f.naturalWidth) return;

  const cw = canvas.width, ch = canvas.height;
  const fw = f.naturalWidth, fh = f.naturalHeight;
  const scale = Math.max(cw / fw, ch / fh);
  const sw = fw * scale, sh = fh * scale;

  ctx.clearRect(0, 0, cw, ch);
  ctx.drawImage(f, (cw - sw) / 2, (ch - sh) / 2, sw, sh);
}

// ===== ЗАГРУЗКА КАДРОВ =====
function loadFrames() {
  return new Promise((resolve) => {
    // На мобильных — каждый второй кадр
    const indices = IS_MOBILE
      ? Array.from({ length: Math.ceil(TOTAL_FRAMES / 2) }, (_, i) => i * 2 + 1)
      : Array.from({ length: TOTAL_FRAMES }, (_, i) => i + 1);

    const total = indices.length;
    let loaded  = 0;

    const fill    = document.getElementById('preloader-fill');
    const percent = document.getElementById('preloader-percent');

    indices.forEach((num, i) => {
      const img = new Image();

      img.onload = img.onerror = () => {
        if (img.naturalWidth) frames[i] = img;
        loaded++;
        const pct = Math.round((loaded / total) * 100);
        fill.style.width    = pct + '%';
        percent.textContent = pct + '%';
        if (loaded === total) resolve();
      };

      img.src = FRAME_PATH + 'frame_' + padNum(num) + '.jpg';
    });
  });
}

// ===== СТАРТ =====
loadFrames().then(() => {
  gsap.registerPlugin(ScrollTrigger);

  // Скрыть прелоадер
  gsap.to('#preloader', {
    opacity: 0,
    duration: 0.7,
    ease: 'power1.inOut',
    onComplete() {
      document.getElementById('preloader').style.display = 'none';
    }
  });

  drawFrame(0);
  initScroll();
});

// ===== СКРОЛЛ И АНИМАЦИИ =====
function initScroll() {
  // Lenis — плавный скролл
  const lenis = new Lenis({
    duration: 1.4,
    easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  });
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add(time => lenis.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);

  // DOM
  const header      = document.getElementById('header');
  const headerBtn   = document.getElementById('header-btn');
  const darkOverlay = document.getElementById('dark-overlay');
  const footer      = document.getElementById('footer');
  const contactWrap = document.getElementById('contact-wrap');
  const contactForm = document.getElementById('contact-form');
  const contactSuc  = document.getElementById('contact-success');

  const textIntro  = document.getElementById('text-intro');
  const textEngine = document.getElementById('text-engine');
  const textRwd    = document.getElementById('text-rwd');
  const textJapan  = document.getElementById('text-japan');
  const textSpeed  = document.getElementById('text-speed');
  const textBorn   = document.getElementById('text-born');

  const speedCounter  = document.getElementById('speed-counter');
  const staggerSpans  = document.querySelectorAll('#text-born .text-stagger span');

  // Состояние — чтобы не запускать одну анимацию несколько раз
  const S = {
    headerBg:    false,
    btnHidden:   false,
    intro:       null,
    engine:      null,
    rwd:         null,
    japan:       null,
    speed:       null,
    born:        null,
    contact:     null,
    countUpDone: false,
    staggerDone: false,
  };

  // ===== Хелперы показа/скрытия =====
  function show(el, from, to) {
    gsap.fromTo(el, { opacity: 0, ...from }, { opacity: 1, ...to, duration: 0.55, ease: 'power2.out' });
  }
  function hide(el, to) {
    gsap.to(el, { opacity: 0, ...to, duration: 0.4, ease: 'power2.in' });
  }

  // ===== Главный ScrollTrigger =====
  ScrollTrigger.create({
    trigger: document.body,
    start: 'top top',
    end:   'bottom bottom',
    onUpdate(self) {
      const p = self.progress;

      // Кадр canvas
      drawFrame(Math.floor(p * (frames.length - 1)));

      // --- Header фон ---
      if (p > 0.10 && !S.headerBg) {
        S.headerBg = true;
        header.classList.add('header--scrolled');
      } else if (p <= 0.10 && S.headerBg) {
        S.headerBg = false;
        header.classList.remove('header--scrolled');
      }

      // --- Кнопка КУПИТЬ ---
      if (p >= 0.90 && !S.btnHidden) {
        S.btnHidden = true;
        gsap.to(headerBtn, { opacity: 0, duration: 0.3,
          onComplete: () => { headerBtn.style.pointerEvents = 'none'; } });
      } else if (p < 0.90 && S.btnHidden) {
        S.btnHidden = false;
        headerBtn.style.pointerEvents = 'auto';
        gsap.to(headerBtn, { opacity: 1, duration: 0.3 });
      }

      // --- ТЕКСТ: LEXUS IS 200 | 0–15% ---
      if (p >= 0.02 && p < 0.15 && S.intro !== true) {
        S.intro = true;
        show(textIntro.querySelector('.text-inner'), { y: 24 }, { y: 0 });
        gsap.set(textIntro, { opacity: 1 });
      } else if ((p < 0.02 || p >= 0.15) && S.intro !== false) {
        S.intro = false;
        hide(textIntro, { y: -18 });
      }

      // --- ТЕКСТ: 3.0L INLINE-6 | 15–30% ---
      if (p >= 0.17 && p < 0.30 && S.engine !== true) {
        S.engine = true;
        gsap.set(textEngine, { opacity: 1 });
        show(textEngine.querySelector('.text-inner'), { x: -60 }, { x: 0 });
      } else if ((p < 0.17 || p >= 0.30) && S.engine !== false) {
        S.engine = false;
        hide(textEngine, { x: 50 });
      }

      // --- ТЕКСТ: ЗАДНИЙ ПРИВОД | 30–45% ---
      if (p >= 0.32 && p < 0.45 && S.rwd !== true) {
        S.rwd = true;
        gsap.set(textRwd, { opacity: 1 });
        show(textRwd.querySelector('.text-inner'), { x: 60 }, { x: 0 });
      } else if ((p < 0.32 || p >= 0.45) && S.rwd !== false) {
        S.rwd = false;
        hide(textRwd, { x: -50 });
      }

      // --- ТЕКСТ: ЯПОНСКАЯ ТОЧНОСТЬ | 45–60% ---
      if (p >= 0.47 && p < 0.60 && S.japan !== true) {
        S.japan = true;
        gsap.set(textJapan, { opacity: 1 });
        show(textJapan.querySelector('.text-inner'), { scale: 0.9 }, { scale: 1 });
      } else if ((p < 0.47 || p >= 0.60) && S.japan !== false) {
        S.japan = false;
        hide(textJapan, { scale: 0.95 });
      }

      // --- ТЕКСТ: 8.3 СЕК | 60–75% ---
      if (p >= 0.62 && p < 0.75 && S.speed !== true) {
        S.speed = true;
        gsap.set(textSpeed, { opacity: 1 });
        show(textSpeed.querySelector('.text-inner'), { y: 20 }, { y: 0 });

        // CountUp — запускается один раз
        if (!S.countUpDone) {
          S.countUpDone = true;
          const obj = { val: 0 };
          gsap.to(obj, {
            val: 8.3,
            duration: 1.6,
            ease: 'power2.out',
            onUpdate() { speedCounter.textContent = obj.val.toFixed(1); }
          });
        }
      } else if ((p < 0.62 || p >= 0.75) && S.speed !== false) {
        S.speed = false;
        hide(textSpeed, { y: -18 });
      }

      // --- ТЕКСТ: РОЖДЁН ДЛЯ ДОРОГИ | 75–90% ---
      if (p >= 0.77 && p < 0.90 && S.born !== true) {
        S.born = true;
        gsap.set(textBorn, { opacity: 1 });

        // Стаггер по словам — один раз
        if (!S.staggerDone) {
          S.staggerDone = true;
          gsap.to(staggerSpans, {
            opacity: 1,
            y: 0,
            duration: 0.65,
            stagger: 0.22,
            ease: 'power2.out',
          });
        }
      } else if ((p < 0.77 || p >= 0.90) && S.born !== false) {
        S.born = false;
        hide(textBorn, {});
        // Сброс слов при скролле назад
        if (p < 0.77) {
          S.staggerDone = false;
          gsap.set(staggerSpans, { opacity: 0, y: 32 });
        }
      }

      // --- ФОРМА + осветление | 90–100% ---
      if (p >= 0.90 && S.contact !== true) {
        S.contact = true;
        gsap.to(darkOverlay, { opacity: 0.94, duration: 0.7 });
        gsap.to(contactWrap, { opacity: 1, duration: 0.6 });
        contactWrap.style.pointerEvents = 'auto';
        gsap.to(footer, { opacity: 1, duration: 0.6 });
        footer.style.pointerEvents = 'auto';
      } else if (p < 0.90 && S.contact !== false) {
        S.contact = false;
        gsap.to(darkOverlay, { opacity: 0, duration: 0.6 });
        gsap.to(contactWrap, { opacity: 0, duration: 0.4 });
        contactWrap.style.pointerEvents = 'none';
        gsap.to(footer, { opacity: 0, duration: 0.4 });
        footer.style.pointerEvents = 'none';
      }
    }
  });

  // ===== Форма: отправка =====
  contactForm.addEventListener('submit', e => {
    e.preventDefault();
    gsap.to(contactForm, {
      opacity: 0,
      y: -16,
      duration: 0.4,
      onComplete() {
        contactForm.style.display = 'none';
        contactSuc.style.display  = 'block';
        gsap.from(contactSuc, { opacity: 0, y: 20, duration: 0.6 });
      }
    });
  });
}
