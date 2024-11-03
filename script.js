// script.js

const [mario, pipe, restart, scoreBoard, backgroundMusic] = [".mario", ".pipe", ".restart", ".score", "#background-music"].map((item) =>
  document.querySelector(item)
);

let score = 0;
let pipeSpeed = 1.30; // Velocidade inicial dos canos em segundos

const updateScore = () => {
  ++score;
  scoreBoard.textContent = `Score: ${score}`;
};

/*const updatePipeSpeed = () => {
  pipeSpeed = Math.max(0.1, pipeSpeed - 0.01); // Limita a velocidade mínima
  pipe.style.animation = `pipe ${pipeSpeed}s infinite linear`;
};*/

const jump = () => {
  if (mario) {
    mario.classList.add("jump");
    setTimeout(() => {
      mario.classList.remove("jump");
    }, 500);
  }
};

// Adiciona eventos para toque, clique e tecla
document.addEventListener("touchstart", (event) => {
  event.preventDefault(); // Impede o comportamento padrão do toque
  jump();
});

document.addEventListener("click", (event) => {
  jump();
});

document.addEventListener("keydown", (event) => {
  if (event.code === "Space") {
    jump();
  }
});

const loop = setInterval(() => {
  if (pipe && mario) {
    const pipePosition = pipe.offsetLeft;
    const marioPosition = +window.getComputedStyle(mario).bottom.replace("px", "");

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
      if (backgroundMusic) {
        backgroundMusic.pause(); // Pausa a música quando o jogo termina
      }
    } else if (pipePosition < 0) {
      // Quando o cano passa da tela
      updateScore();
      //updatePipeSpeed();
    }
  }
}, 10);

if (restart) {
  restart.addEventListener("click", () => {
    location.reload(true);
  });
}

if (!mario) {
  console.error("Mario element not found");
}
if (!pipe) {
  console.error("Pipe element not found");
}
if (!restart) {
  console.error("Restart button not found");
}
if (!scoreBoard) {
  console.error("Score board not found");
}
if (backgroundMusic) {
  backgroundMusic.play(); // Inicia a música quando o jogo começa
} else {
  console.error("Background music not found");
}
