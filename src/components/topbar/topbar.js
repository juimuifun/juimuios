// TopBar Component Logic
const TopBar = {
  init() {
    this.timeEl = document.getElementById('topbar-clock');
    this.updatePillEl = document.getElementById('topbar-update-pill');
    this.updateClock();
    setInterval(() => this.updateClock(), 1000);
  },

  updateClock() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    if (this.timeEl) this.timeEl.textContent = `${hours}:${minutes}`;
  },

  showUpdateAvailable(version) {
    if (this.updatePillEl) {
      this.updatePillEl.style.display = 'inline-flex';
      this.updatePillEl.querySelector('.pill-text').textContent = `Update available: v${version}`;
    }
  }
};
