const [mario, pipe, restart, scoreBoard, backgroundMusic] = [".mario", ".pipe", ".restart", ".score", "#background-music"].map((item) =>
  document.querySelector(item)
);

let score = 0;
let pipeSpeed = 1.3; // Velocidade inicial dos canos em segundos
let pipeAnimation = `pipe ${pipeSpeed}s infinite linear`;

pipe.style.animation = pipeAnimation;

const updateScore = () => {
  score++;
  scoreBoard.textContent = `Score: ${score}`;
  console.log(`Score: ${score}`); // Log de depuração
};

const updatePipeSpeed = () => {
  pipeSpeed -= 0.1; // Aumenta a velocidade dos canos
  if (pipeSpeed <= 0.5) { // Limita a velocidade mínima
    pipeSpeed = 0.5;
  }
  pipeAnimation = `pipe ${pipeSpeed}s infinite linear`;
  pipe.style.animation = pipeAnimation;
  console.log(`Pipe Speed: ${pipeSpeed}s`); // Log de depuração
};

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
  console.log("Touch detected");
  jump();
});

document.addEventListener("click", (event) => {
  console.log("Click detected");
  jump();
});

document.addEventListener("keydown", (event) => {
  if (event.code === "Space") {
    console.log("Keydown detected");
    jump();
  }
});

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
      backgroundMusic.pause(); // Pausa a música quando o jogo termina
    } else if (pipePosition < 0) {
      // Quando o cano passar do Mario
      updateScore();
      updatePipeSpeed();
    }
  }
}, 10);

if (restart) {
  restart.addEventListener("click", () => {
    location.reload(true);
  });
}

// Verifique se os elementos estão carregados corretamente
if (!mario) {
  alert("Mario element not found");
}
if (!pipe) {
  alert("Pipe element not found");
}
if (!restart) {
  alert("Restart button not found");
}
if (!scoreBoard) {
  alert("Score board not found");
}
if (!backgroundMusic) {
  alert("Background music not found");
} else {
  backgroundMusic.play(); // Inicia a música quando o jogo começa
}
