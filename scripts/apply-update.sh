#!/bin/bash
# ==============================================================================
# JuimuiOS - Apply OTA Update
# ==============================================================================

TARGET_DIR="/opt/juimuios"
CACHE_DIR="/var/cache/juimuios-update"

if [ -d "$CACHE_DIR/.git" ]; then
    echo ">>> Applying new JuimuiOS updates..."
    cd "$TARGET_DIR"
    git fetch origin main
    git reset --hard origin/main
    systemctl restart juimuios-shell.service 2>/dev/null || true
    rm -f /tmp/juimuios-update.json
    rm -f /tmp/juimuios-update-on-reboot
    echo ">>> Update applied successfully!"
fi

if [ "$1" == "--now" ]; then
    reboot
fi
