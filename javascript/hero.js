(function () {
  var inner = document.getElementById('heroSlides');
  var indicators = document.querySelector('#heroCarousel .carousel-indicators');
  if (!inner) return;
  var slides = [
    { file: 'twice-3840x2160-32219.jpg', alt: 'TWICE group promotional photo' },
    { file: 'twice-4429x2609-32215.jpg', alt: 'TWICE group stage photo' },
    { file: 'twice-5120x2880-32228.jpg', alt: 'TWICE concept photo' },
    { file: 'twice-k-pop-3840x2160-32225.jpg', alt: 'TWICE K-pop concept image' }
  ];
  slides.forEach(function (slideData, i) {
    var slide = document.createElement('div');
    slide.className = 'carousel-item' + (i === 0 ? ' active' : '');
    var eager = i === 0 ? 'eager' : 'lazy';
    slide.innerHTML = '<img ' + (i === 0 ? 'src' : 'data-src') + '="img/hero/fixed/' + slideData.file + '" class="d-block w-100 hero-carousel-img" alt="' + slideData.alt + '" loading="' + eager + '">';
    inner.appendChild(slide);
    var dot = document.createElement('button');
    dot.type = 'button';
    dot.setAttribute('data-bs-target', '#heroCarousel');
    dot.setAttribute('data-bs-slide-to', i);
    dot.setAttribute('aria-label', 'Slide ' + (i + 1));
    if (i === 0) { dot.className = 'active'; dot.setAttribute('aria-current', 'true'); }
    indicators.appendChild(dot);
  });

  // Load next slide image just before it becomes active
  var carousel = document.getElementById('heroCarousel');
  if (carousel) {
    var pauseBtn = document.querySelector('.carousel-pause-btn');

    if (pauseBtn && window.bootstrap && bootstrap.Carousel) {
      pauseBtn.addEventListener('click', function () {
        var c = bootstrap.Carousel.getOrCreateInstance(carousel);
        var paused = pauseBtn.dataset.paused === 'true';

        if (paused) {
          c.cycle();
          pauseBtn.dataset.paused = 'false';
          pauseBtn.setAttribute('aria-label', 'Pause carousel');
          pauseBtn.innerHTML = '<i class="bi bi-pause-fill"></i>';
          return;
        }

        c.pause();
        pauseBtn.dataset.paused = 'true';
        pauseBtn.setAttribute('aria-label', 'Play carousel');
        pauseBtn.innerHTML = '<i class="bi bi-play-fill"></i>';
      });
    }

    carousel.addEventListener('slide.bs.carousel', function (e) {
      var next = inner.querySelectorAll('.carousel-item')[e.to];
      if (!next) return;
      var img = next.querySelector('img[data-src]');
      if (img) { img.src = img.getAttribute('data-src'); img.removeAttribute('data-src'); }
    });
  }
})();
