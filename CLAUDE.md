# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a browser extension (Chrome/Firefox, Manifest V3) called **FAB TCG Decklist Fabrary Exporter** that adds an "Export to Fabrary" button to Flesh and Blood TCG decklist pages on fabtcg.com. The extension extracts card data from decklist pages and generates a Fabrary import URL.

## Architecture

The extension consists of a single content script that runs on `https://fabtcg.com/decklists/*` pages.

### Content Script Flow (content.js)

1. **Page Detection**: `hasDecklist()` verifies the page contains at least 10 cards before showing the button
2. **Button Injection**: `injectExportButton()` creates and positions the export button on the page
3. **Card Extraction**: `extractCards()` uses multiple strategies to find cards:
   - First tries common CSS selectors for card elements
   - Falls back to regex pattern matching for card IDs (format: `[A-Z]{3}\d{3}(-[A-Z]+)?`)
   - Handles quantity parsing from various formats
4. **Metadata Extraction**: `extractDeckMetadata()` attempts to scrape:
   - Player name (from various header selectors)
   - Event name (Battle Hardened, Pro Tour, etc.)
   - Rank/placement (1st, 2nd, etc.)
5. **URL Generation**: `generateFabraryUrl()` constructs the Fabrary import URL with:
   - Base URL: `https://fabrary.net/decks`
   - Query params: `tab=import`, `format=classicconstructed`, `name=<deckName>`, `cards=<cardId>` (repeated)

### Key Implementation Details

- **Card ID Format**: FAB TCG cards use IDs like `HVY047`, `ARC158`, with optional suffix like `EVR001-CF`
- **Robust Extraction**: Multiple fallback strategies for finding cards and metadata since fabtcg.com page structure can vary
- **Minimum Card Threshold**: Requires ≥10 cards to prevent button appearing on list pages (content.js:212)
- **Visual Feedback**: Button changes to green "Exported!" on success, red "Error!" on failure
- **Self-Contained**: All logic in a single IIFE to avoid polluting global scope

## Development

### Loading the Extension

1. Navigate to `chrome://extensions/`
2. Enable "Developer mode" (top-right toggle)
3. Click "Load unpacked"
4. Select this repository directory

After making changes to any file, return to `chrome://extensions/` and click the refresh icon on the extension card.

### Testing

Navigate to a FAB TCG decklist page such as:
- https://fabtcg.com/decklists/michael-feng-viserai-rune-blood-battle-hardened-sydney-2025/
- https://fabtcg.com/decklists/drew-bosco-kayo-underhanded-cheat-ldxp-tacoma-battle-hardened/

The "Export to Fabrary" button should appear. Use browser DevTools (F12) Console tab to debug extraction issues.

### File Structure

- `manifest.json` - Extension configuration (Manifest V3)
- `content.js` - All card extraction and export logic
- `styles.css` - Button styling
- `README.md` - User-facing documentation

### Debugging Card Extraction

If cards aren't extracting correctly from a specific decklist page:

1. Open DevTools Console on the problematic page
2. Inspect the HTML structure to identify how cards are marked up
3. Update selectors in `extractCards()` (content.js:55-62) or card ID extraction logic in `extractCardId()` (content.js:6-48)
4. The extension logs errors to console with `console.error('Error exporting to Fabrary:', error)` (content.js:268)

### Fabrary URL Format

The generated URL follows this pattern:
```
https://fabrary.net/decks?tab=import&format=classicconstructed&name=<deck-name>&cards=<id1>&cards=<id2>&cards=<id3>...
```

Each card ID is added as a separate `cards` query parameter, with duplicates representing quantity.
