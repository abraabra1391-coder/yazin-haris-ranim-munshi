// Wedding site data & state
const weddingConfig = {
  groom: {
    name: "Yazin",
    fullName: "Yazin Haris Thangal",
    father: "Mr. Haris Jasin Thangal",
    mother: "Mrs. Shahana Haris",
    residence: "Raihan, Ziyarat Nagar-81, Mangad P.O, Kollam",
    grandparents: "Grandson of Mr. Sayyid Jasin Thangal & Mrs. Fathima J Thangal and Mr. Sulaiman Kunju & Mrs. Raheena Beevi"
  },
  bride: {
    name: "Ranim",
    fullName: "Ranim Munshi",
    father: "Mr. Mohamed Irfan Munshi",
    mother: "Mrs. Maria Irfan",
    residence: "RCHS, Raheja Complex, Versova, Mumbai"
  },
  compliments: "With Love, Raihan Family",
  date: "2026-12-21T00:00:00+05:30",
  dateLabel: "21 • DECEMBER • 2026",
  timeLabel: "Arrive by – 5:00 PM",
  venue: {
    name: "Vismaya Convention Center",
    address: "Kollam - Elampalloor Rd, Kundara",
    city: "Kollam, Kerala 691501",
    maps: "https://maps.google.com/?q=Vismaya+Convention+Centre+Kundara+Kollam"
  }
};

document.addEventListener("DOMContentLoaded", () => {
  initAudio();
  initPetals(12);
  initHeaderScroll();
  initMobileMenu();
  initInvitationUnlock();
  initCountdown();
  initScrollReveals();
  initRSVPForm();
  initScratchCard();
});

/* ================= Audio Player ================= */
function initAudio() {
  const audio = document.getElementById("weddingAudio");
  const musicToggle = document.getElementById("musicToggle");
  if (!audio) return;

  audio.volume = 0.3;

  function attemptPlay() {
    audio.play().then(() => {
      if (musicToggle) {
        musicToggle.classList.remove("paused");
        musicToggle.classList.add("playing");
        const statusText = musicToggle.querySelector(".music-status");
        if (statusText) statusText.textContent = "Music On";
      }
      removeListeners();
    }).catch(() => {
      // Autoplay blocked until gesture
    });
  }

  function onUserGesture() {
    attemptPlay();
  }

  function removeListeners() {
    window.removeEventListener("pointerdown", onUserGesture);
    window.removeEventListener("touchstart", onUserGesture);
    window.removeEventListener("keydown", onUserGesture);
  }

  window.addEventListener("pointerdown", onUserGesture);
  window.addEventListener("touchstart", onUserGesture);
  window.addEventListener("keydown", onUserGesture);

  // Attempt initial play
  attemptPlay();

  if (musicToggle) {
    musicToggle.addEventListener("click", (e) => {
      e.stopPropagation();
      removeListeners();
      if (audio.paused) {
        audio.play().then(() => {
          musicToggle.classList.remove("paused");
          musicToggle.classList.add("playing");
          const statusText = musicToggle.querySelector(".music-status");
          if (statusText) statusText.textContent = "Music On";
        });
      } else {
        audio.pause();
        musicToggle.classList.remove("playing");
        musicToggle.classList.add("paused");
        const statusText = musicToggle.querySelector(".music-status");
        if (statusText) statusText.textContent = "Music Off";
      }
    });
  }
}

/* ================= Petals Animation ================= */
function initPetals() {
  const container = document.getElementById("petalContainer");
  if (!container) return;

  // Lightweight count on phones to keep 60/120fps smooth scrolling
  const isMobile = window.innerWidth < 768;
  const count = isMobile ? 6 : 10;

  for (let i = 0; i < count; i++) {
    const petal = document.createElement("span");
    petal.className = "petal";
    const left = Math.random() * 100;
    const size = 8 + Math.random() * 8;
    const duration = 12 + Math.random() * 10;
    const delay = -(Math.random() * 16);
    const drift = `${(Math.random() - 0.5) * 120}px`;
    const opacity = 0.25 + Math.random() * 0.35;

    petal.style.left = `${left}%`;
    petal.style.width = `${size}px`;
    petal.style.height = `${size}px`;
    petal.style.animationDuration = `${duration}s`;
    petal.style.animationDelay = `${delay}s`;
    petal.style.setProperty("--petal-drift", drift);
    petal.style.setProperty("--petal-opacity", opacity);

    container.appendChild(petal);
  }
}

/* ================= Header on Scroll ================= */
function initHeaderScroll() {
  const header = document.getElementById("mainHeader");
  if (!header) return;

  let ticking = false;
  let isScrolled = false;

  function update() {
    const shouldBeScrolled = window.scrollY > 40;
    if (shouldBeScrolled !== isScrolled) {
      isScrolled = shouldBeScrolled;
      if (isScrolled) {
        header.classList.add("border-gold/20", "bg-ivory/85", "backdrop-blur-md");
        header.classList.remove("border-transparent");
      } else {
        header.classList.remove("border-gold/20", "bg-ivory/85", "backdrop-blur-md");
        header.classList.add("border-transparent");
      }
    }
    ticking = false;
  }

  update();
  window.addEventListener("scroll", () => {
    if (!ticking) {
      window.requestAnimationFrame(update);
      ticking = true;
    }
  }, { passive: true });
}

/* ================= Mobile Menu ================= */
function initMobileMenu() {
  const openBtn = document.getElementById("openMenuBtn");
  const closeBtn = document.getElementById("closeMenuBtn");
  const menu = document.getElementById("mobileMenu");
  const menuLinks = menu ? menu.querySelectorAll("a") : [];

  function openMenu() {
    if (!menu) return;
    menu.classList.remove("pointer-events-none", "opacity-0");
    menu.classList.add("pointer-events-auto", "opacity-100");
    document.body.style.overflow = "hidden";
    if (openBtn) openBtn.setAttribute("aria-expanded", "true");
  }

  function closeMenu() {
    if (!menu) return;
    menu.classList.remove("pointer-events-auto", "opacity-100");
    menu.classList.add("pointer-events-none", "opacity-0");
    document.body.style.overflow = "";
    if (openBtn) openBtn.setAttribute("aria-expanded", "false");
  }

  if (openBtn) openBtn.addEventListener("click", openMenu);
  if (closeBtn) closeBtn.addEventListener("click", closeMenu);

  menuLinks.forEach((link) => {
    link.addEventListener("click", () => {
      closeMenu();
      unlockInvitation();
    });
  });
}

/* ================= Invitation Unveil ================= */
let isUnlocked = false;

function unlockInvitation() {
  if (isUnlocked) return;
  isUnlocked = true;
  const sections = document.getElementById("invitationSections");
  if (sections) {
    sections.classList.remove("hidden");
  }
  // Re-observe newly visible reveal items
  initScrollReveals();
  setTimeout(() => {
    initScratchCard();
  }, 100);

  const audio = document.getElementById("weddingAudio");
  if (audio && audio.paused) {
    audio.play().catch(() => {});
  }
}

function initInvitationUnlock() {
  const btn = document.getElementById("openInvitationBtn");
  if (btn) {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      unlockInvitation();
      const target = document.getElementById("invitation");
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  }

  // Also check if any nav link is clicked or URL has hash
  const navLinks = document.querySelectorAll('a[href^="#"]');
  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      const href = link.getAttribute("href");
      if (href && href !== "#home") {
        unlockInvitation();
      }
    });
  });

  if (window.location.hash && window.location.hash !== "#home") {
    unlockInvitation();
  }
}

/* ================= Countdown Timer ================= */
function initCountdown() {
  // Target date: 21st December 2026 (00:00:00 IST)
  // Date.UTC(2026, 11, 20, 18, 30, 0) == 2026-12-21 00:00:00 IST
  const targetDate = Date.UTC(2026, 11, 20, 18, 30, 0);

  function calc() {
    const diff = Math.max(0, targetDate - Date.now());
    const totalSeconds = Math.floor(diff / 1000);
    const days = Math.floor(totalSeconds / 86400);
    const hours = Math.floor((totalSeconds % 86400) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return { days, hours, minutes, seconds };
  }

  function update() {
    const c = calc();
    const dEl = document.getElementById("cd-days");
    const hEl = document.getElementById("cd-hours");
    const mEl = document.getElementById("cd-minutes");
    const sEl = document.getElementById("cd-seconds");

    if (dEl) dEl.textContent = String(c.days).padStart(2, "0");
    if (hEl) hEl.textContent = String(c.hours).padStart(2, "0");
    if (mEl) mEl.textContent = String(c.minutes).padStart(2, "0");
    if (sEl) sEl.textContent = String(c.seconds).padStart(2, "0");
  }

  update();
  setInterval(update, 1000);
}

/* ================= Scroll Reveals ================= */
let observer;

function initScrollReveals() {
  if (observer) {
    observer.disconnect();
  }

  const reveals = document.querySelectorAll(".reveal:not(.is-visible)");
  if (!("IntersectionObserver" in window)) {
    reveals.forEach((el) => el.classList.add("is-visible"));
    return;
  }

  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.15,
      rootMargin: "0px 0px -8% 0px"
    }
  );

  reveals.forEach((el) => observer.observe(el));
}

// Google Sheets Web App Endpoint (for Spreadsheet: Yazin&ranim weddding)
const GOOGLE_SHEET_URL = "YOUR_GOOGLE_APPS_SCRIPT_URL_HERE";

/* ================= RSVP Form Handler (Direct to Google Sheets) ================= */
function initRSVPForm() {
  const form = document.getElementById("rsvpForm");
  const submitBtn = document.getElementById("rsvpSubmitBtn") || form?.querySelector('button[type="submit"]');
  const btnText = document.getElementById("rsvpBtnText");
  const successEl = document.getElementById("rsvpSuccess");
  const errorEl = document.getElementById("rsvpError");
  if (!form) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = document.getElementById("rsvpName")?.value.trim() || "";
    const attendance = form.querySelector('input[name="attendance"]:checked')?.value || "Joyfully Accepts";
    const guests = document.getElementById("rsvpGuests")?.value || "2 People";
    const message = document.getElementById("rsvpMessage")?.value.trim() || "";

    // Show loading spinner
    if (submitBtn) submitBtn.disabled = true;
    if (btnText) {
      btnText.innerHTML = `
        <svg class="animate-spin h-4 w-4 text-ivory" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        Saving to Guest List...
      `;
    }
    if (successEl) successEl.classList.add("hidden");
    if (errorEl) errorEl.classList.add("hidden");

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("attendance", attendance);
      formData.append("guests", guests);
      formData.append("message", message);

      if (GOOGLE_SHEET_URL && GOOGLE_SHEET_URL !== "YOUR_GOOGLE_APPS_SCRIPT_URL_HERE") {
        await fetch(GOOGLE_SHEET_URL, {
          method: "POST",
          body: formData,
          mode: "no-cors"
        });
      } else {
        // Fallback log before deployment
        console.log("RSVP submitted to guest list:", { name, contact, attendance, guests, message });
        await new Promise((res) => setTimeout(res, 600));
      }

      // Success feedback
      if (successEl) {
        successEl.classList.remove("hidden");
        successEl.scrollIntoView({ behavior: "smooth", block: "nearest" });
      }
      form.reset();
    } catch (err) {
      console.error("RSVP Submission Error:", err);
      if (errorEl) {
        errorEl.classList.remove("hidden");
      }
    } finally {
      if (submitBtn) submitBtn.disabled = false;
      if (btnText) {
        btnText.innerHTML = `
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <rect width="20" height="16" x="2" y="4" rx="2"></rect>
            <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
          </svg>
          Send RSVP
        `;
      }
    }
  });
}

/* ================= Scratch Card Implementation ================= */
let scratchInitialized = false;

function initScratchCard() {
  const canvas = document.getElementById("scratchCanvas");
  const wrapper = document.getElementById("scratchCardWrapper");
  const instructions = document.getElementById("scratchInstructions");
  const autoRevealBtn = document.getElementById("autoRevealBtn");
  if (!canvas || !wrapper) return;

  const rect = canvas.getBoundingClientRect();
  if (rect.width === 0 || rect.height === 0) return;

  // Cap DPR at 2 for silky-smooth performance on high-DPI OLED screens
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  const width = Math.round(rect.width);
  const height = Math.round(rect.height);

  canvas.width = width * dpr;
  canvas.height = height * dpr;

  const ctx = canvas.getContext("2d");
  ctx.scale(dpr, dpr);

  drawFoilLayer(ctx, width, height);

  // High-performance miniature offscreen tracker (80x50) for zero-lag percentage checking
  const trackW = 80;
  const trackH = 50;
  const trackCanvas = document.createElement("canvas");
  trackCanvas.width = trackW;
  trackCanvas.height = trackH;
  const trackCtx = trackCanvas.getContext("2d", { willReadFrequently: true });
  trackCtx.fillStyle = "#000";
  trackCtx.fillRect(0, 0, trackW, trackH);
  trackCtx.globalCompositeOperation = "destination-out";

  const scaleX = trackW / width;
  const scaleY = trackH / height;
  const scratchRadius = Math.max(34, width * 0.1);
  const trackRadius = scratchRadius * scaleX;

  let isDrawing = false;
  let lastX = 0;
  let lastY = 0;
  let isFullyRevealed = false;
  let cachedRect = null;
  let checkThrottleTimer = null;

  function updateRect() {
    cachedRect = canvas.getBoundingClientRect();
  }
  updateRect();

  function getPos(e) {
    if (!cachedRect) updateRect();
    const touch = e.touches && e.touches.length > 0 ? e.touches[0] : e;
    return {
      x: touch.clientX - cachedRect.left,
      y: touch.clientY - cachedRect.top
    };
  }

  function startScratch(e) {
    if (isFullyRevealed) return;
    updateRect();
    isDrawing = true;
    const pos = getPos(e);
    lastX = pos.x;
    lastY = pos.y;
    scratch(pos.x, pos.y);
  }

  function scratch(x, y) {
    // 1. Draw scratch path on visible canvas
    ctx.globalCompositeOperation = "destination-out";
    ctx.lineWidth = scratchRadius;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";

    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(x, y);
    ctx.stroke();

    // 2. Synchronize to tiny offscreen canvas (near instantaneous, <0.02ms)
    trackCtx.lineWidth = trackRadius;
    trackCtx.lineCap = "round";
    trackCtx.lineJoin = "round";
    trackCtx.beginPath();
    trackCtx.moveTo(lastX * scaleX, lastY * scaleY);
    trackCtx.lineTo(x * scaleX, y * scaleY);
    trackCtx.stroke();

    lastX = x;
    lastY = y;

    // Schedule check asynchronously so drawing frame is NEVER delayed
    schedulePercentageCheck();
  }

  function moveScratch(e) {
    if (!isDrawing || isFullyRevealed) return;
    if (e.cancelable) e.preventDefault();
    const pos = getPos(e);
    scratch(pos.x, pos.y);
  }

  function stopScratch() {
    if (!isDrawing) return;
    isDrawing = false;
    checkScratchPercentage();
  }

  function schedulePercentageCheck() {
    if (checkThrottleTimer || isFullyRevealed) return;
    checkThrottleTimer = setTimeout(() => {
      checkThrottleTimer = null;
      checkScratchPercentage();
    }, 250);
  }

  function checkScratchPercentage() {
    if (isFullyRevealed) return;

    // Read only 80x50 pixels from offscreen canvas: zero GPU stall!
    const imgData = trackCtx.getImageData(0, 0, trackW, trackH);
    const data = imgData.data;
    let transparentCount = 0;
    const totalPixels = trackW * trackH;

    for (let i = 3; i < data.length; i += 4) {
      if (data[i] === 0) {
        transparentCount++;
      }
    }

    const percent = transparentCount / totalPixels;
    if (percent > 0.38) {
      revealCardFully();
    }
  }

  function revealCardFully() {
    if (isFullyRevealed) return;
    isFullyRevealed = true;
    if (checkThrottleTimer) clearTimeout(checkThrottleTimer);

    canvas.style.opacity = "0";
    canvas.style.pointerEvents = "none";
    wrapper.classList.add("revealed");

    if (instructions) {
      instructions.innerHTML = "✨ <strong>Date Revealed!</strong> We look forward to celebrating with you. ✨";
      instructions.classList.add("text-burgundy");
    }

    if (autoRevealBtn) {
      autoRevealBtn.style.display = "none";
    }

    createConfettiSparkles();
  }

  function createConfettiSparkles() {
    const rect = wrapper.getBoundingClientRect();
    const container = document.body;
    const count = window.innerWidth < 768 ? 18 : 28;

    for (let i = 0; i < count; i++) {
      const sparkle = document.createElement("span");
      sparkle.style.position = "fixed";
      sparkle.style.left = `${rect.left + rect.width / 2}px`;
      sparkle.style.top = `${rect.top + rect.height / 2}px`;
      sparkle.style.width = `${4 + Math.random() * 5}px`;
      sparkle.style.height = `${4 + Math.random() * 5}px`;
      sparkle.style.backgroundColor = Math.random() > 0.5 ? "#b08a45" : "#6e1728";
      sparkle.style.borderRadius = "50%";
      sparkle.style.pointerEvents = "none";
      sparkle.style.zIndex = "999";
      sparkle.style.transition = "all 0.9s cubic-bezier(0.25, 1, 0.5, 1)";
      container.appendChild(sparkle);

      const angle = Math.random() * Math.PI * 2;
      const dist = 40 + Math.random() * 100;
      const destX = Math.cos(angle) * dist;
      const destY = Math.sin(angle) * dist;

      requestAnimationFrame(() => {
        sparkle.style.transform = `translate3d(${destX}px, ${destY}px, 0) scale(0)`;
        sparkle.style.opacity = "0";
      });

      setTimeout(() => sparkle.remove(), 950);
    }
  }

  // Event Listeners with passive optimization
  canvas.addEventListener("mousedown", startScratch);
  window.addEventListener("mousemove", moveScratch, { passive: false });
  window.addEventListener("mouseup", stopScratch, { passive: true });

  canvas.addEventListener("touchstart", startScratch, { passive: false });
  canvas.addEventListener("touchmove", moveScratch, { passive: false });
  window.addEventListener("touchend", stopScratch, { passive: true });
  window.addEventListener("touchcancel", stopScratch, { passive: true });

  if (autoRevealBtn) {
    autoRevealBtn.addEventListener("click", () => {
      revealCardFully();
    });
  }

  // Handle window resize with debounce
  let resizeTimer;
  window.addEventListener("resize", () => {
    if (!isFullyRevealed) {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        initScratchCard();
      }, 150);
    }
  }, { passive: true });
}

function drawFoilLayer(ctx, w, h) {
  ctx.save();

  // 1. Base metallic gold gradient
  const grad = ctx.createLinearGradient(0, 0, w, h);
  grad.addColorStop(0, "#c9a45e");
  grad.addColorStop(0.25, "#f7ebc8");
  grad.addColorStop(0.5, "#af812c");
  grad.addColorStop(0.75, "#faedcd");
  grad.addColorStop(1, "#8e651e");
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, w, h);

  // 2. High-gloss specular reflection diagonal band
  const specular = ctx.createLinearGradient(w * 0.15, 0, w * 0.85, h);
  specular.addColorStop(0.35, "rgba(255, 255, 255, 0)");
  specular.addColorStop(0.5, "rgba(255, 255, 255, 0.45)");
  specular.addColorStop(0.65, "rgba(255, 255, 255, 0)");
  ctx.fillStyle = specular;
  ctx.fillRect(0, 0, w, h);

  // 3. Guilloche security wavy curves (from reference screenshot)
  ctx.strokeStyle = "rgba(100, 65, 15, 0.16)";
  ctx.lineWidth = 0.9;
  for (let i = 0; i < 16; i++) {
    ctx.beginPath();
    const yBase = (h / 16) * i;
    for (let x = 0; x <= w; x += 4) {
      const y = yBase + Math.sin((x / w) * Math.PI * 3.5 + i * 0.45) * (h * 0.22);
      if (x === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.stroke();
  }

  // 4. Subtle golden foil border & corner brackets
  ctx.strokeStyle = "rgba(255, 255, 255, 0.65)";
  ctx.lineWidth = 1.6;
  const bSize = Math.min(22, w * 0.08);
  const pad = 12;

  // Top-Left
  ctx.beginPath();
  ctx.moveTo(pad, pad + bSize);
  ctx.lineTo(pad, pad);
  ctx.lineTo(pad + bSize, pad);
  ctx.stroke();

  // Top-Right
  ctx.beginPath();
  ctx.moveTo(w - pad - bSize, pad);
  ctx.lineTo(w - pad, pad);
  ctx.lineTo(w - pad, pad + bSize);
  ctx.stroke();

  // Bottom-Left
  ctx.beginPath();
  ctx.moveTo(pad, h - pad - bSize);
  ctx.lineTo(pad, h - pad);
  ctx.lineTo(pad + bSize, h - pad);
  ctx.stroke();

  // Bottom-Right
  ctx.beginPath();
  ctx.moveTo(w - pad - bSize, h - pad);
  ctx.lineTo(w - pad, h - pad);
  ctx.lineTo(w - pad, h - pad - bSize);
  ctx.stroke();

  // 5. Center Ornament (matches screenshot Image 1)
  const cx = w / 2;
  const cy = h / 2 - 14;

  // Horizontal wings
  ctx.strokeStyle = "rgba(75, 45, 10, 0.55)";
  ctx.lineWidth = 1.2;
  ctx.beginPath();
  ctx.moveTo(cx - 72, cy);
  ctx.lineTo(cx - 18, cy);
  ctx.moveTo(cx + 18, cy);
  ctx.lineTo(cx + 72, cy);
  ctx.stroke();

  // Central ornate clock/sunburst circle
  ctx.beginPath();
  ctx.arc(cx, cy, 11, 0, Math.PI * 2);
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(cx, cy, 7.5, 0, Math.PI * 2);
  ctx.stroke();

  // Clock tick marks
  for (let a = 0; a < 12; a++) {
    const ang = (a / 12) * Math.PI * 2;
    const px = cx + Math.cos(ang) * 9.2;
    const py = cy + Math.sin(ang) * 9.2;
    ctx.fillStyle = "rgba(75, 45, 10, 0.75)";
    ctx.fillRect(px - 0.75, py - 0.75, 1.5, 1.5);
  }

  // 6. Text: "SCRATCH HERE" & "to reveal the day"
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  ctx.fillStyle = "#3e2400";
  ctx.font = `600 ${Math.max(12, Math.round(w * 0.038))}px 'Jost', sans-serif`;
  ctx.fillText("SCRATCH HERE", cx, cy + 24);

  ctx.fillStyle = "#553200";
  ctx.font = `italic ${Math.max(11, Math.round(w * 0.033))}px 'Cormorant Garamond', serif`;
  ctx.fillText("to reveal the day", cx, cy + 42);

  ctx.restore();
}
