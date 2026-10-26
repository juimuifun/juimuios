// LockScreen Component Logic
const LockScreen = {
  init() {
    this.overlayEl = document.getElementById('lockscreen-overlay');
    this.pinInput = document.getElementById('lock-pass-input');
    this.cardEl = document.querySelector('.lock-card');
    this.clockEl = document.getElementById('lock-clock-text');
    this.dateEl = document.getElementById('lock-date-text');

    this.updateClock();
    setInterval(() => this.updateClock(), 1000);

    this.bindEvents();
  },

  updateClock() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    if (this.clockEl) this.clockEl.textContent = `${hours}:${minutes}`;
    if (this.dateEl) {
      const options = { weekday: 'long', month: 'long', day: 'numeric' };
      this.dateEl.textContent = now.toLocaleDateString('en-US', options);
    }
  },

  bindEvents() {
    this.pinInput?.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') this.unlock();
    });

    document.getElementById('lock-submit-btn')?.addEventListener('click', () => {
      this.unlock();
    });
  },

  async unlock() {
    const entered = this.pinInput ? this.pinInput.value : '';
    // Call SystemBridge to verify password against Ubuntu PAM
    const ok = await SystemBridge.verifyAuth(entered);
    if (ok) {
      this.overlayEl?.classList.add('unlocked');
      if (this.pinInput) this.pinInput.value = '';
    } else {
      this.cardEl?.classList.add('shake');
      if (this.pinInput) this.pinInput.value = '';
      setTimeout(() => this.cardEl?.classList.remove('shake'), 400);
    }
  },

  lock() {
    this.overlayEl?.classList.remove('unlocked');
    setTimeout(() => this.pinInput?.focus(), 200);
  }
};
