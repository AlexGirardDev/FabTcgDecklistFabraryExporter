# FAB TCG Decklist Fabrary Exporter

A browser extension for Chrome and Firefox that adds an "Export to Fabrary" button to Flesh and Blood TCG decklist pages on fabtcg.com.

## Features

- One-click export from fabtcg.com to Fabrary
- Automatically extracts all cards with quantities
- Captures deck metadata (player name, event, ranking)
- Clean, simple interface
- No login or permissions required
- Free and open source

## Installation

### Chrome Web Store
Coming soon!

### Firefox Add-ons
Coming soon!

### Install from Source

1. Clone this repository
2. Open Chrome/Firefox and go to extensions page (`chrome://extensions` or `about:addons`)
3. Enable "Developer mode"
4. Click "Load unpacked" and select this directory
5. Visit any fabtcg.com decklist page and click the "Export to Fabrary" button

## Usage

1. Visit any decklist on [fabtcg.com](https://fabtcg.com/decklists/)
2. Click the blue "Export to Fabrary" button
3. Your deck opens in Fabrary, ready to save!

## Example

Try it on pages like:
- https://fabtcg.com/decklists/jas-tin-lim-florian-rotwood-harbinger-battle-hardened-edinburgh/

## Privacy

This extension does not collect, store, or transmit any user data. It only reads publicly visible decklist information from fabtcg.com pages. See [PRIVACY.md](PRIVACY.md) for details.

## Development

```bash
# Install dependencies
npm install

# Build for Chrome
npm run build:chrome

# Build for Firefox
npm run build:firefox

# Package both versions
npm run package
```

See [PUBLISHING.md](PUBLISHING.md) for store submission guidelines.

## License

MIT License - see [LICENSE](LICENSE) file for details.

## Contributing

Issues and pull requests welcome! This is a community tool for FAB TCG players.

## Disclaimer

This is an unofficial community tool. Not affiliated with Legend Story Studios or Fabrary.
