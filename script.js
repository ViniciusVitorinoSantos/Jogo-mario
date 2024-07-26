const [mario, pipe, restart] = [".mario", ".pipe", ".restart"].map((item) => {
  const element = document.querySelector(item);
  if (!element) {
    alert(`Element not found: ${item}`);
  }
  return element;
});

const jump = () => {
  if (mario) {
    mario.classList.add("jump");
    setTimeout(() => {
      mario.classList.remove("jump");
    }, 500);
  }
};

// Adiciona o evento de toque para dispositivos móveis
document.addEventListener("touchstart", (event) => {
  alert("Touch detected");
  jump();
});

// Adiciona o evento de teclado para dispositivos desktop
document.addEventListener("keydown", jump);

const loop = setInterval(() => {
  if (pipe && mario) {
    const pipePosition = pipe.offsetLeft;
    const marioPosition = +window
      .getComputedStyle(mario)
      .bottom.replace("px", "");

    if (pipePosition <= 100 && pipePosition > 0 && marioPosition < 80) {
      pipe.style.animation = "none";
      pipe.style.left = `${pipePosition}px`;

      mario.style.animation = "none";
      mario.style.bottom = `${marioPosition}px`;

      mario.src = "./assets/game-over.png";
      mario.style.width = "100px";
      mario.style.marginLeft = "25px";

      mario.classList.remove("jump");
      mario.classList.add("game-over");

      clearInterval(loop);
    }
  }
}, 10);

if (restart) {
  restart.addEventListener("click", () => {
    location.reload(true);
  });
} else {
  alert("Restart button not found");
}
