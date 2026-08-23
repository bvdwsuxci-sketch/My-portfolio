/* ---------- PAGE ROUTER ---------- */
const pages = document.querySelectorAll('.page');
const navLinks = document.querySelectorAll('.nav-link');
const pageLinks = document.querySelectorAll('[data-page]');

function showPage(pageId){
  pages.forEach(p => p.classList.toggle('active', p.id === pageId));
  navLinks.forEach(l => l.classList.toggle('active', l.dataset.page === pageId));
  window.scrollTo({top:0, behavior:'instant' in window ? 'instant' : 'auto'});
  if(pageId === 'skills'){ animateSkillBars(); }
  const navLinksEl = document.getElementById('navLinks');
  if(navLinksEl) navLinksEl.classList.remove('open');
}

pageLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const target = link.dataset.page;
    history.pushState(null, '', '#' + target);
    showPage(target);
  });
});

window.addEventListener('popstate', () => {
  const id = location.hash.replace('#','') || 'home';
  showPage(document.getElementById(id) ? id : 'home');
});

/* initial page on load, based on URL hash */
const initialId = location.hash.replace('#','') || 'home';
showPage(document.getElementById(initialId) ? initialId : 'home');

/* mobile nav toggle */
const navToggle = document.getElementById('navToggle');
const navLinksEl = document.getElementById('navLinks');
if(navToggle){
  navToggle.addEventListener('click', () => {
    navLinksEl.classList.toggle('open');
  });
}

/* ---------- SKILL BAR ANIMATION ---------- */
function animateSkillBars(){
  document.querySelectorAll('.skill-bar-fill').forEach(bar => {
    const target = bar.style.width;
    bar.style.width = '0%';
    requestAnimationFrame(() => {
      setTimeout(() => { bar.style.width = target; }, 80);
    });
  });
}

/* ---------- TERMINAL TYPING ANIMATION ---------- */
const lines = [
  { p: "saif@backend", path: "~", c: "whoami" },
  { out: "Saif Mohamed — Junior Backend Developer" },
  { p: "saif@backend", path: "~", c: "cat skills.txt" },
  { out: "C++ · Python · JavaScript · HTML · CSS · Bootstrap" },
  { p: "saif@backend", path: "~", c: "status" },
  { out: "open to junior backend opportunities ✓" },
];

const termBody = document.getElementById('termBody');
let i = 0;

function renderLine(item, cb){
  if(item.out){
    const div = document.createElement('div');
    div.className = 'cmd-out type-line';
    termBody.appendChild(div);
    typeText(div, item.out, cb);
  } else {
    const div = document.createElement('div');
    div.className = 'type-line';
    div.innerHTML = `<span class="prompt">${item.p}</span> <span class="path">${item.path} $</span> `;
    termBody.appendChild(div);
    const span = document.createElement('span');
    div.appendChild(span);
    typeText(span, item.c, cb);
  }
}

function typeText(el, text, cb){
  let j = 0;
  const interval = setInterval(()=>{
    el.textContent += text[j];
    j++;
    if(j >= text.length){
      clearInterval(interval);
      setTimeout(cb, 350);
    }
  }, 28);
}

function runNext(){
  if(i >= lines.length){
    const cursorEl = document.createElement('span');
    cursorEl.className = 'cursor';
    termBody.appendChild(cursorEl);
    return;
  }
  renderLine(lines[i], ()=>{ i++; runNext(); });
}
if(termBody) runNext();