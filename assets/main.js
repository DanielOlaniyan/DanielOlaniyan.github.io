// Tabs on the home page: #home, #projects, #education.
// Each panel's data-title replaces the big heading (e.g. "Projects").
const panels = document.querySelectorAll('.panel');
const title = document.querySelector('.site-title a');
if (panels.length) {
  document.documentElement.classList.add('js');
  const show = () => {
    const id = (location.hash || '#home').slice(1);
    const target = document.getElementById(id) || document.getElementById('home');
    panels.forEach(p => p.classList.toggle('active', p === target));
    document.querySelectorAll('.tabs a').forEach(a =>
      a.classList.toggle('active', a.getAttribute('href').endsWith('#' + target.id)));
    if (title && target.dataset.title) title.textContent = target.dataset.title;
  };
  window.addEventListener('hashchange', () => { show(); window.scrollTo(0, 0); });
  show();
}

// Experience: click a role to open its bullets (one at a time).
// The card's expand icon opens or closes all of them.
document.querySelectorAll('.card.experience').forEach(card => {
  const roles = [...card.querySelectorAll('.role')];
  const detail = r => card.querySelector('#role-' + r.dataset.role);
  const set = (r, open) => { r.setAttribute('aria-expanded', open); detail(r).classList.toggle('open', open); };
  roles.forEach(r => r.addEventListener('click', () => {
    const wasOpen = r.getAttribute('aria-expanded') === 'true';
    roles.forEach(o => set(o, false));
    if (!wasOpen) set(r, true);
  }));
  const all = card.querySelector('button.expand');
  if (all) all.addEventListener('click', () => {
    const anyClosed = roles.some(r => r.getAttribute('aria-expanded') !== 'true');
    roles.forEach(r => set(r, anyClosed));
  });
});

// Lightbox: any <img data-zoom> opens full size, caption from alt text
const box = document.createElement('div');
box.className = 'lightbox';
box.innerHTML = '<img alt=""><p></p>';
document.body.appendChild(box);
document.querySelectorAll('img[data-zoom]').forEach(img => {
  img.addEventListener('click', () => {
    box.querySelector('img').src = img.src;
    box.querySelector('p').textContent = img.alt;
    box.classList.add('open');
  });
});
box.addEventListener('click', () => box.classList.remove('open'));
document.addEventListener('keydown', e => { if (e.key === 'Escape') box.classList.remove('open'); });

document.querySelectorAll('[data-year]').forEach(el => (el.textContent = new Date().getFullYear()));
