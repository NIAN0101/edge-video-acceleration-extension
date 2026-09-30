const speedButtons = [...document.querySelectorAll('.speed-btn')];
const customSpeedInput = document.getElementById('custom-speed');
const toggleBtn = document.getElementById('toggle-btn');
const speedDisplay = document.getElementById('speed-display');
const statusText = document.getElementById('status-text');

let currentSpeed = 1.5;
let enabled = true;

function updateStatus() {
  speedDisplay.textContent = `${currentSpeed.toFixed(1)}x`;
  customSpeedInput.value = currentSpeed;

  speedButtons.forEach((btn) => {
    const btnSpeed = Number(btn.dataset.speed);
    btn.classList.toggle('active', Math.abs(btnSpeed - currentSpeed) < 0.1);
  });

  statusText.textContent = `${enabled ? '已开启' : '已关闭'} • ${currentSpeed.toFixed(1)}x`;
}

function saveSettings() {
  chrome.runtime.sendMessage({
    type: 'saveSettings',
    speed: currentSpeed,
    enabled
  });
}

speedButtons.forEach((btn) => {
  btn.addEventListener('click', () => {
    currentSpeed = Number(btn.dataset.speed);
    updateStatus();
    saveSettings();
  });
});

customSpeedInput.addEventListener('input', () => {
  currentSpeed = Number(customSpeedInput.value);
  updateStatus();
  saveSettings();
});

toggleBtn.addEventListener('click', () => {
  enabled = !enabled;
  toggleBtn.classList.toggle('enabled', enabled);
  toggleBtn.textContent = enabled ? '关闭' : '开启';
  statusText.textContent = `${enabled ? '已开启' : '已关闭'} • ${currentSpeed.toFixed(1)}x`;
  saveSettings();
});

chrome.runtime.sendMessage({ type: 'getSettings' }, (res) => {
  if (!res) return;
  currentSpeed = Number(res.speed || 1.5);
  enabled = res.enabled !== false;
  toggleBtn.classList.toggle('enabled', enabled);
  toggleBtn.textContent = enabled ? '关闭' : '开启';
  updateStatus();
});