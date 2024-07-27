const [mario, pipe, restart, scoreBoard, backgroundMusic] = [".mario", ".pipe", ".restart", ".score", "#background-music"].map((item) =>
  document.querySelector(item)
);

let score = 0;
let pipeSpeed = 1.3; // Velocidade inicial dos canos em segundos

// Função para atualizar o marcador de pontos
const updateScore = () => {
  score++;
  scoreBoard.textContent = `Score: ${score}`;
};

// Função para atualizar a velocidade dos canos
const updatePipeSpeed = () => {
  pipeSpeed = Math.max(0.5, pipeSpeed - 0.05); // Aumenta a velocidade dos canos, limitando a velocidade mínima
  pipe.style.animation = `pipe ${pipeSpeed}s infinite linear`;
};

// Função de pular
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

// Função de loop do jogo
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
