const [mario, pipe, restart, scoreBoard] = [".mario", ".pipe", ".restart", ".score"].map((item) =>
  document.querySelector(item)
);

let score = 0;
let pipeSpeed = 1.3; // Velocidade inicial dos canos em segundos
let pipeAnimation = `pipe ${pipeSpeed}s infinite linear`;

const updateScore = () => {
  score++;
  scoreBoard.textContent = `Score: ${score}`;
};

const updatePipeSpeed = () => {
  pipeSpeed -= 0.1; // Aumenta a velocidade dos canos
  pipeAnimation = `pipe ${pipeSpeed}s infinite linear`;
  pipe.style.animation = pipeAnimation;
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
    } else if (pipePosition < -80) {
      // Quando o cano sair da tela pela esquerda
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
