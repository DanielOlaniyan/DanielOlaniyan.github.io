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

// Project pages: the section bar works as tabs. Each tab shows one section;
// untagged cards ride along with the section before them. "View all" shows everything.
const toc = document.querySelector('nav.toc');
if (toc) {
  const after = [...document.querySelectorAll('main .card')]
    .filter(c => toc.compareDocumentPosition(c) & Node.DOCUMENT_POSITION_FOLLOWING);
  const groups = [];
  let pending = [];
  after.forEach(c => {
    if (c.dataset.toc) {
      if (!c.id) c.id = c.dataset.toc.toLowerCase().replace(/&amp;|&/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
      groups.push({ id: c.id, name: c.dataset.toc, cards: [...pending, c] });
      pending = [];
    } else if (groups.length) groups[groups.length - 1].cards.push(c);
    else pending.push(c);
  });

  const ul = document.createElement('ul');
  const tabs = [...groups, { id: 'all', name: 'View all', cards: after }];
  tabs.forEach(g => {
    const li = document.createElement('li');
    li.innerHTML = `<a href="#${g.id}"${g.id === 'all' ? ' class="all"' : ''}>${g.name}</a>`;
    ul.appendChild(li);
  });
  toc.appendChild(ul);
  const links = [...ul.querySelectorAll('a')];

  // previous / next links at the foot of each section
  groups.forEach((g, i) => {
    const nav = document.createElement('div');
    nav.className = 'tabnav';
    const prev = groups[i - 1], next = groups[i + 1];
    nav.innerHTML = (prev ? `<a href="#${prev.id}">← ${prev.name}</a>` : '<span></span>') +
                    (next ? `<a href="#${next.id}">${next.name} →</a>` : '<span></span>');
    g.cards[g.cards.length - 1].appendChild(nav);
  });

  const anchor = document.createElement('div');
  toc.before(anchor);

  const show = (id, scroll) => {
    let g = tabs.find(t => t.id === id);
    if (!g) {                                   // a link to something inside a section
      const el = id && document.getElementById(id);
      g = el ? groups.find(t => t.cards.some(c => c.contains(el))) : null;
    }
    if (!g) g = groups[0];
    document.body.classList.toggle('tabbed', g.id !== 'all');
    after.forEach(c => { c.hidden = g.id !== 'all' && !g.cards.includes(c); });
    links.forEach(a => {
      const on = a.getAttribute('href') === '#' + g.id;
      a.classList.toggle('on', on);
      if (on) ul.scrollLeft = a.offsetLeft - 40;
    });
    if (scroll && window.scrollY > anchor.offsetTop) window.scrollTo({ top: anchor.offsetTop });
  };

  document.addEventListener('click', e => {
    const a = e.target.closest('a[href^="#"]');
    if (!a) return;
    const id = a.getAttribute('href').slice(1);
    if (!tabs.some(t => t.id === id)) return;
    e.preventDefault();
    history.replaceState(null, '', '#' + id);
    show(id, true);
  });
  window.addEventListener('hashchange', () => show(location.hash.slice(1), true));
  show(location.hash.slice(1), false);
}
