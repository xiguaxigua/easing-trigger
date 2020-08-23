import EasingTrigger, { EasingKey } from "./index";

const box = document.querySelector(".box");
const pauseBtn = document.querySelector("#pause");
const continueBtn = document.querySelector("#continue");

const [pauseLoop, continueLoop] = EasingTrigger({
  start: 0,
  end: 500,
  type: EasingKey.linear,
  duration: 5000,
  onStep: (val) => {
    (box as any).style.top = `${val}px`;
  },
});

pauseBtn.addEventListener("click", pauseLoop);
continueBtn.addEventListener("click", continueLoop);
