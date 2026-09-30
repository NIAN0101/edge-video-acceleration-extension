// Background Service Worker
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'getSettings') {
    chrome.storage.local.get(['speed', 'enabled'], (data) => {
      sendResponse({
        speed: data.speed || 1.5,
        enabled: data.enabled !== false
      });
    });
    return true;
  }
  
  if (request.action === 'saveSettings') {
    chrome.storage.local.set({
      speed: request.speed,
      enabled: request.enabled
    }, () => {
      sendResponse({ success: true });
    });
    return true;
  }
});
