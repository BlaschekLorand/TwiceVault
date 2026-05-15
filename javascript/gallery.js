(function () {
  var grid = document.getElementById('galleryGrid');
  if (!grid) return;

  var THUMB_MAX_WIDTH = 640;
  var THUMB_QUALITY = 0.76;

  // Build smaller in-memory thumbnails for faster scrolling.
  function createClientThumbnail(img) {
    if (img.getAttribute('data-thumb-ready') === 'true') return;
    if (!img.naturalWidth || !img.naturalHeight) return;

    var targetWidth = Math.min(THUMB_MAX_WIDTH, img.naturalWidth);
    var scale = targetWidth / img.naturalWidth;
    var targetHeight = Math.max(1, Math.round(img.naturalHeight * scale));

    if (targetWidth === img.naturalWidth) {
      img.setAttribute('data-thumb-ready', 'true');
      return;
    }

    var canvas = document.createElement('canvas');
    canvas.width = targetWidth;
    canvas.height = targetHeight;

    var ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) {
      img.setAttribute('data-thumb-ready', 'true');
      return;
    }

    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';
    ctx.drawImage(img, 0, 0, targetWidth, targetHeight);

    var thumbSrc;
    try {
      thumbSrc = canvas.toDataURL('image/webp', THUMB_QUALITY);
      if (!thumbSrc || thumbSrc.indexOf('data:image/webp') !== 0) {
        thumbSrc = canvas.toDataURL('image/jpeg', THUMB_QUALITY);
      }
    } catch (e) {
      return;
    }

    img.src = thumbSrc;
    img.setAttribute('data-thumb-ready', 'true');
  }

  function prepareThumbnail(img) {
    if (img.complete && img.naturalWidth) {
      createClientThumbnail(img);
      return;
    }

    img.addEventListener('load', function onLoad() {
      img.removeEventListener('load', onLoad);
      createClientThumbnail(img);
    });
  }

  function setupFilters() {
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
  }

  // Lightbox state.
  var lightbox = document.getElementById('galleryLightbox');
  var lbImg = lightbox ? lightbox.querySelector('.gallery-lightbox-img') : null;
  var currentIndex = 0;

  function visibleThumbs() {
    return Array.from(grid.querySelectorAll('.gallery-item:not(.hidden) .gallery-thumb'));
  }

  function show(i) {
    var t = visibleThumbs();
    if (i < 0 || i >= t.length) return;
    currentIndex = i;
    lbImg.src = t[i].getAttribute('data-src');
    var thumbImg = t[i].querySelector('img');
    lbImg.alt = thumbImg ? thumbImg.alt : 'Expanded gallery image';
    lightbox.classList.add('active');
    document.body.classList.add('lightbox-open');
  }

  function hide() {
    lightbox.classList.remove('active');
    document.body.classList.remove('lightbox-open');
    lbImg.src = '';
    lbImg.alt = '';
  }

  function setupLightbox() {
    if (!lightbox || !lbImg) return;

    grid.addEventListener('click', function (e) {
      var thumb = e.target.closest('.gallery-thumb');
      if (thumb) show(visibleThumbs().indexOf(thumb));
    });

    lightbox.addEventListener('click', function (e) {
      if (e.target === lightbox || e.target.closest('.gallery-lightbox-close')) hide();
      if (e.target.closest('.gallery-lightbox-prev')) {
        show((currentIndex - 1 + visibleThumbs().length) % visibleThumbs().length);
      }
      if (e.target.closest('.gallery-lightbox-next')) {
        show((currentIndex + 1) % visibleThumbs().length);
      }
    });
  }

  grid.querySelectorAll('.gallery-thumb img').forEach(prepareThumbnail);
  setupFilters();
  setupLightbox();
})();
