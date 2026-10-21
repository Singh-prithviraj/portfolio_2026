import { useEffect, useRef, useState } from "react";

const reduced = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* Aurora + grid + particle network + cursor glow + scroll bar + pointer effects
   (spotlight cards, 3D tilt, magnetic buttons) — all in one global layer. */
export function Effects() {
  const bar = useRef(null);
  const glow = useRef(null);
  const canvas = useRef(null);

  useEffect(() => {
    const h = document.documentElement;
    const onScroll = () => {
      bar.current.style.transform = `scaleX(${h.scrollTop / (h.scrollHeight - h.clientHeight || 1)})`;
    };
    let tiltEl = null, magEl = null;
    const onMove = (e) => {
      glow.current.style.transform = `translate3d(${e.clientX}px,${e.clientY}px,0)`;
      const spot = e.target.closest?.(".spot");
      if (spot) {
        const r = spot.getBoundingClientRect();
        spot.style.setProperty("--mx", `${e.clientX - r.left}px`);
        spot.style.setProperty("--my", `${e.clientY - r.top}px`);
      }
      const t = e.target.closest?.(".tilt");
      if (tiltEl && tiltEl !== t) { tiltEl.style.removeProperty("--rx"); tiltEl.style.removeProperty("--ry"); }
      if (t) {
        const r = t.getBoundingClientRect();
        t.style.setProperty("--rx", `${-((e.clientY - r.top) / r.height - 0.5) * 9}deg`);
        t.style.setProperty("--ry", `${((e.clientX - r.left) / r.width - 0.5) * 9}deg`);
      }
      tiltEl = t;
      const m = e.target.closest?.(".magnetic");
      if (magEl && magEl !== m) magEl.style.translate = "";
      if (m) {
        const r = m.getBoundingClientRect();
        m.style.translate = `${(e.clientX - r.left - r.width / 2) * 0.22}px ${(e.clientY - r.top - r.height / 2) * 0.35}px`;
      }
      magEl = m;
    };
    onScroll();
    addEventListener("scroll", onScroll, { passive: true });
    if (!reduced()) addEventListener("pointermove", onMove, { passive: true });
    return () => { removeEventListener("scroll", onScroll); removeEventListener("pointermove", onMove); };
  }, []);

  // Interactive particle network that reacts to the cursor.
  useEffect(() => {
    if (reduced()) return;
    const c = canvas.current, ctx = c.getContext("2d");
    const dpr = Math.min(devicePixelRatio || 1, 2);
    let w, h, raf;
    const mouse = { x: -999, y: -999 };
    const resize = () => {
      w = innerWidth; h = innerHeight;
      c.width = w * dpr; c.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    const pts = Array.from({ length: innerWidth < 760 ? 32 : 68 }, () => ({
      x: Math.random() * w, y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.35, vy: (Math.random() - 0.5) * 0.35,
    }));
    const move = (e) => { mouse.x = e.clientX; mouse.y = e.clientY; };
    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      for (const p of pts) {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;
        const dx = p.x - mouse.x, dy = p.y - mouse.y, d = Math.hypot(dx, dy);
        if (d < 150) { p.x += (dx / d) * 0.8; p.y += (dy / d) * 0.8; }
        ctx.fillStyle = "rgba(167,139,250,.55)";
        ctx.beginPath(); ctx.arc(p.x, p.y, 1.4, 0, 6.283); ctx.fill();
      }
      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const d = Math.hypot(pts[i].x - pts[j].x, pts[i].y - pts[j].y);
          if (d < 120) {
            ctx.strokeStyle = `rgba(139,92,246,${0.18 * (1 - d / 120)})`;
            ctx.beginPath(); ctx.moveTo(pts[i].x, pts[i].y); ctx.lineTo(pts[j].x, pts[j].y); ctx.stroke();
          }
        }
        const dm = Math.hypot(pts[i].x - mouse.x, pts[i].y - mouse.y);
        if (dm < 170) {
          ctx.strokeStyle = `rgba(236,72,153,${0.4 * (1 - dm / 170)})`;
          ctx.beginPath(); ctx.moveTo(pts[i].x, pts[i].y); ctx.lineTo(mouse.x, mouse.y); ctx.stroke();
        }
      }
      raf = requestAnimationFrame(draw);
    };
    draw();
    addEventListener("resize", resize);
    addEventListener("pointermove", move, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      removeEventListener("resize", resize);
      removeEventListener("pointermove", move);
    };
  }, []);

  return (
    <>
      <div className="aurora" aria-hidden="true"><i /><i /><i /></div>
      <canvas ref={canvas} className="particles" aria-hidden="true" />
      <div ref={glow} className="cursor-glow" aria-hidden="true" />
      <div ref={bar} className="progress" aria-hidden="true" />
    </>
  );
}

/* Name "decodes" from random glyphs into the real text. */
export function Scramble({ text }) {
  const [out, setOut] = useState(text);
  useEffect(() => {
    if (reduced()) return;
    const glyphs = "!<>-_/[]{}=+*^?#01";
    let f = 0;
    const id = setInterval(() => {
      f++;
      setOut(
        text.split("").map((ch, i) =>
          ch === " " || i < (f - 6) / 1.2 ? ch : glyphs[Math.floor(Math.random() * glyphs.length)]
        ).join("")
      );
      if (f > text.length * 1.2 + 8) { clearInterval(id); setOut(text); }
    }, 40);
    return () => clearInterval(id);
  }, [text]);
  return <span aria-label={text}>{out}</span>;
}

/* Rotating typewriter for the role line. */
export function Typewriter({ words }) {
  const [i, setI] = useState(0);
  const [txt, setTxt] = useState("");
  const [del, setDel] = useState(false);
  useEffect(() => {
    if (reduced()) return setTxt(words[0]);
    const w = words[i % words.length];
    let t;
    if (!del && txt === w) t = setTimeout(() => setDel(true), 1700);
    else if (del && txt === "") { setDel(false); setI(i + 1); }
    else t = setTimeout(() => setTxt(del ? w.slice(0, txt.length - 1) : w.slice(0, txt.length + 1)), del ? 30 : 70);
    return () => clearTimeout(t);
  }, [txt, del, i]);
  return <span className="typed">{txt}</span>;
}

/* Number that counts up on load. */
export function CountUp({ to, decimals = 0, suffix = "" }) {
  const [v, setV] = useState(0);
  useEffect(() => {
    const n = parseFloat(to) || 0;
    const t0 = performance.now();
    let raf;
    const tick = (t) => {
      const p = Math.min((t - t0) / 1400, 1);
      setV(n * (1 - Math.pow(1 - p, 3)));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [to]);
  return <>{v.toFixed(decimals)}{suffix}</>;
}

/* Infinite tech-stack ticker. */
export function Marquee({ skills = {} }) {
  const items = Object.values(skills).flat();
  if (!items.length) return null;
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee-track">
        {[...items, ...items].map((s, i) => <span key={i}>{s}</span>)}
      </div>
    </div>
  );
}
