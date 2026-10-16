import { createTimeline } from "animejs";

export function playExplosion(
  target: HTMLElement,
  effect: HTMLImageElement,
  imageSrc: string,
  sound: HTMLAudioElement,
): Promise<void> {
  effect.src = "";
  effect.src = imageSrc;

  return new Promise((resolve) => {
    createTimeline()
      .call(() => {
        target.classList.add("explosion-flash");
        sound.currentTime = 0;
        sound.play().catch(() => {});
      })
      .add(
        effect,
        { opacity: [0, 1], duration: 100, easing: "linear" },
        "<+=450",
      )
      .call(() => target.classList.remove("explosion-flash"), "<")
      .add(
        target,
        { opacity: [1, 0], duration: 200, easing: "easeOutQuad" },
        "<+=250",
      )
      .call(() => {
        effect.style.opacity = "0";
        resolve();
      }, "<+=1800");
  });
}
