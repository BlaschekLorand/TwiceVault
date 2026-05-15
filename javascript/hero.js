(function () {
  var inner = document.getElementById('heroSlides');
  var indicators = document.querySelector('#heroCarousel .carousel-indicators');
  var carousel = document.getElementById('heroCarousel');

  if (!inner || !indicators || !carousel) return;

  var slides = [
    { file: 'twice-3840x2160-32219.jpg', alt: 'TWICE group promotional photo' },
    { file: 'twice-4429x2609-32215.jpg', alt: 'TWICE group stage photo' },
    { file: 'twice-5120x2880-32228.jpg', alt: 'TWICE concept photo' },
    { file: 'twice-k-pop-3840x2160-32225.jpg', alt: 'TWICE K-pop concept image' }
  ];

  function buildSlides() {
    slides.forEach(function (slideData, i) {
      var slide = document.createElement('div');
      var dot = document.createElement('button');
      var eager = i === 0 ? 'eager' : 'lazy';

      slide.className = 'carousel-item' + (i === 0 ? ' active' : '');
      slide.innerHTML = '<img ' + (i === 0 ? 'src' : 'data-src') + '="img/hero/fixed/' + slideData.file + '" class="d-block w-100 hero-carousel-img" alt="' + slideData.alt + '" loading="' + eager + '">';
      inner.appendChild(slide);

      dot.type = 'button';
      dot.setAttribute('data-bs-target', '#heroCarousel');
      dot.setAttribute('data-bs-slide-to', i);
      dot.setAttribute('aria-label', 'Slide ' + (i + 1));

      if (i === 0) {
        dot.className = 'active';
        dot.setAttribute('aria-current', 'true');
      }

      indicators.appendChild(dot);
    });
  }

  // Toggle play/pause button state.
  function setupPauseButton() {
    var pauseBtn = document.querySelector('.carousel-pause-btn');
    if (!pauseBtn || !window.bootstrap || !bootstrap.Carousel) return;

    pauseBtn.addEventListener('click', function () {
      var carouselInstance = bootstrap.Carousel.getOrCreateInstance(carousel);
      var paused = pauseBtn.dataset.paused === 'true';

      if (paused) {
        carouselInstance.cycle();
        pauseBtn.dataset.paused = 'false';
        pauseBtn.setAttribute('aria-label', 'Pause carousel');
        pauseBtn.innerHTML = '<i class="bi bi-pause-fill"></i>';
        return;
      }

      carouselInstance.pause();
      pauseBtn.dataset.paused = 'true';
      pauseBtn.setAttribute('aria-label', 'Play carousel');
      pauseBtn.innerHTML = '<i class="bi bi-play-fill"></i>';
    });
  }

  // Load the next image only when needed.
  function setupLazyLoadOnSlide() {
    carousel.addEventListener('slide.bs.carousel', function (e) {
      var next = inner.querySelectorAll('.carousel-item')[e.to];
      if (!next) return;

      var img = next.querySelector('img[data-src]');
      if (!img) return;

      img.src = img.getAttribute('data-src');
      img.removeAttribute('data-src');
    });
  }

  buildSlides();
  setupPauseButton();
  setupLazyLoadOnSlide();
})();
