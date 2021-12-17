// christmas event canvas

window.onload = (function () {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  const amountSnow = 2;
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
      height
    };
  }

  const { width, height } = resize();

  function AddFlakes() {
    let x = Math.ceil(Math.random() * width);
    let y = Math.ceil(Math.random() * height);
    const speedX = random(-2, 2);
    const speedY = random(0, 2);
    const size = random(0, 5);
    const radius = 10 * Math.PI;

    function drawSnow() {
      ctx.beginPath();
      ctx.fillStyle = "#e6f3ff";
      ctx.arc((x += speedX), (y += speedY), size, 0, radius);
      ctx.fill();
      ctx.closePath();
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
    createSnow();
    requestAnimationFrame(animation);
  }

  createSnow();

  window.requestAnimationFrame(animation);
  window.addEventListener("resize", resize);
})();
