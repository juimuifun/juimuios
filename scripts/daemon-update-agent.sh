#!/bin/bash
# ==============================================================================
# JuimuiOS - Background OTA Update Checker & Downloader
# ==============================================================================

REPO_URL="https://github.com/juimuifun/juimuios.git"
CACHE_DIR="/var/cache/juimuios-update"
STATUS_FILE="/tmp/juimuios-update.json"

mkdir -p "$CACHE_DIR"

check_updates() {
    # Check internet
    if ! ping -c 1 -W 1 github.com &>/dev/null; then
        return
    fi

    # Clone or fetch in cache directory
    if [ ! -d "$CACHE_DIR/.git" ]; then
        git clone "$REPO_URL" "$CACHE_DIR"
    else
        cd "$CACHE_DIR" && git fetch origin main
    fi

    cd "$CACHE_DIR"
    LOCAL_HASH=$(cd /opt/juimuios && git rev-parse HEAD 2>/dev/null || echo "0")
    REMOTE_HASH=$(git rev-parse origin/main 2>/dev/null || echo "0")

    if [ "$LOCAL_HASH" != "$REMOTE_HASH" ] && [ "$REMOTE_HASH" != "0" ]; then
        # Fetch remote version
        git checkout origin/main version.json 2>/dev/null || true
        REMOTE_VERSION=$(grep -oP '"version":\s*"\K[^"]+' version.json 2>/dev/null || echo "1.1.0")

        cat << EOF > "$STATUS_FILE"
{
  "hasUpdate": true,
  "newVersion": "$REMOTE_VERSION",
  "hash": "$REMOTE_HASH"
}
EOF
    else
        cat << EOF > "$STATUS_FILE"
{
  "hasUpdate": false
}
EOF
    fi
}

check_updates
