/* Timeline: animate items + fast nearby preload + unload embeds far off-screen */
(function () {
  var wrapper = document.querySelector('.timeline-wrapper');
  if (!wrapper) return;

  var items = Array.prototype.slice.call(wrapper.querySelectorAll('.timeline-item'));
  if (!items.length) return;

  var queue = [];
  var processing = false;
  var scheduled = false;

  var REVEAL_BEFORE = 80;
  var REVEAL_AFTER = 180;
  var PRELOAD_BEFORE = 300;
  var PRELOAD_AFTER = 1200;
  var KEEP_BEFORE = 900;
  var KEEP_AFTER = 1600;
  var LOAD_DELAY = 60;

  function getRelativeRect(item) {
    var wrapperRect = wrapper.getBoundingClientRect();
    var itemRect = item.getBoundingClientRect();

    return {
      top: itemRect.top - wrapperRect.top,
      bottom: itemRect.bottom - wrapperRect.top
    };
  }

  function isInsideWindow(item, before, after) {
    var rect = getRelativeRect(item);
    return rect.bottom >= -before && rect.top <= wrapper.clientHeight + after;
  }

  function loadItem(item) {
    var iframe = item.querySelector('iframe[data-src]');
    if (!iframe) return;

    iframe.src = iframe.getAttribute('data-src');
    iframe.removeAttribute('data-src');

    var h3 = item.querySelector('h3');
    if (h3) iframe.title = h3.textContent + ' – Spotify player';
  }

  function unloadItem(item) {
    var iframe = item.querySelector('iframe[src]');
    if (!iframe) return;

    iframe.setAttribute('data-src', iframe.src);
    iframe.removeAttribute('src');
    item.removeAttribute('data-queued');
  }

  function processQueue() {
    if (!queue.length) {
      processing = false;
      return;
    }

    processing = true;
    var item = queue.shift();
    item.removeAttribute('data-queued');

    if (isInsideWindow(item, PRELOAD_BEFORE, PRELOAD_AFTER)) {
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
      if (isInsideWindow(item, REVEAL_BEFORE, REVEAL_AFTER)) {
        item.classList.add('visible');
      }

      if (isInsideWindow(item, PRELOAD_BEFORE, PRELOAD_AFTER)) {
        queueItem(item);
        return;
      }

      if (!isInsideWindow(item, KEEP_BEFORE, KEEP_AFTER)) {
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
