# JuimuiOS (Ubuntu Base)

Custom Modular Operating System UI Shell powered by **Ubuntu Linux** with **Background OTA Auto-Updates**.

## Modular Architecture (`src/`)

```
D:\projects\juimuios\
├── src/
│   ├── components/                 # Individual Isolated Components
│   │   ├── topbar/                 # Status bar, Realtime clock & update pill
│   │   ├── dock/                   # Bottom floating glassmorphism dock
│   │   ├── launcher/               # App Drawer / Searchable Grid
│   │   ├── control-center/         # Quick settings (Wi-Fi, Audio, Brightness)
│   │   ├── updater/                # OTA update dialog & progress installer
│   │   └── lockscreen/             # Authentication & Lock view
│   │
│   ├── styles/
│   │   ├── tokens.css              # Color tokens, glass tints, variables
│   │   └── animations.css          # Fluid animations & keyframes
│   │
│   ├── bridge/
│   │   └── system.js               # IPC bridge connecting UI to Ubuntu commands
│   │
│   └── index.html                  # Master View integrating all components
│
├── scripts/
│   ├── setup-ubuntu.sh             # One-click Ubuntu dependencies & daemon installer
│   ├── daemon-update-agent.sh      # Background cron: checks GitHub & downloads updates
│   └── apply-update.sh             # Swaps in latest code & reloads
│
└── version.json                    # System release & version tracker
```

## Features

- **Isolated Components**: Every module has its own HTML, CSS, and JS file.
- **Background OTA Updater**: Checks `github.com/juimuifun/juimuios.git` quietly in the background without disturbing the user.
- **Dual Update Options**:
  - Click **"Update & Restart Now"** to patch and reboot immediately.
  - Or click **"Update on Restart"** to let the system apply the patch when you shut down or reboot.
- **Ubuntu Security & Windowing**: Native Ubuntu PAM password validation and window management.
