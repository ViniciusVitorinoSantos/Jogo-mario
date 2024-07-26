const [mario, pipe, restart] = [".mario", ".pipe", ".restart"].map((item) =>
  document.querySelector(item)
);

const jump = () => {
  if (mario) {
    console.log("Jump triggered");
    mario.classList.add("jump");
    setTimeout(() => {
      mario.classList.remove("jump");
    }, 500);
  }
};

// Adiciona eventos para toque, clique e tecla
document.addEventListener("touchstart", (event) => {
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
