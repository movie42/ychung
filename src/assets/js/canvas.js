// christmas event canvas

window.onload = (function () {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  const amountSnow = 300;
  let createdSnow = [];
  document.body.prepend(canvas);

  function resize() {
    let width = document.body.clientWidth;
    let height = document.body.clientHeight;

    canvas.width = width;
    canvas.height = height;
    ctx.scale(2, 2);

    return {
      width,
      height,
    };
  }

  const { width, height } = resize();

  function AddFlakes() {
    let x = Math.ceil(Math.random() * width);
    let y = 0;
    let size = random(0, 5);
    const speedX = random(-1, 1);
    const speedY = random(0, 1);
    const radius = 10 * Math.PI;

    function drawSnow() {
      ctx.beginPath();
      ctx.fillStyle = "#e6f3ff";
      ctx.arc((x += speedX), (y += speedY), size, 0, radius);
      ctx.fill();
      ctx.closePath();

      if (y > height) {
        y = -1;
        x = Math.ceil(Math.random() * width);
        size = random(0, 6);
      }
    }

    return { drawSnow };
  }

  const random = (min, max) => {
    return min + Math.random() * (max - min + 1);
  };

  function createSnow() {
    for (let i = 0; i < amountSnow; i++) {
      createdSnow.push(new AddFlakes());
    }
  }

  function animation() {
    ctx.clearRect(0, 0, width, height);
    createdSnow.forEach((value) => value.drawSnow());
    requestAnimationFrame(animation);
  }

  createSnow();

  window.requestAnimationFrame(animation);
  window.addEventListener("resize", resize);
})();
