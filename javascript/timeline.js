(function () {
  // Setup
  var wrapper = document.querySelector('.timeline-wrapper');
  if (!wrapper) return;

  var items = Array.prototype.slice.call(wrapper.querySelectorAll('.timeline-item'));
  if (!items.length) return;

  var queue = [];
  var processing = false;
  var scheduled = false;

  // Window
  var WINDOW = {
    REVEAL_BEFORE: 80,
    REVEAL_AFTER: 180,
    PRELOAD_BEFORE: 300,
    PRELOAD_AFTER: 1200,
    KEEP_BEFORE: 900,
    KEEP_AFTER: 1600
  };

  var LOAD_DELAY = 60;

  function getRelativeRect(item) {
    var wrapperRect = wrapper.getBoundingClientRect();
    var itemRect = item.getBoundingClientRect();

    return {
      top: itemRect.top - wrapperRect.top,
      bottom: itemRect.bottom - wrapperRect.top
    };
  }

  // Visibility
  function isInsideWindow(item, before, after) {
    var rect = getRelativeRect(item);
    return rect.bottom >= -before && rect.top <= wrapper.clientHeight + after;
  }

  // Load
  function loadItem(item) {
    var iframe = item.querySelector('iframe[data-src]');
    if (!iframe) return;

    iframe.src = iframe.getAttribute('data-src');
    iframe.removeAttribute('data-src');

    var h3 = item.querySelector('h3');
    if (h3) iframe.title = h3.textContent + ' – Spotify player';
  }

  // Unload
  function unloadItem(item) {
    var iframe = item.querySelector('iframe[src]');
    if (!iframe) return;

    iframe.setAttribute('data-src', iframe.src);
    iframe.removeAttribute('src');
    item.removeAttribute('data-queued');
  }

  // Queue
  function processQueue() {
    if (!queue.length) {
      processing = false;
      return;
    }

    processing = true;
    var item = queue.shift();
    item.removeAttribute('data-queued');

    if (isInsideWindow(item, WINDOW.PRELOAD_BEFORE, WINDOW.PRELOAD_AFTER)) {
      loadItem(item);
    }

    setTimeout(processQueue, LOAD_DELAY);
  }

  function queueItem(item) {
    if (item.getAttribute('data-queued') === 'true') return;
    if (item.querySelector('iframe[src]')) return;

    item.setAttribute('data-queued', 'true');
    queue.push(item);

    if (!processing) processQueue();
  }

  function updateTimeline() {
    items.forEach(function (item) {
      if (isInsideWindow(item, WINDOW.REVEAL_BEFORE, WINDOW.REVEAL_AFTER)) {
        item.classList.add('visible');
      }

      if (isInsideWindow(item, WINDOW.PRELOAD_BEFORE, WINDOW.PRELOAD_AFTER)) {
        queueItem(item);
        return;
      }

      if (!isInsideWindow(item, WINDOW.KEEP_BEFORE, WINDOW.KEEP_AFTER)) {
        unloadItem(item);
      }
    });
  }

  function scheduleUpdate() {
    if (scheduled) return;

    scheduled = true;
    requestAnimationFrame(function () {
      scheduled = false;
      updateTimeline();
    });
  }

  wrapper.addEventListener('scroll', scheduleUpdate, { passive: true });
  window.addEventListener('resize', scheduleUpdate);

  updateTimeline();
})();
