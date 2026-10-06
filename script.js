const canvas = document.getElementById('confetti-canvas');
const ctx = canvas.getContext('2d');

let W = canvas.width = window.innerWidth;
let H = canvas.height = window.innerHeight;

window.addEventListener('resize', () => {
  W = canvas.width = window.innerWidth;
  H = canvas.height = window.innerHeight;
});

const COLORS = ['#ffd700', '#ff69b4', '#ff1493', '#00e5ff', '#b388ff', '#ff8a80', '#a7ffeb'];
const confetti = [];

class Confetti {
  constructor() {
    this.reset();
    this.y = Math.random() * H;
  }
  reset() {
    this.x = Math.random() * W;
    this.y = -20;
    this.size = Math.random() * 8 + 4;
    this.color = COLORS[Math.floor(Math.random() * COLORS.length)];
    this.speedY = Math.random() * 3 + 2;
    this.speedX = Math.random() * 2 - 1;
    this.rotation = Math.random() * 360;
    this.rotSpeed = Math.random() * 6 - 3;
    this.shape = Math.random() > 0.5 ? 'rect' : 'circle';
  }
  update() {
    this.y += this.speedY;
    this.x += this.speedX + Math.sin(this.y * 0.02) * 0.5;
    this.rotation += this.rotSpeed;
    if (this.y > H + 20) this.reset();
  }
  draw() {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.rotation * Math.PI / 180);
    ctx.fillStyle = this.color;
    if (this.shape === 'rect') {
      ctx.fillRect(-this.size / 2, -this.size / 2, this.size, this.size * 0.6);
    } else {
      ctx.beginPath();
      ctx.arc(0, 0, this.size / 2, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();
  }
}

for (let i = 0; i < 120; i++) confetti.push(new Confetti());

function animate() {
  ctx.clearRect(0, 0, W, H);
  confetti.forEach(c => { c.update(); c.draw(); });
  requestAnimationFrame(animate);
}
animate();

const balloonsContainer = document.getElementById('balloons');
const BALLOON_COLORS = ['#ff69b4', '#ffd700', '#00e5ff', '#b388ff', '#ff1493', '#a7ffeb'];

function createBalloon() {
  const b = document.createElement('div');
  b.className = 'balloon';
  b.style.left = Math.random() * 100 + 'vw';
  b.style.background = `radial-gradient(circle at 30% 30%, #fff6, transparent), ${BALLOON_COLORS[Math.floor(Math.random() * BALLOON_COLORS.length)]}`;
  const duration = Math.random() * 10 + 12;
  b.style.animationDuration = duration + 's';
  b.style.animationDelay = Math.random() * 5 + 's';
  b.style.transform = `scale(${Math.random() * 0.6 + 0.6})`;
  balloonsContainer.appendChild(b);
  setTimeout(() => b.remove(), (duration + 5) * 1000);
}

for (let i = 0; i < 12; i++) createBalloon();
setInterval(createBalloon, 2500);

const modal = document.getElementById('modal');
const btn = document.getElementById('btn');
const closeBtn = document.getElementById('close-modal');

btn.addEventListener('click', () => {
  modal.classList.add('active');
  for (let i = 0; i < 80; i++) {
    const c = new Confetti();
    c.x = W / 2 + (Math.random() - 0.5) * 200;
    c.y = H / 2;
    c.speedY = Math.random() * 8 - 4;
    c.speedX = Math.random() * 10 - 5;
    confetti.push(c);
  }
});

closeBtn.addEventListener('click', () => modal.classList.remove('active'));
modal.addEventListener('click', (e) => {
  if (e.target === modal) modal.classList.remove('active');
});

document.querySelector('.name').addEventListener('click', () => {
  for (let i = 0; i < 60; i++) {
    const c = new Confetti();
    c.x = W / 2;
    c.y = H / 2;
    c.speedY = Math.random() * 12 - 6;
    c.speedX = Math.random() * 12 - 6;
    confetti.push(c);
  }
});
