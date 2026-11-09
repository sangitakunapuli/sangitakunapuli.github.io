const hero = document.querySelector<HTMLElement>(".hero");
const canvas = hero?.querySelector<HTMLCanvasElement>(".mouse-ribbon");
const cube = hero?.querySelector<HTMLElement>(".spatial-cube");
const cubeLink = hero?.querySelector<HTMLElement>(".cube-link");
const motion = matchMedia("(prefers-reduced-motion: reduce)");

if (hero && canvas && cube && cubeLink) {
  const context = canvas.getContext("2d");
  type Point = { x: number; y: number; hue: number; life: number };
  let points: Point[] = [];
  let animation = 0;
  let lastTime = 0;
  let width = 0;
  let height = 0;
  new ResizeObserver(() => {
    width = hero.clientWidth;
    height = hero.clientHeight;
    const ratio = Math.min(devicePixelRatio || 1, 2);
    canvas.width = Math.round(width * ratio);
    canvas.height = Math.round(height * ratio);
    context?.setTransform(ratio, 0, 0, ratio, 0, 0);
  }).observe(hero);

  function draw(time: number) {
    if (!context) return;
    const elapsed = lastTime ? Math.min(time - lastTime, 50) : 16;
    lastTime = time;
    context.clearRect(0, 0, width, height);
    points = points.filter((point) => (point.life -= elapsed / 1600) > 0);
    context.lineCap = "round";
    context.shadowBlur = 18;
    for (let i = 1; i < points.length; i++) {
      const previous = points[i - 1];
      const point = points[i];
      context.beginPath();
      context.moveTo(previous.x, previous.y);
      context.quadraticCurveTo(
        previous.x,
        (previous.y + point.y) / 2,
        point.x,
        point.y,
      );
      context.lineWidth = 18 + point.life * 34;
      context.strokeStyle = `hsla(${point.hue}, 85%, 76%, ${point.life * 0.2})`;
      context.shadowColor = `hsla(${point.hue}, 85%, 76%, .3)`;
      context.stroke();
    }
    if (points.length) animation = requestAnimationFrame(draw);
    else {
      animation = 0;
      lastTime = 0;
    }
  }
  hero.addEventListener("pointermove", (event) => {
    if (motion.matches || event.pointerType !== "mouse" || !context) return;
    const bounds = hero.getBoundingClientRect();
    const x = event.clientX - bounds.left;
    const y = event.clientY - bounds.top;
    // Avoid drawing a connector across the section after leaving and returning.
    const previous = points.at(-1);
    if (previous && Math.hypot(previous.x - x, previous.y - y) > 120)
      points = [];
    points.push({ x, y, hue: 245 + Math.sin(x * 0.009) * 65, life: 1 });
    if (points.length > 90) points.shift();
    if (!animation) animation = requestAnimationFrame(draw);
  });
  cubeLink.addEventListener("pointermove", (event) => {
    if (motion.matches || event.pointerType !== "mouse") return;
    const bounds = cubeLink.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;
    cube.style.transform = `rotateX(${-20 - y * 24}deg) rotateY(${-32 + x * 40}deg)`;
  });
  cubeLink.addEventListener("pointerleave", () => {
    cube.style.transform = "";
  });
  motion.addEventListener("change", () => {
    if (!motion.matches) return;
    cancelAnimationFrame(animation);
    animation = 0;
    lastTime = 0;
    points = [];
    context?.clearRect(0, 0, width, height);
    cube.style.transform = "";
  });
}
export {};
