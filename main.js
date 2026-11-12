/* ==========================================================================
   Tribu de Aser — Interacciones (sin librerías)
   ========================================================================== */
(() => {
  "use strict";
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const pad = (n) => String(n).padStart(2, "0");
  const CONFIG = { whatsapp: "50259231912", groupName: "Tribu de Aser", church: "Iglesia Puerta del Cielo El Milagro" };

  /* Preloader */
  const pre = $(".preloader");
  const hidePre = () => pre && pre.classList.add("done");
  addEventListener("load", () => setTimeout(hidePre, 500));
  setTimeout(hidePre, 3000);

  $$("[data-year]").forEach((e) => (e.textContent = new Date().getFullYear()));

  /* Menú */
  const toggle = $(".nav__toggle"), links = $(".nav__links");
  if (toggle && links) {
    const set = (o) => { toggle.classList.toggle("open", o); links.classList.toggle("open", o); toggle.setAttribute("aria-expanded", o); document.body.style.overflow = o ? "hidden" : ""; };
    toggle.addEventListener("click", () => set(!links.classList.contains("open")));
    $$("a", links).forEach((a) => a.addEventListener("click", () => set(false)));
    addEventListener("keydown", (e) => e.key === "Escape" && set(false));
  }
  const cur = (location.pathname.split("/").pop() || "index.html").toLowerCase();
  $$(".nav__links a").forEach((a) => { if ((a.getAttribute("href") || "").toLowerCase() === cur) a.classList.add("active"); });

  /* Scroll */
  const nav = $(".nav"), bar = $(".progress i"), top = $(".fab .top");
  const onScroll = () => {
    const y = scrollY;
    nav && nav.classList.toggle("scrolled", y > 30);
    if (bar) { const h = document.documentElement.scrollHeight - innerHeight; bar.style.width = (h > 0 ? y / h * 100 : 0) + "%"; }
    top && top.classList.toggle("show", y > 700);
  };
  addEventListener("scroll", onScroll, { passive: true }); onScroll();
  top && top.addEventListener("click", () => scrollTo({ top: 0, behavior: "smooth" }));

  /* Reveal */
  const rev = $$(".reveal");
  if ("IntersectionObserver" in window && !reduce) {
    const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }), { threshold: .12, rootMargin: "0px 0px -5% 0px" });
    rev.forEach((el) => io.observe(el));
  } else rev.forEach((el) => el.classList.add("in"));

  /* Confeti */
  let confettiCanvas;
  const confetti = (n = 140) => {
    if (reduce) return;
    if (!confettiCanvas) { confettiCanvas = document.createElement("canvas"); confettiCanvas.id = "confetti"; document.body.appendChild(confettiCanvas); }
    const c = confettiCanvas, x = c.getContext("2d"); c.width = innerWidth; c.height = innerHeight;
    const colors = ["#ffc72c", "#c6f23c", "#f5f1df", "#5f7f2a"];
    const ps = Array.from({ length: n }, () => ({ x: innerWidth / 2, y: innerHeight * .6, vx: (Math.random() - .5) * 18, vy: -Math.random() * 16 - 6, s: Math.random() * 9 + 5, r: Math.random() * 6, vr: (Math.random() - .5) * .4, c: colors[Math.random() * 4 | 0] }));
    let f = 0;
    const draw = () => {
      x.clearRect(0, 0, c.width, c.height);
      ps.forEach((p) => { p.vy += .42; p.x += p.vx; p.y += p.vy; p.r += p.vr; x.save(); x.translate(p.x, p.y); x.rotate(p.r); x.fillStyle = p.c; x.fillRect(-p.s / 2, -p.s / 4, p.s, p.s / 2); x.restore(); });
      if (++f < 140) requestAnimationFrame(draw); else x.clearRect(0, 0, c.width, c.height);
    };
    draw();
  };
  $(".badge")?.addEventListener("click", () => confetti());

  /* Partículas + brillo que sigue al mouse */
  const cv = $("#particles");
  if (cv && !reduce) {
    const g = cv.getContext("2d"); let w, h, d;
    const rs = () => { w = cv.width = cv.offsetWidth; h = cv.height = cv.offsetHeight; d = Array.from({ length: Math.min(60, w * h / 24000 | 0) }, () => ({ x: Math.random() * w, y: Math.random() * h, r: Math.random() * 2 + .5, v: Math.random() * .5 + .15, a: Math.random() * .6 + .2 })); };
    const dr = () => { g.clearRect(0, 0, w, h); d.forEach((p) => { p.y -= p.v; if (p.y < -5) { p.y = h + 5; p.x = Math.random() * w; } g.beginPath(); g.arc(p.x, p.y, p.r, 0, 6.3); g.fillStyle = `rgba(255,199,44,${p.a})`; g.fill(); }); requestAnimationFrame(dr); };
    rs(); dr(); addEventListener("resize", rs);
  }
  const glow = $(".hero__glow");
  if (glow && !reduce) addEventListener("mousemove", (e) => { glow.style.left = e.clientX + "px"; glow.style.top = e.clientY + scrollY + "px"; }, { passive: true });

  /* ---------- Evento especial (config en js/config.js) ---------- */
  const EV = window.TRIBU_EVENTO;
  const evBox = $("[data-evento]"), chip = $("[data-ev-chip]");
  if (EV && EV.activo && EV.fecha) {
    const start = new Date(EV.fecha).getTime();
    const end = start + (EV.duracionMin || 120) * 6e4;
    const hideAt = start + (EV.ocultarDespuesHoras ?? 3) * 36e5;
    const tz = "America/Guatemala";
    const dia = new Intl.DateTimeFormat("es-GT", { weekday: "long", day: "numeric", month: "long", timeZone: tz }).format(start);
    const hora = new Intl.DateTimeFormat("en-US", { hour: "numeric", minute: "2-digit", hour12: true, timeZone: tz }).format(start).replace(" ", " ");
    const cap = (s) => s.charAt(0).toUpperCase() + s.slice(1);

    if (Date.now() < hideAt && evBox) {
      evBox.hidden = false;
      $("[data-ev-tag]").textContent = EV.etiqueta || "Evento";
      $("[data-ev-title]").textContent = EV.titulo;
      $("[data-ev-desc]").textContent = EV.descripcion || "";
      $("[data-ev-when]").textContent = `${cap(dia)} · ${hora} · ${EV.lugar || ""}`;
      const cnt = $("[data-ev-count]"), live = $("[data-ev-live]");
      const P = { d: $("[data-d]"), h: $("[data-h]"), m: $("[data-m]"), s: $("[data-s]") };
      let fired = false;
      const tick = () => {
        const now = Date.now(), diff = start - now;
        if (now >= hideAt) { evBox.hidden = true; chip && (chip.hidden = true); return; }
        if (diff <= 0) {
          cnt.hidden = true; live.hidden = false;
          live.textContent = now < end ? "¡Ya empezó! 🔥" : "¡Gracias por venir! 🙌";
          if (chip) chip.querySelector("[data-chip-text]").textContent = live.textContent;
          if (!fired) { fired = true; if (now - start < 6e4) confetti(220); }
          return;
        }
        P.d.textContent = pad(Math.floor(diff / 864e5)); P.h.textContent = pad(Math.floor(diff / 36e5 % 24));
        P.m.textContent = pad(Math.floor(diff / 6e4 % 60)); P.s.textContent = pad(Math.floor(diff / 1e3 % 60));
        if (chip) {
          const d = Math.floor(diff / 864e5), h = Math.floor(diff / 36e5 % 24), m = Math.floor(diff / 6e4 % 60);
          chip.querySelector("[data-chip-text]").textContent = `${EV.etiqueta}: ${cap(dia.split(",")[0])} ${hora} · faltan ${d ? d + "d " : ""}${h}h ${m}m`;
        }
      };
      if (chip) chip.hidden = false;
      tick(); setInterval(tick, 1000);

      const fmtUTC = (t) => new Date(t).toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
      $("[data-ev-ics]")?.addEventListener("click", () => {
        const ics = ["BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//Tribu de Aser//Evento//ES", "BEGIN:VEVENT", `UID:evento-${start}@tribudeaser`, `DTSTAMP:${fmtUTC(Date.now())}`, `DTSTART:${fmtUTC(start)}`, `DTEND:${fmtUTC(end)}`, `SUMMARY:${EV.titulo} · ${CONFIG.groupName}`, `LOCATION:${EV.lugar || CONFIG.church}`, `DESCRIPTION:${EV.descripcion || ""}`, "BEGIN:VALARM", "TRIGGER:-PT60M", "ACTION:DISPLAY", "DESCRIPTION:Recordatorio", "END:VALARM", "END:VEVENT", "END:VCALENDAR"].join("\r\n");
        dl("culto-especial.ics", ics);
      });
      $("[data-ev-share]")?.addEventListener("click", () => {
        const txt = `🔥 ${EV.titulo} · ${cap(dia)} a las ${hora}\n📍 ${EV.lugar || CONFIG.church}\n¡Te esperamos! ${location.href.split("#")[0]}`;
        if (navigator.share) navigator.share({ text: txt }).catch(() => {});
        else open(`https://wa.me/?text=${encodeURIComponent(txt)}`, "_blank", "noopener");
      });
    } else { evBox && (evBox.hidden = true); }
  }
  function dl(name, text) {
    const a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob([text], { type: "text/calendar;charset=utf-8" })); a.download = name;
    document.body.appendChild(a); a.click(); a.remove(); setTimeout(() => URL.revokeObjectURL(a.href), 1000);
  }

  /* Lightbox */
  const items = $$("[data-lightbox]");
  if (items.length) {
    const lb = document.createElement("div"); lb.className = "lightbox"; lb.setAttribute("role", "dialog"); lb.setAttribute("aria-modal", "true");
    lb.innerHTML = `<button class="lb-close" aria-label="Cerrar">✕</button><button class="lb-prev" aria-label="Anterior">‹</button><img alt=""/><button class="lb-next" aria-label="Siguiente">›</button><div class="lb-count"></div>`;
    document.body.appendChild(lb);
    const im = $("img", lb), ct = $(".lb-count", lb); let i = 0;
    const show = (n) => { i = (n + items.length) % items.length; const s = $("img", items[i]); im.src = s.src; im.alt = s.alt; ct.textContent = `${i + 1} / ${items.length}`; };
    const op = (n) => { show(n); lb.classList.add("open"); document.body.style.overflow = "hidden"; };
    const cl = () => { lb.classList.remove("open"); document.body.style.overflow = ""; };
    items.forEach((el, n) => { el.tabIndex = 0; el.setAttribute("role", "button"); el.addEventListener("click", () => op(n)); el.addEventListener("keydown", (e) => (e.key === "Enter" || e.key === " ") && (e.preventDefault(), op(n))); });
    $(".lb-close", lb).onclick = cl; $(".lb-prev", lb).onclick = () => show(i - 1); $(".lb-next", lb).onclick = () => show(i + 1);
    lb.addEventListener("click", (e) => e.target === lb && cl());
    addEventListener("keydown", (e) => { if (!lb.classList.contains("open")) return; if (e.key === "Escape") cl(); if (e.key === "ArrowLeft") show(i - 1); if (e.key === "ArrowRight") show(i + 1); });
    let sx = 0; lb.addEventListener("touchstart", (e) => (sx = e.touches[0].clientX), { passive: true });
    lb.addEventListener("touchend", (e) => { const dx = e.changedTouches[0].clientX - sx; if (Math.abs(dx) > 50) show(i + (dx < 0 ? 1 : -1)); });
  }

  /* Carrusel testimonios */
  const tr = $(".testi__track");
  if (tr) {
    const st = () => (tr.firstElementChild?.getBoundingClientRect().width || 300) + 24;
    $(".testi__prev")?.addEventListener("click", () => tr.scrollBy({ left: -st(), behavior: "smooth" }));
    $(".testi__next")?.addEventListener("click", () => tr.scrollBy({ left: st(), behavior: "smooth" }));
  }

  /* Horarios */
  const rows = $$(".row[data-day]");
  if (rows.length) {
    const DAYS = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"], ICS = ["SU", "MO", "TU", "WE", "TH", "FR", "SA"];
    const f12 = (t) => { const [H, M] = t.split(":").map(Number); return `${(H + 11) % 12 + 1}:${pad(M)} ${H >= 12 ? "PM" : "AM"}`; };
    const sv = rows.map((el) => ({ el, day: +el.dataset.day, time: el.dataset.time, name: el.dataset.name }));
    const now = new Date();
    sv.filter((s) => s.day === now.getDay()).forEach((s) => s.el.classList.add("today"));
    const next = (s) => { const [H, M] = s.time.split(":").map(Number); const d = new Date(now); d.setHours(H, M, 0, 0); d.setDate(d.getDate() + (s.day - now.getDay() + 7) % 7); if (d <= now) d.setDate(d.getDate() + 7); return d; };
    const up = sv.map((s) => ({ ...s, at: next(s) })).sort((a, b) => a.at - b.at)[0];
    const box = $("[data-next-service]");
    if (box && up) {
      const mins = Math.round((up.at - now) / 6e4), h = Math.floor(mins / 60), m = mins % 60;
      const same = up.at.toDateString() === now.toDateString(), tom = new Date(now); tom.setDate(now.getDate() + 1);
      const lab = same ? "Hoy" : up.at.toDateString() === tom.toDateString() ? "Mañana" : DAYS[up.day];
      $("[data-ns-name]", box).textContent = up.name;
      $("[data-ns-when]", box).textContent = `${lab} · ${f12(up.time)} — en ${h >= 24 ? Math.floor(h / 24) + " d " + h % 24 + " h" : h + " h " + m + " min"}`;
    }
    const build = (list) => {
      const stamp = new Date().toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
      const o = ["BEGIN:VCALENDAR", "VERSION:2.0", `PRODID:-//${CONFIG.groupName}//Horarios//ES`];
      list.forEach((s, k) => {
        const a = next(s), b = new Date(a.getTime() + 90 * 6e4), f = (d) => `${d.getFullYear()}${pad(d.getMonth() + 1)}${pad(d.getDate())}T${pad(d.getHours())}${pad(d.getMinutes())}00`;
        o.push("BEGIN:VEVENT", `UID:aser-${s.day}-${s.time.replace(":", "")}-${k}@tribudeaser`, `DTSTAMP:${stamp}`, `DTSTART:${f(a)}`, `DTEND:${f(b)}`, `RRULE:FREQ=WEEKLY;BYDAY=${ICS[s.day]}`, `SUMMARY:${s.name} · ${CONFIG.groupName}`, `LOCATION:${CONFIG.church}`, "BEGIN:VALARM", "TRIGGER:-PT60M", "ACTION:DISPLAY", "DESCRIPTION:Recordatorio", "END:VALARM", "END:VEVENT");
      });
      o.push("END:VCALENDAR"); return o.join("\r\n");
    };
    $("[data-ics-all]")?.addEventListener("click", () => dl("horarios-tribu-de-aser.ics", build(sv)));
    $("[data-ics-tribu]")?.addEventListener("click", () => dl("culto-tribu-de-aser.ics", build(sv.filter((s) => /tribu/i.test(s.name)))));
  }

  /* Formulario → WhatsApp */
  const form = $("[data-whatsapp-form]");
  form && form.addEventListener("submit", (e) => {
    e.preventDefault(); const d = new FormData(form);
    const t = `Hola, soy ${d.get("nombre")}.\nMotivo: ${d.get("motivo")}\n${d.get("telefono") ? "Mi teléfono: " + d.get("telefono") + "\n" : ""}\n${d.get("mensaje")}`;
    open(`https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(t)}`, "_blank", "noopener");
  });

  $$("img").forEach((i) => i.addEventListener("error", () => (i.style.opacity = "0"), { once: true }));
})();
