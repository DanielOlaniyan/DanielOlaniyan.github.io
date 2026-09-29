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
  // stop the browser jumping past the header when a page loads with #home / #projects etc.
  if (location.hash) window.addEventListener('load', () => setTimeout(() => window.scrollTo(0, 0), 0));
}

// Experience card:
//  - clicking a role opens a pop-up with just that role's bullets
//  - the corner expand icon shows every role's bullets inline (click again to hide)
const modal = document.getElementById('role-modal');
document.querySelectorAll('.card.experience').forEach(card => {
  const details = [...card.querySelectorAll('.role-detail')];

  card.querySelectorAll('.role').forEach(role => role.addEventListener('click', () => {
    const d = card.querySelector('#role-' + role.dataset.role);
    if (!modal || !d) return;
    modal.querySelector('#modal-kicker').textContent = d.querySelector('h4').firstChild.textContent.trim();
    modal.querySelector('#modal-title').textContent = d.dataset.title || '';
    modal.querySelector('#modal-when').textContent = d.dataset.when || '';
    const body = modal.querySelector('#modal-body');
    body.innerHTML = '';
    [...d.children].filter(el => el.tagName !== 'H4').forEach(el => body.appendChild(el.cloneNode(true)));
    modal.showModal();
  }));

  const all = card.querySelector('button.expand');
  if (all) all.addEventListener('click', () => {
    const open = !card.classList.contains('show-all');
    card.classList.toggle('show-all', open);
    details.forEach(d => d.classList.toggle('open', open));
    all.setAttribute('aria-expanded', open);
  });
});
if (modal) {
  modal.querySelector('.modal-close').addEventListener('click', () => modal.close());
  modal.addEventListener('click', e => { if (e.target === modal) modal.close(); }); // click outside the box
}

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
