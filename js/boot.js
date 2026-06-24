// 开机自检：打字机式逐行打印，可点 SKIP / 按任意键进入
import { BOOT_LINES, BOOT_LOGO } from "./content.js";

export function runBoot(onDone) {
  const boot = document.getElementById("boot");
  const logoEl = document.getElementById("boot-logo");
  const logEl = document.getElementById("boot-log");
  const skip = document.getElementById("boot-skip");

  logoEl.textContent = BOOT_LOGO;

  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let i = 0, done = false, timer = null;

  const enter = () => {
    if (done) return;
    done = true;
    clearTimeout(timer);
    cleanup();
    boot.classList.add("fade-out");
    setTimeout(() => { boot.style.display = "none"; onDone(); }, reduce ? 0 : 350);
  };

  const finishPrint = () => {
    logEl.innerHTML = BOOT_LINES.join("\n").replace(/_$/, '<span class="cursor">_</span>');
  };

  const tick = () => {
    if (i >= BOOT_LINES.length) {
      finishPrint();
      return; // 停在 "press any key"，等用户进入
    }
    logEl.textContent += (i ? "\n" : "") + BOOT_LINES[i];
    i++;
    timer = setTimeout(tick, BOOT_LINES[i - 1] === "" ? 60 : 110);
  };

  function onKey() { enter(); }
  function cleanup() {
    skip.removeEventListener("click", enter);
    boot.removeEventListener("click", enter);
    window.removeEventListener("keydown", onKey);
  }

  skip.addEventListener("click", (e) => { e.stopPropagation(); enter(); });
  boot.addEventListener("click", enter);
  window.addEventListener("keydown", onKey);

  if (reduce) { finishPrint(); }
  else { tick(); }
}
