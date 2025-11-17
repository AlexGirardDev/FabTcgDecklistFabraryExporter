# Firefox Add-ons (AMO) Listing

## Add-on Details

### Name
FAB TCG Decklist Fabrary Exporter

### Summary (250 characters max)
Export Flesh and Blood TCG decklists from fabtcg.com to Fabrary with one click. Automatically extracts cards, quantities, and deck info for instant import.

### Description (Full)

Export Flesh and Blood TCG decklists from fabtcg.com to Fabrary instantly with one click!

**What it does:**
This extension adds an "Export to Fabrary" button to any decklist page on fabtcg.com. When you click it, the extension automatically extracts all cards (with quantities) and opens Fabrary's deck builder with your decklist pre-loaded and ready to save.

**Key Features:**
• One-click export to Fabrary
• Automatically extracts card IDs and quantities
• Captures deck metadata (player name, event, ranking)
• Works on all fabtcg.com decklist pages
• No login or permissions required
• Completely free and open source

**How to use:**
1. Visit any decklist on fabtcg.com (like tournament winning decklists)
2. Click the blue "Export to Fabrary" button
3. Your browser opens Fabrary with the deck pre-loaded
4. Save and manage your deck in Fabrary

**Perfect for:**
- Competitive players testing tournament-winning decklists
- Casual players building their collection in Fabrary
- Anyone who wants to quickly try out new decks
- Players organizing multiple deck ideas

**Privacy:**
This extension does NOT collect, store, or transmit any personal data. It only reads card information from fabtcg.com decklist pages to generate a Fabrary import URL. No tracking, no analytics, no data collection.

**Open Source:**
The code is publicly available on GitHub. Contributions and feedback welcome!

**Note:** This is an unofficial community tool. Not affiliated with Legend Story Studios or Fabrary.

---

## Categories (Select up to 2)

1. **Other** (Primary)
2. **Shopping** (Secondary - for deck building/collection management)

Alternative options:
- **Tabs**
- **Web Development** (if you want to emphasize the technical aspect)

---

## Tags/Keywords
- flesh and blood
- fab tcg
- fabrary
- decklist
- deck builder
- card game
- trading card game
- export
- import

---

## Screenshots (Recommended: 1280x800)

### Screenshot 1
- **Image:** fabtcg.com decklist page with export button
- **Caption:** One-click export button on every fabtcg.com decklist page

### Screenshot 2
- **Image:** Fabrary deck builder with imported deck
- **Caption:** Decklist automatically imported to Fabrary with all cards and quantities

---

## Additional Information

### Homepage
https://github.com/YOUR_USERNAME/fab-tcg-decklist-fabrary-exporter

### Support Email
your-email@example.com

### Support Site
https://github.com/YOUR_USERNAME/fab-tcg-decklist-fabrary-exporter/issues

### License
MIT License (or Custom License - "Free to use, modify, and distribute")

### Privacy Policy
**Short form (for field):**
This extension does not collect, store, or transmit any personal information or browsing data. It only operates on FAB TCG decklist pages to extract card information visible on the page and generate a Fabrary import URL.

**Full privacy policy URL (if required):**
You can host this in your GitHub repo as PRIVACY.md

---

## Technical Details

### This add-on requires permissions for:
- Access your data for fabtcg.com

**Why:** To read publicly visible decklist information and extract card data

### Works with
- Firefox 109.0 and later

### Manifest version
3

---

## Version Notes (for submission)

### Version 1.0.0
Initial release with core functionality:
- Export decklists from fabtcg.com to Fabrary
- Automatic card and quantity extraction
- Metadata extraction (player name, event, rank)
- Card ID normalization (removes suffixes)
- Debug logging for troubleshooting

**Testing notes for reviewers:**
To test this extension:
1. Visit https://fabtcg.com/decklists/jas-tin-lim-florian-rotwood-harbinger-battle-hardened-edinburgh/
2. Look for the blue "Export to Fabrary" button
3. Click it to see the decklist exported to Fabrary
4. Check browser console for debug output

---

## Distribution

### Where to host
**On this site** (addons.mozilla.org) - Recommended for public distribution

Alternative: **On your own** - If you only want to distribute to specific users

---

## Source Code (if required for review)

### Source code repository
https://github.com/YOUR_USERNAME/fab-tcg-decklist-fabrary-exporter

### Build instructions
```bash
npm install
npm run build:firefox
```

The built extension is in `dist/firefox/`

### Notes for reviewers
This is a simple content script extension with no minified code. All source files are readable JavaScript. No external dependencies in the runtime code - only uses built-in browser APIs.

---

## Monetization
Not monetized - completely free

---

## Requires Payment
No

---

## Developer Comments (visible to reviewers only)

This extension is a simple quality-of-life tool for the Flesh and Blood TCG community. It extracts publicly visible card data from the official FAB TCG website and formats it for import into Fabrary, a popular third-party deck builder.

The extension:
- Uses no external libraries at runtime
- Makes no network requests
- Stores no data
- Requires no user permissions beyond content script access to fabtcg.com

All code is contained in a single content script (content.js) with simple DOM manipulation and regex-based card extraction.
