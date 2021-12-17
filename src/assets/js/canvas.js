// christmas event canvas

window.onload = (function () {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

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

  function addFlakes() {
    const x = Math.ceil(Math.random() * width);
    const speed = Math.ceil(Math.random() * 5);
    const radius = 10 * Math.PI;

    return { x, y: 0, speed, radius };
  }

  function drawSnow(x, y, speed, radius) {
    let vy = speed;
    let vx = speed;

    ctx.beginPath();
    ctx.fillStyle = "#F7F7F7";

    ctx.arc(x, (y += vy), speed * 0.8, 0, radius);
    ctx.fill();
  }

  function animation() {
    window.requestAnimationFrame(animation);
    let { x, y, speed, radius } = addFlakes();
    drawSnow(x, y, speed, radius);
    addFlakes();
  }

  window.requestAnimationFrame(animation);
  window.addEventListener("resize", resize);
})();
