/* =========================
   ❄️ PREMIUM SNOW EFFECT — STABLE VERSION
   ========================= */

const snowCanvas = document.getElementById("snow");
const ctx = snowCanvas.getContext("2d");
const toggleBtn = document.getElementById("snow-toggle");

let width, height;
let snowflakes = [];
let snowEnabled = true;

function resizeSnow() {
    width = snowCanvas.width = window.innerWidth;
    height = snowCanvas.height = window.innerHeight;
}
window.addEventListener("resize", resizeSnow);
resizeSnow();

/* ❄️ Настройки */
const SNOW_COUNT = 140;

function createSnowflake() {
    const depth = Math.random();
    return {
        x: Math.random() * width,
        y: Math.random() * height,
        r: 1 + depth * 3,
        speed: 0.4 + depth * 1.4,
        sway: 0.3 + depth,
        alpha: 0.4 + Math.random() * 0.6,
        twinkle: Math.random() * 0.02,
        depth
    };
}

function initSnow() {
    snowflakes = [];
    for (let i = 0; i < SNOW_COUNT; i++) {
        snowflakes.push(createSnowflake());
    }
}

initSnow();

let angle = 0;

function drawSnow() {
    ctx.clearRect(0, 0, width, height);

    if (snowEnabled) {
        angle += 0.01;

        snowflakes.forEach(f => {
            // ✨ мерцание
            f.alpha += Math.sin(angle) * f.twinkle;
            f.alpha = Math.max(0.2, Math.min(1, f.alpha));

            ctx.fillStyle = `rgba(255,255,255,${f.alpha})`;
            ctx.beginPath();
            ctx.arc(f.x, f.y, f.r, 0, Math.PI * 2);
            ctx.fill();

            // движение
            f.y += f.speed;
            f.x += Math.sin(angle) * f.sway * f.depth;

            if (f.y > height) {
                f.y = -5;
                f.x = Math.random() * width;
            }
        });
    }

    requestAnimationFrame(drawSnow);
}

/* ▶️ старт анимации (ВСЕГДА) */
drawSnow();

/* ❄️ Toggle кнопка */
toggleBtn.addEventListener("click", () => {
    snowEnabled = !snowEnabled;
    toggleBtn.textContent = snowEnabled ? "❄️" : "☀️";
});
// =========================
// 🧲 PARALLAX EFFECT
// =========================

const parallaxItems = document.querySelectorAll('.price-card, .card');

parallaxItems.forEach(card => {
    card.addEventListener('mousemove', e => {
        const rect = card.getBoundingClientRect();

        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = -(y - centerY) / 18;
        const rotateY = (x - centerX) / 18;

        card.style.transform = `
            perspective(800px)
            rotateX(${rotateX}deg)
            rotateY(${rotateY}deg)
            translateY(-6px)
        `;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = `
            perspective(800px)
            rotateX(0deg)
            rotateY(0deg)
            translateY(0)
        `;
    });
});
// =========================
// ✨ HOVER LIGHT FOLLOW
// =========================

document.querySelectorAll('.price-card').forEach(card => {
    card.addEventListener('mousemove', e => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        card.style.setProperty('--x', `${x}px`);
        card.style.setProperty('--y', `${y}px`);
    });
});
// =========================
// 🧲 MAGNETIC BUTTONS (SAFE)
// =========================

document.querySelectorAll('.btn').forEach(btn => {
    const inner = btn.querySelector('.btn-inner');

    btn.addEventListener('mousemove', e => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        inner.style.transform = `
            translate(${x * 0.35}px, ${y * 0.35}px)
        `;
    });

    btn.addEventListener('mouseleave', () => {
        inner.style.transform = 'translate(0, 0)';
    });

    btn.addEventListener('mousedown', () => {
        inner.style.transform += ' scale(0.92)';
    });

    btn.addEventListener('mouseup', () => {
        inner.style.transform = 'translate(0, 0)';
    });
});
// =========================
// 🌟 FEATURED AUTO FOCUS
// =========================

const featured = document.querySelector('.price-card.featured');
let autoFocusTimer;

function triggerAutoFocus() {
    featured.classList.add('auto-focus');

    setTimeout(() => {
        featured.classList.remove('auto-focus');
    }, 1500);
}

autoFocusTimer = setInterval(triggerAutoFocus, 8000);

// если пользователь взаимодействует — сбрасываем
['mousemove', 'scroll', 'click'].forEach(event => {
    window.addEventListener(event, () => {
        clearInterval(autoFocusTimer);
        autoFocusTimer = setInterval(triggerAutoFocus, 8000);
    });
});

const btn = document.getElementById('sound-toggle');
const audio = document.getElementById('ambient-sound');

btn.onclick = () => {
  audio.play();
  console.log('PLAY CLICK');
};
document.addEventListener("DOMContentLoaded", () => {

    const soundBtn = document.getElementById("sound-toggle");
    const audio = document.getElementById("bg-music");

    // ❌ если чего-то нет — сразу выходим (и без ошибок)
    if (!soundBtn || !audio) {
        console.error("Sound button or audio not found");
        return;
    }

    let isPlaying = false;

    // 🔇 стартовое состояние
    audio.volume = 0.4;

    soundBtn.addEventListener("click", async () => {
        try {
            if (!isPlaying) {
                await audio.play(); // 🔑 обязательно через user gesture
                soundBtn.textContent = "🔊";
                isPlaying = true;
            } else {
                audio.pause();
                soundBtn.textContent = "🔇";
                isPlaying = false;
            }
        } catch (err) {
            console.error("Audio play failed:", err);
        }
    });

});
document.addEventListener("DOMContentLoaded", () => {
    const music = document.getElementById("bg-music");
    const toggle = document.getElementById("sound-toggle");

    if (!music || !toggle) {
        console.error("❌ Music or toggle button not found");
        return;
    }

    let isPlaying = false;
    const FADE_TIME = 600;
    const STEP = 0.05;
    let fadeInterval = null;

    /* =========================
       🔊 FADE FUNCTIONS
       ========================= */

    function fadeIn() {
        clearInterval(fadeInterval);
        music.volume = 0;
        music.play();

        fadeInterval = setInterval(() => {
            if (music.volume < 1) {
                music.volume = Math.min(1, music.volume + STEP);
            } else {
                clearInterval(fadeInterval);
            }
        }, FADE_TIME * STEP);
    }

    function fadeOut() {
        clearInterval(fadeInterval);

        fadeInterval = setInterval(() => {
            if (music.volume > STEP) {
                music.volume -= STEP;
            } else {
                music.volume = 0;
                music.pause();
                clearInterval(fadeInterval);
            }
        }, FADE_TIME * STEP);
    }

    /* =========================
       🔘 TOGGLE MUSIC
       ========================= */

    function updateButton() {
        toggle.textContent = isPlaying ? "🔊" : "🔇";
        toggle.classList.toggle("active", isPlaying);
    }

    toggle.addEventListener("click", () => {
        isPlaying = !isPlaying;
        localStorage.setItem("musicEnabled", isPlaying);

        if (isPlaying) {
            fadeIn();
        } else {
            fadeOut();
        }

        updateButton();
    });

    /* =========================
       💾 RESTORE STATE
       ========================= */

    const savedState = localStorage.getItem("musicEnabled");
    if (savedState === "true") {
        isPlaying = true;
        updateButton();
        // запуск только после первого клика
        document.addEventListener(
            "click",
            () => fadeIn(),
            { once: true }
        );
    }

    /* =========================
       👀 TAB VISIBILITY
       ========================= */

    document.addEventListener("visibilitychange", () => {
        if (document.hidden && isPlaying) {
            music.pause();
        } else if (!document.hidden && isPlaying) {
            music.play();
        }
    });
});
const volumeSlider = document.getElementById("volume-slider");

volumeSlider.value = music.volume;

volumeSlider.addEventListener("input", () => {
    music.volume = volumeSlider.value;
    localStorage.setItem("musicVolume", volumeSlider.value);
});

// восстановление громкости
const savedVolume = localStorage.getItem("musicVolume");
if (savedVolume !== null) {
    music.volume = savedVolume;
    volumeSlider.value = savedVolume;
}
window.addEventListener("mousemove", e => {
  const x = (e.clientX / window.innerWidth - 0.5) * 20;
  const y = (e.clientY / window.innerHeight - 0.5) * 20;

  document.body.style.backgroundPosition = `${50 + x}% ${50 + y}%`;
});
document.addEventListener("visibilitychange", () => {
  if (document.hidden) audio.pause();
});
// === AUTO UI SCALE BASED ON SCREEN ===
function updateUIScale() {
    const width = window.innerWidth;

    let scale = 1;

    if (width >= 1920) scale = 1.2;
    if (width >= 2560) scale = 1.35;
    if (width >= 3200) scale = 1.5;

    document.documentElement.style.setProperty('--ui-scale', scale);
}

updateUIScale();
window.addEventListener('resize', updateUIScale);
const hero = document.querySelector('.hero');
const heroInner = document.querySelector('.hero-inner');

window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    const heroHeight = hero.offsetHeight;

    // прогресс 0 → 1
    const progress = Math.min(scrollY / heroHeight, 1);

    // SCALE
    const scale = 1 - progress * 0.12;

    // FADE
    const opacity = 1 - progress * 0.85;

    // MOVE UP
    const translateY = progress * -120;

    heroInner.style.transform = `
        translateY(${translateY}px)
        scale(${scale})
    `;
    heroInner.style.opacity = opacity;
});
const blur = progress * 4;
heroInner.style.filter = `blur(${blur}px)`;
