/* ============================================================
   AURUM & NOIR — Eclipse v2 scroll engine
   Native scroll · rAF-interpolated frame scrub · immediate,
   reversible, pauses with the user. No smooth-scroll library.
   ============================================================ */
(() => {
  "use strict";

  const FINE_POINTER = matchMedia("(pointer: fine)").matches;
  const REDUCED = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const MOBILE = matchMedia("(max-width: 767px)").matches;

  /* ---------- frame scrub sections ---------- */
  const scrubs = [];

  function initScrub(cfg) {
    const section = document.querySelector(cfg.section);
    if (!section) return;
    const canvas = section.querySelector("canvas");
    const ctx = canvas.getContext("2d", { alpha: false });
    const N = cfg.frameCount;
    const images = new Array(N);
    let loaded = 0;
    let loadStarted = false;
    let firstDrawn = false;
    let current = -1;      // last drawn integer frame
    let position = 0;      // interpolated float position

    // reversed sections read the same files backwards — zero extra assets
    const fileIndex = (i) => (cfg.reverse ? N - 1 - i : i) + 1;

    function startLoading() {
      if (loadStarted) return;
      loadStarted = true;
      for (let i = 0; i < N; i++) {
        const img = new Image();
        img.decoding = "async";
        img.src = cfg.framePath(fileIndex(i));
        img.onload = () => {
          loaded++;
          if (cfg.onProgress) cfg.onProgress(loaded / N);
          if (!firstDrawn) { firstDrawn = true; draw(0); }
          else if (i === current) draw(i);
        };
        images[i] = img;
      }
    }

    function nearestLoaded(idx) {
      if (images[idx] && images[idx].complete && images[idx].naturalWidth) return idx;
      for (let d = 1; d < N; d++) {
        const lo = idx - d, hi = idx + d;
        if (lo >= 0 && images[lo] && images[lo].complete && images[lo].naturalWidth) return lo;
        if (hi < N && images[hi] && images[hi].complete && images[hi].naturalWidth) return hi;
      }
      return -1;
    }

    function draw(index) {
      const use = nearestLoaded(index);
      if (use < 0) return;
      const img = images[use];
      const cw = canvas.clientWidth, ch = canvas.clientHeight;
      const ir = img.naturalWidth / img.naturalHeight, cr = cw / ch;
      let dw, dh, dx, dy;
      if (ir > cr) { dh = ch; dw = ch * ir; dx = (cw - dw) / 2; dy = 0; }
      else { dw = cw; dh = cw / ir; dx = 0; dy = (ch - dh) / 2; }
      ctx.fillStyle = cfg.bg || "#0a0908";
      ctx.fillRect(0, 0, cw, ch);
      ctx.drawImage(img, dx, dy, dw, dh);
    }

    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, MOBILE ? 1.75 : 2);
      canvas.width = Math.round(canvas.clientWidth * dpr);
      canvas.height = Math.round(canvas.clientHeight * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      draw(current < 0 ? 0 : current);
    }

    function progress() {
      const rect = section.getBoundingClientRect();
      const scrollable = rect.height - window.innerHeight;
      if (scrollable <= 0) return 0;
      return Math.min(Math.max(-rect.top / scrollable, 0), 1);
    }

    function update() {
      const rect = section.getBoundingClientRect();
      const nearViewport = rect.bottom > -window.innerHeight * 2 && rect.top < window.innerHeight * 3;
      if (nearViewport) startLoading();
      if (rect.bottom < -window.innerHeight || rect.top > window.innerHeight) return;

      const p = progress();
      const target = p * (N - 1);
      // fast lerp toward the target: immediate response, no waiting for
      // scroll-end, smooth over sudden jumps, naturally reversible.
      const delta = target - position;
      position = Math.abs(delta) < 0.5 ? target : position + delta * 0.35;
      const idx = Math.round(position);
      if (idx !== current) { current = idx; draw(idx); }

      // per-line copy windows
      for (const el of section.querySelectorAll("[data-in]")) {
        const a = parseFloat(el.dataset.in), b = parseFloat(el.dataset.out);
        const mid = (a + b) / 2, half = (b - a) / 2;
        let o = 1 - Math.abs(p - mid) / half;
        o = Math.max(0, Math.min(1, o));
        if (el.classList.contains("split")) {
          const letters = el.querySelectorAll("span");
          letters.forEach((s, i) => {
            const lo = Math.max(0, Math.min(1, o * letters.length - i * 0.55));
            s.style.opacity = lo.toFixed(3);
            s.style.transform = `translateY(${(1 - lo) * 0.35}em)`;
          });
        } else {
          el.style.opacity = o.toFixed(3);
          el.style.transform = `translateY(${(1 - o) * 24}px)`;
        }
      }

      // ghost word parallax
      const ghost = section.querySelector(".ghost");
      if (ghost) ghost.style.transform = `translate(calc(-50% + ${(p - 0.5) * -14}vw), -50%)`;

      if (cfg.onUpdate) cfg.onUpdate(p);
    }

    window.addEventListener("resize", resize);
    resize();
    if (cfg.eager) startLoading();
    const s = { update, resize, startLoading, get loadedRatio() { return loaded / N; } };
    scrubs.push(s);
    return s;
  }

  /* ---------- boot ---------- */
  document.addEventListener("DOMContentLoaded", () => {
    const cfgs = window.SCRUB_SECTIONS || [];
    const built = cfgs.map(initScrub).filter(Boolean);

    /* preloader: waits for the signature section's opening frames */
    const loader = document.getElementById("loader");
    const loaderBar = document.getElementById("loader-bar");
    let revealed = false;
    function reveal() {
      if (revealed) return;
      revealed = true;
      document.body.classList.add("ready");
      setTimeout(() => loader && loader.remove(), 1400);
    }
    if (REDUCED || !loader) reveal();
    else {
      const t0 = performance.now();
      (function watch() {
        const r = built.length ? built[0].loadedRatio : 1;
        if (loaderBar) loaderBar.style.transform = `scaleX(${Math.max(r, (performance.now() - t0) / 3200)})`;
        if (r >= 0.22 || performance.now() - t0 > 3200) reveal();
        else requestAnimationFrame(watch);
      })();
    }

    /* single rAF loop drives everything */
    let lastY = -1;
    function raf() {
      built.forEach((s) => s.update());
      const y = window.scrollY;
      if (y !== lastY) {
        lastY = y;
        const max = document.documentElement.scrollHeight - window.innerHeight;
        const fill = document.getElementById("progress-fill");
        if (fill) fill.style.transform = `scaleX(${max > 0 ? y / max : 0})`;
        const hint = document.querySelector(".scroll-hint");
        if (hint) hint.style.opacity = y > 40 ? "0" : "";
        document.body.style.setProperty("--glow-shift", `${(y / Math.max(max, 1)) * 100}%`);
      }
      requestAnimationFrame(raf);
    }
    if (!REDUCED) requestAnimationFrame(raf);
    else built.forEach((s) => s.startLoading());

    /* section index marker */
    const marks = [...document.querySelectorAll("[data-mark]")];
    const marker = document.getElementById("section-marker");
    if (marker && marks.length) {
      const mio = new IntersectionObserver((es) => {
        es.forEach((e) => { if (e.isIntersecting) marker.textContent = e.target.dataset.mark; });
      }, { rootMargin: "-45% 0px -45% 0px" });
      marks.forEach((m) => mio.observe(m));
    }

    /* quiet reveals for static copy */
    const io = new IntersectionObserver((es) => {
      es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } });
    }, { threshold: 0.3 });
    document.querySelectorAll(".reveal").forEach((el) => io.observe(el));

    /* custom cursor + magnetic CTA — desktop pointer only */
    if (FINE_POINTER && !REDUCED) {
      const dot = document.createElement("div");
      const ring = document.createElement("div");
      dot.className = "cur-dot"; ring.className = "cur-ring";
      document.body.append(dot, ring);
      let mx = -100, my = -100, rx = -100, ry = -100;
      addEventListener("mousemove", (e) => { mx = e.clientX; my = e.clientY; }, { passive: true });
      (function curloop() {
        rx += (mx - rx) * 0.16; ry += (my - ry) * 0.16;
        dot.style.transform = `translate(${mx}px, ${my}px)`;
        ring.style.transform = `translate(${rx}px, ${ry}px)`;
        requestAnimationFrame(curloop);
      })();
      document.querySelectorAll("a, button").forEach((el) => {
        el.addEventListener("mouseenter", () => ring.classList.add("on"));
        el.addEventListener("mouseleave", () => ring.classList.remove("on"));
      });
      document.querySelectorAll(".magnetic").forEach((el) => {
        el.addEventListener("mousemove", (e) => {
          const r = el.getBoundingClientRect();
          el.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * 0.22}px, ${(e.clientY - r.top - r.height / 2) * 0.22}px)`;
        });
        el.addEventListener("mouseleave", () => { el.style.transform = ""; });
      });
      document.body.classList.add("has-cursor");
    }

    /* film grain — desktop only, very quiet */
    if (FINE_POINTER && !REDUCED) {
      const g = document.createElement("canvas");
      g.className = "grain";
      g.width = 160; g.height = 160;
      const gx = g.getContext("2d");
      document.body.appendChild(g);
      setInterval(() => {
        const d = gx.createImageData(160, 160);
        for (let i = 0; i < d.data.length; i += 4) {
          const v = (Math.random() * 255) | 0;
          d.data[i] = d.data[i + 1] = d.data[i + 2] = v; d.data[i + 3] = 14;
        }
        gx.putImageData(d, 0, 0);
      }, 120);
    }
  });
})();
