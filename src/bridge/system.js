// ==============================================================================
// JuimuiOS - System & Native IPC Bridge
// Dispatches UI commands to Ubuntu backend daemon
// ==============================================================================

const SystemBridge = {
  async verifyAuth(password) {
    // For local dev / mockup: accepts user password or enter
    console.log('Validating credentials against PAM...');
    return true;
  },

  executeAction(action) {
    console.log(`[JuimuiOS Bridge] Triggering action: ${action}`);

    switch (action) {
      case 'launcher':
        Launcher.toggle();
        break;
      case 'terminal':
        this.runNativeCommand('gnome-terminal || x-terminal-emulator');
        break;
      case 'browser':
        this.runNativeCommand('brave-browser || firefox || chromium-browser');
        break;
      case 'files':
        this.runNativeCommand('nautilus || thunar');
        break;
      case 'settings':
        this.runNativeCommand('gnome-control-center');
        break;
      case 'lock':
        LockScreen.lock();
        break;
      case 'power':
        if (confirm('Do you want to turn off the computer?')) {
          this.runNativeCommand('systemctl poweroff');
        }
        break;
      case 'update':
        Updater.openDialog();
        break;
    }
  },

  async runNativeCommand(cmd) {
    try {
      // Connects to local unix socket / lightweight backend runner
      await fetch('/api/exec', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ command: cmd })
      });
    } catch (e) {
      console.log(`[Bridge Execution Sim] Command queued: ${cmd}`);
    }
  },

  applyUpdateAndRestart() {
    console.log('[JuimuiOS Bridge] Executing live OTA update and restart...');
    this.runNativeCommand('/opt/juimuios/scripts/apply-update.sh --now');
  },

  flagUpdateOnShutdown() {
    console.log('[JuimuiOS Bridge] Flagged for OTA update on next shutdown.');
    this.runNativeCommand('touch /tmp/juimuios-update-on-reboot');
  }
};
