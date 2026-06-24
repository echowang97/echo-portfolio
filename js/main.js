// 入口：跑开机自检 → 进桌面
import { runBoot } from "./boot.js";
import { initDesktop, initLightbox, initVideoModal, initCrtToggle } from "./desktop.js";
import { openWindow } from "./windows.js";

function enterDesktop() {
  const desktop = document.getElementById("desktop");
  desktop.hidden = false;
  desktop.classList.add("power-on");
  desktop.addEventListener("animationend", () => desktop.classList.remove("power-on"), { once: true });

  initDesktop();
  initLightbox();
  initVideoModal();
  initCrtToggle();

  // 进桌面后自动打开 About，给访客一个落点
  setTimeout(() => openWindow("about"), 450);
}

runBoot(enterDesktop);
