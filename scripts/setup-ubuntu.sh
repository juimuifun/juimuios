#!/bin/bash
# ==============================================================================
# JuimuiOS - Complete Ubuntu Setup Script
# Installs WebKitGTK / Cage / Brave, enables NumLock, and hooks background updates
# ==============================================================================

set -e

echo "=== [JuimuiOS] Setting up Ubuntu Base ==="

# 1. Update APT and install dependencies
sudo apt update
sudo apt install -y \
    curl \
    git \
    numlockx \
    cage \
    chromium-browser \
    xdotool \
    libpam0g-dev

# 2. Setup NumLock Auto-Enable on boot
sudo sed -i 's|^exit 0|/usr/bin/numlockx on\nexit 0|' /etc/rc.local 2>/dev/null || true

# 3. Setup Project location
INSTALL_DIR="/opt/juimuios"
sudo mkdir -p "$INSTALL_DIR"
sudo chown -R $USER:$USER "$INSTALL_DIR"

# 4. Configure Background Update Cron
(crontab -l 2>/dev/null; echo "0 * * * * /opt/juimuios/scripts/daemon-update-agent.sh >/dev/null 2>&1") | crontab -

# 5. Check update on shutdown hook
cat << 'EOF' | sudo tee /etc/systemd/system/juimuios-shutdown-update.service
[Unit]
Description=Apply JuimuiOS updates on reboot/shutdown
DefaultDependencies=no
Before=shutdown.target reboot.target

[Service]
Type=oneshot
ExecStart=/bin/bash -c "if [ -f /tmp/juimuios-update-on-reboot ]; then /opt/juimuios/scripts/apply-update.sh; fi"

[Install]
WantedBy=halt.target reboot.target shutdown.target
EOF

sudo systemctl daemon-reload
sudo systemctl enable juimuios-shutdown-update.service

echo "=== [JuimuiOS] Ubuntu Setup Complete! ==="
