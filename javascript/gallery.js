/* Gallery filter + lightbox */
(function () {
  var grid = document.getElementById('galleryGrid');
  if (!grid) return;
  document.querySelectorAll('.gallery-filter').forEach(function (btn) {
    btn.addEventListener('click', function () {
      document.querySelectorAll('.gallery-filter').forEach(function (b) { b.classList.remove('active'); });
      btn.classList.add('active');
      var cat = btn.getAttribute('data-filter');
      grid.querySelectorAll('.gallery-item').forEach(function (item) {
        item.classList.toggle('hidden', cat !== 'all' && item.getAttribute('data-category') !== cat);
      });
    });
  });
  var lightbox = document.getElementById('galleryLightbox');
  if (!lightbox) return;
  var lbImg = lightbox.querySelector('.gallery-lightbox-img');
  var currentIndex = 0;
  function visibleThumbs() {
    return Array.from(grid.querySelectorAll('.gallery-item:not(.hidden) .gallery-thumb'));
  }
  function show(i) {
    var t = visibleThumbs();
    if (i < 0 || i >= t.length) return;
    currentIndex = i;
    lbImg.src = t[i].getAttribute('data-src');
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
  function hide() { lightbox.classList.remove('active'); document.body.style.overflow = ''; lbImg.src = ''; }
  grid.addEventListener('click', function (e) {
    var thumb = e.target.closest('.gallery-thumb');
    if (thumb) show(visibleThumbs().indexOf(thumb));
  });
  lightbox.addEventListener('click', function (e) {
    if (e.target === lightbox || e.target.closest('.gallery-lightbox-close')) hide();
    if (e.target.closest('.gallery-lightbox-prev')) show((currentIndex - 1 + visibleThumbs().length) % visibleThumbs().length);
    if (e.target.closest('.gallery-lightbox-next')) show((currentIndex + 1) % visibleThumbs().length);
  });
})();
