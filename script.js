const gallery = document.querySelector('.gallery');
const track = document.querySelector('.gallery-track');
const cards = [...document.querySelectorAll('.project-card')];
const hero = document.querySelector('.hero');
let current = 2;
let target = 2;
let position = 2;
let locked = false;

function render(next, immediate = false) {
  target = Math.max(0, Math.min(cards.length - 1, next));
  if (immediate) position = target;
  current = Math.round(target);
  cards.forEach((card, index) => card.classList.toggle('is-current', index === current));
}

function animate() {
  position += (target - position) * .105;
  if (Math.abs(target - position) < .001) position = target;
  track.style.transform = `translate3d(0, calc(${(-position * 100).toFixed(3)}svh), 0)`;
  requestAnimationFrame(animate);
}

function step(direction) {
  if (locked) return;
  const next = target + direction;
  if (next < 0 || next >= cards.length) return;
  locked = true;
  render(next);
  window.setTimeout(() => { locked = false; }, 720);
}

function handleWheel(event) {
  event.preventDefault();
  if (Math.abs(event.deltaY) > 8) step(event.deltaY > 0 ? 1 : -1);
}

window.addEventListener('wheel', handleWheel, { passive: false });

gallery.addEventListener('keydown', (event) => {
  if (event.key === 'ArrowDown' || event.key === 'PageDown') { event.preventDefault(); step(1); }
  if (event.key === 'ArrowUp' || event.key === 'PageUp') { event.preventDefault(); step(-1); }
});

cards.forEach((card, index) => card.addEventListener('click', (event) => {
  if (index !== current) { event.preventDefault(); render(index); }
}));

render(current, true);
animate();

hero.addEventListener('pointermove', (event) => {
  const rect = hero.getBoundingClientRect();
  const x = ((event.clientX - rect.left) / rect.width - .5) * 24;
  const y = ((event.clientY - rect.top) / rect.height - .5) * 16;
  hero.style.setProperty('--mx', x.toFixed(2));
  hero.style.setProperty('--my', y.toFixed(2));
});

hero.addEventListener('pointerleave', () => {
  hero.style.setProperty('--mx', 0);
  hero.style.setProperty('--my', 0);
});
