// 入口：跑开机自检 → 进桌面
import { runBoot } from "./boot.js";
import { initDesktop, initLightbox, initVideoModal, initCrtToggle, initEditMode } from "./desktop.js";
import { initEggs } from "./eggs.js";

function enterDesktop() {
  const desktop = document.getElementById("desktop");
  desktop.hidden = false;
  desktop.classList.add("power-on");
  desktop.addEventListener("animationend", () => desktop.classList.remove("power-on"), { once: true });

  initDesktop();
  initLightbox();
  initVideoModal();
  initCrtToggle();
  initEditMode();
  initEggs();
}

runBoot(enterDesktop);
