(() => {
  const state = {
    enabled: true,
    speed: 1.5,
    initialized: false,
    boundVideos: new WeakSet()
  };

  function loadSettings() {
    return new Promise((resolve) => {
      chrome.runtime.sendMessage({ type: 'getSettings' }, (res) => {
        if (res) {
          state.enabled = res.enabled !== false;
          state.speed = Number(res.speed || 1.5);
        }
        resolve();
      });
    });
  }

  function forceApplySpeed(video) {
    if (!(video instanceof HTMLMediaElement)) return;

    try {
      const target = state.enabled ? Number(state.speed || 1) : 1;
      video.playbackRate = target;
    } catch (e) {
      // 忽略错误
    }
  }

  function attachVideo(video) {
    if (!video || state.boundVideos.has(video)) return;
    state.boundVideos.add(video);

    const events = ['play', 'playing', 'ratechange', 'loadeddata', 'seeked', 'timeupdate'];
    events.forEach(event => {
      video.addEventListener(event, () => forceApplySpeed(video), { passive: true });
    });

    setInterval(() => {
      if (state.boundVideos.has(video)) {
        forceApplySpeed(video);
      }
    }, 300);

    forceApplySpeed(video);
  }

  function scanVideos() {
    document.querySelectorAll('video').forEach(video => attachVideo(video));
  }

  function listenForSettings() {
    chrome.runtime.onMessage.addListener((message) => {
      if (message && message.type === 'saveSettings') {
        state.enabled = message.enabled !== false;
        state.speed = Number(message.speed || 1.5);
        scanVideos();
      }
    });
  }

  function init() {
    if (state.initialized) return;
    state.initialized = true;

    loadSettings().then(() => {
      scanVideos();
      listenForSettings();

      const observer = new MutationObserver(() => scanVideos());
      observer.observe(document.documentElement, {
        childList: true,
        subtree: true
      });

      setInterval(() => {
        scanVideos();
      }, 1000);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init, { once: true });
  } else {
    init();
  }
})();