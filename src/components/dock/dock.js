// Dock Component Logic
const Dock = {
  init() {
    this.bindClicks();
  },

  bindClicks() {
    document.querySelectorAll('.dock-item').forEach(item => {
      item.addEventListener('click', (e) => {
        const action = item.getAttribute('data-action');
        if (action) SystemBridge.executeAction(action);
      });
    });
  },

  setAppRunning(action, isRunning) {
    const item = document.querySelector(`.dock-item[data-action="${action}"] .dock-item-badge`);
    if (item) item.style.display = isRunning ? 'block' : 'none';
  }
};
