// 桌面右侧探头小人 + 眼球跟随鼠标（小范围）。
// 需要 assets/mascot.png（透明底抠图）；没有就保持隐藏。
import { MASCOT } from "./content.js";

export function initMascot() {
  const cfg = MASCOT;
  const host = document.getElementById("mascot");
  if (!host || !cfg?.src) return;

  // 先探测图片是否存在；不存在就别显示，避免破图
  const probe = new Image();
  probe.onerror = () => { host.hidden = true; };
  probe.onload = () => mount();
  probe.src = cfg.src;

  function mount() {
    host.hidden = false;
    host.style.width = cfg.width + "vw";
    host.style.right = cfg.right + "vw";
    host.style.bottom = (cfg.bottom || 0) + "px";

    host.innerHTML = `<img class="mascot-img" src="${cfg.src}" alt="">`;
    const pupils = (cfg.eyes || []).map((e) => {
      const eye = document.createElement("span");
      eye.className = "m-eye";
      eye.style.left = e.x + "%";
      eye.style.top = e.y + "%";
      eye.style.width = cfg.pupilSize + "%";
      const pupil = document.createElement("span");
      pupil.className = "m-pupil";
      eye.appendChild(pupil);
      host.appendChild(eye);
      return pupil;
    });
    if (!pupils.length) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return; // 尊重「减少动效」：瞳孔居中不动

    let raf = 0, mx = 0, my = 0;
    window.addEventListener("mousemove", (ev) => {
      mx = ev.clientX; my = ev.clientY;
      if (!raf) raf = requestAnimationFrame(apply);
    });
    function apply() {
      raf = 0;
      const range = host.offsetWidth * (cfg.range / 100); // 最大位移 px
      for (const p of pupils) {
        const r = p.parentElement.getBoundingClientRect();
        const cx = r.left + r.width / 2;
        const cy = r.top + r.height / 2;
        const dx = mx - cx, dy = my - cy;
        const d = Math.hypot(dx, dy) || 1;
        const k = Math.min(range, d);
        p.style.transform = `translate(${(dx / d) * k}px, ${(dy / d) * k}px)`;
      }
    }
  }
}
