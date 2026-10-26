// Updater Component Logic
const Updater = {
  currentVersion: '1.0.0',
  availableVersion: null,
  updatePending: false,

  init() {
    this.modalEl = document.getElementById('updater-modal');
    this.checkUpdate();
    // Poll for updates every 10 minutes
    setInterval(() => this.checkUpdate(), 10 * 60 * 1000);
  },

  async checkUpdate() {
    try {
      // 1. Fetch current local version
      const localRes = await fetch('../version.json');
      if (localRes.ok) {
        const localData = await localRes.json();
        this.currentVersion = localData.version;
      }

      // 2. Query system background update agent status
      const statusRes = await fetch('/tmp/juimuios-update.json');
      if (statusRes.ok) {
        const status = await statusRes.json();
        if (status.hasUpdate && status.newVersion !== this.currentVersion) {
          this.availableVersion = status.newVersion;
          this.updatePending = true;
          TopBar.showUpdateAvailable(this.availableVersion);
        }
      }
    } catch (e) {
      // Offline or agent not ready yet
    }
  },

  openDialog() {
    if (!this.modalEl) return;
    document.getElementById('new-version-text').textContent = `v${this.availableVersion || '1.1.0'}`;
    this.modalEl.classList.add('active');
  },

  closeDialog() {
    if (this.modalEl) this.modalEl.classList.remove('active');
  },

  installNow() {
    const pBar = document.querySelector('.updater-progress-bar-container');
    const fill = document.querySelector('.updater-progress-bar');
    const btn = document.querySelector('.btn-update-primary');

    if (pBar) pBar.style.display = 'block';
    if (btn) btn.disabled = true;

    let progress = 10;
    const interval = setInterval(() => {
      progress += 20;
      if (fill) fill.style.width = `${progress}%`;

      if (progress >= 100) {
        clearInterval(interval);
        // Request bridge to apply patch and reload
        SystemBridge.applyUpdateAndRestart();
      }
    }, 400);
  },

  installOnReboot() {
    this.closeDialog();
    // Mark update flag to apply when system powers off
    SystemBridge.flagUpdateOnShutdown();
  }
};
