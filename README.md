# FAB TCG Fabrary Export Chrome Extension

A Chrome extension that adds an "Export to Fabrary" button to FAB TCG decklist pages, allowing you to quickly import decklists into Fabrary.

## Features

- Automatically detects FAB TCG decklist pages
- Adds an easy-to-use "Export to Fabrary" button
- Extracts all cards from the decklist (including quantities)
- Captures player name, event, and rank information
- Generates a properly formatted Fabrary import URL
- Opens the import in a new tab with one click

## Installation

### Installing from Source (Developer Mode)

1. Download or clone this repository to your local machine

2. Open Google Chrome and navigate to `chrome://extensions/`

3. Enable "Developer mode" by toggling the switch in the top-right corner

4. Click "Load unpacked" button

5. Select the folder containing the extension files (the folder with `manifest.json`)

6. The extension should now be installed and active!

## Usage

1. Navigate to any FAB TCG decklist page (e.g., `https://fabtcg.com/decklists/...`)

2. Look for the blue "Export to Fabrary" button (it will appear near the top of the page)

3. Click the button

4. A new tab will open with the decklist pre-loaded in Fabrary's import interface

5. The deck name will be automatically formatted as: `Player Name - Event - Rank` (if this information is available on the page)

## Example URLs

The extension works on pages like:
- https://fabtcg.com/decklists/michael-feng-viserai-rune-blood-battle-hardened-sydney-2025/
- https://fabtcg.com/decklists/drew-bosco-kayo-underhanded-cheat-ldxp-tacoma-battle-hardened/

## How It Works

The extension:
1. Scans the decklist page for card identifiers (e.g., HVY047, ARC158)
2. Extracts quantities for each card
3. Gathers metadata (player name, event, ranking)
4. Constructs a Fabrary import URL with all cards and deck name
5. Opens the URL in a new tab for easy import

## Troubleshooting

**Button doesn't appear:**
- Make sure you're on a fabtcg.com decklist page
- Try refreshing the page
- Check that the extension is enabled in `chrome://extensions/`

**Cards not exporting correctly:**
- The page structure may have changed. Please report the issue with the specific URL
- Check the browser console for error messages (F12 → Console tab)

**Deck name is wrong or missing:**
- The extension tries to extract player name, event, and rank from the page
- If this information isn't clearly marked on the page, it may not be captured
- You can edit the deck name after importing in Fabrary

## Files

- `manifest.json` - Extension configuration
- `content.js` - Main logic for extracting cards and generating URLs
- `styles.css` - Button styling
- `README.md` - This file

## Note on Icons

The manifest references icon files (`icon16.png`, `icon48.png`, `icon128.png`) which are optional. The extension will work without them, but you can add your own icons if desired.

## License

This is a community tool created for FAB TCG players. Use freely!

## Contributing

Found a bug or want to improve the extension? Feel free to submit issues or pull requests!
