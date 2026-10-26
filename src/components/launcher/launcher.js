// Launcher Component Logic
const Launcher = {
  init() {
    this.overlayEl = document.getElementById('launcher-overlay');
    this.searchInput = document.getElementById('launcher-search');
    this.bindEvents();
  },

  bindEvents() {
    document.querySelectorAll('.launcher-app-item').forEach(app => {
      app.addEventListener('click', () => {
        const action = app.getAttribute('data-app');
        if (action) {
          SystemBridge.executeAction(action);
          this.close();
        }
      });
    });

    // Close on escape or clicking outside
    this.overlayEl?.addEventListener('click', (e) => {
      if (e.target === this.overlayEl) this.close();
    });
  },

  toggle() {
    if (!this.overlayEl) return;
    const isActive = this.overlayEl.classList.contains('active');
    if (isActive) {
      this.close();
    } else {
      this.open();
    }
  },

  open() {
    if (this.overlayEl) {
      this.overlayEl.classList.add('active');
      setTimeout(() => this.searchInput?.focus(), 100);
    }
  },

  close() {
    if (this.overlayEl) {
      this.overlayEl.classList.remove('active');
      if (this.searchInput) this.searchInput.value = '';
    }
  }
};
