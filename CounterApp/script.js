const countEl = document.getElementById('count');
const inc = document.getElementById('increase');
const dec = document.getElementById('decrease');
const reset = document.getElementById('reset');

let count = 0;
function render() {
  countEl.textContent = count;
}
inc.addEventListener('click', () => { count++; render(); });
dec.addEventListener('click', () => { count--; render(); });
reset.addEventListener('click', () => { count = 0; render(); });
render();
