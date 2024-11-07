const [mario, pipe, restart, scoreBoard, backgroundMusic] = [".mario", ".pipe", ".restart", ".score", "#background-music"].map((item) =>
  document.querySelector(item)
);

let score = 0;
let pipeSpeed = window.innerWidth < 600 ? 0.8 : 1.20; // Aumenta a velocidade do cano para telas menores
let pipePassed = false;

const updateScore = () => {
  ++score;
  scoreBoard.textContent = `Score: ${score}`;
};

// Ajusta a velocidade da animação do cano
if (pipe) {
  pipe.style.animation = `pipe ${pipeSpeed}s infinite linear`;
}

const jump = () => {
  if (mario) {
    mario.classList.add("jump");
    setTimeout(() => {
      mario.classList.remove("jump");
    }, window.innerWidth < 600 ? 300 : 500); // Salto mais rápido para dispositivos móveis
  }
};

// Eventos de toque, clique e tecla
document.addEventListener("touchstart", (event) => {
  event.preventDefault();
  jump();
});

document.addEventListener("click", () => {
  jump();
});

document.addEventListener("keydown", (event) => {
  if (event.code === "Space") {
    jump();
  }
});

// Loop principal do jogo
const loop = setInterval(() => {
  if (pipe && mario) {
    const pipePosition = pipe.offsetLeft;
    const marioPosition = +window.getComputedStyle(mario).bottom.replace("px", "");

    if (pipePosition <= 100 && pipePosition > 0 && marioPosition < 80) {
      // Lógica de colisão e game over
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
      if (backgroundMusic) {
        backgroundMusic.pause();
      }
    } else if (pipePosition < 0 && !pipePassed) {
      updateScore();
      pipePassed = true;
    } else if (pipePosition > 0) {
      pipePassed = false;
    }
  }
}, 10);

if (restart) {
  restart.addEventListener("click", () => {
    location.reload(true);
  });
}
