document.addEventListener('DOMContentLoaded', function () {
  const nav = document.querySelector('header nav');
  if (!nav) return;
  const toggle = nav.querySelector('.nav-toggle');
  if (!toggle) return;

  function openMenu() {
    nav.classList.add('open');
    toggle.setAttribute('aria-expanded', 'true');
  }

  function closeMenu() {
    nav.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
  }

  toggle.addEventListener('click', function () {
    nav.classList.contains('open') ? closeMenu() : openMenu();
  });

  nav.querySelectorAll('.nav-links a').forEach(a => a.addEventListener('click', closeMenu));

  document.addEventListener('click', (e) => {
    if (nav.classList.contains('open') && !nav.contains(e.target)) closeMenu();
  });
});
