// Tabs: show one panel at a time on the home page, driven by the URL hash
// (#home, #projects, #education). Without JavaScript, all panels simply show.
const panels = document.querySelectorAll('.panel');
if (panels.length) {
  document.documentElement.classList.add('js');
  const show = () => {
    const id = (location.hash || '#home').slice(1);
    const target = document.getElementById(id) || document.getElementById('home');
    panels.forEach(p => p.classList.toggle('active', p === target));
    document.querySelectorAll('.tabs a').forEach(a =>
      a.classList.toggle('active', a.getAttribute('href').endsWith('#' + target.id)));
  };
  window.addEventListener('hashchange', () => { show(); window.scrollTo(0, 0); });
  show();
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

// Footer year
document.querySelectorAll('[data-year]').forEach(el => (el.textContent = new Date().getFullYear()));
