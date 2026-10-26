// Control Center Component Logic
const ControlCenter = {
  init() {
    this.panelEl = document.getElementById('control-center-panel');
    this.bindEvents();
  },

  bindEvents() {
    document.getElementById('topbar-control-btn')?.addEventListener('click', (e) => {
      e.stopPropagation();
      this.toggle();
    });

    // Close on click outside
    document.addEventListener('click', (e) => {
      if (this.panelEl?.classList.contains('active') && !this.panelEl.contains(e.target)) {
        this.close();
      }
    });
  },

  toggle() {
    if (this.panelEl) this.panelEl.classList.toggle('active');
  },

  close() {
    if (this.panelEl) this.panelEl.classList.remove('active');
  }
};
