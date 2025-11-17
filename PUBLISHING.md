# Publishing Guide

This guide explains how to publish the FAB TCG Fabrary Export extension to Chrome Web Store and Firefox Add-ons.

## Prerequisites

Before publishing, you need:

### For Chrome Web Store
1. A Google account
2. Developer account registration ($5 one-time fee): https://chrome.google.com/webstore/devconsole
3. Extension icons (see Icons section below)

### For Firefox Add-ons
1. A Firefox account: https://addons.mozilla.org/
2. No registration fee required
3. Extension icons (see Icons section below)

### Required Icons

Create icons in the following sizes and place them in the root directory:
- `icon16.png` - 16x16px
- `icon48.png` - 48x48px
- `icon128.png` - 128x128px

You can use a simple icon generator or design tool. The icon should represent FAB TCG or Fabrary.

## Building for Release

### Automated Build (Recommended)

1. Install dependencies:
```bash
npm install
```

2. Build and package both versions:
```bash
npm run package
```

This creates:
- `dist/fab-tcg-decklist-fabrary-exporter-chrome-v1.0.0.zip`
- `dist/fab-tcg-decklist-fabrary-exporter-firefox-v1.0.0.zip`

### Manual Build

For Chrome:
```bash
npm run build:chrome
npm run package:chrome
```

For Firefox:
```bash
npm run build:firefox
npm run package:firefox
```

## Publishing to Chrome Web Store

1. Go to [Chrome Web Store Developer Dashboard](https://chrome.google.com/webstore/devconsole)
2. Click "New Item"
3. Upload `dist/fab-tcg-decklist-fabrary-exporter-chrome-v*.zip`
4. Fill in the required fields:
   - **Product name**: FAB TCG Decklist Fabrary Exporter
   - **Summary**: Export Flesh and Blood TCG decklists to Fabrary with one click
   - **Description**: Use the description from README.md, enhanced with:
     - Features list
     - How it works
     - Privacy statement (no data collection)
   - **Category**: Productivity or Entertainment
   - **Language**: English
5. Upload screenshots:
   - Screenshot of the extension button on a decklist page
   - Screenshot of the exported deck in Fabrary
   - Recommended size: 1280x800 or 640x400
6. Upload promotional images (optional but recommended):
   - Small tile: 440x280px
   - Marquee: 1400x560px
7. Set privacy practices:
   - Single purpose description: "Export FAB TCG decklists to Fabrary"
   - Justify permissions: "No special permissions required"
   - Declare no data collection
8. Submit for review

**Review time**: Typically 1-3 business days

## Publishing to Firefox Add-ons

1. Go to [Firefox Add-on Developer Hub](https://addons.mozilla.org/developers/)
2. Click "Submit a New Add-on"
3. Upload `dist/fab-tcg-decklist-fabrary-exporter-firefox-v*.zip`
4. Select distribution:
   - Choose "On this site" for AMO (recommended)
5. Fill in listing details:
   - **Name**: FAB TCG Decklist Fabrary Exporter
   - **Summary**: Export Flesh and Blood TCG decklists to Fabrary with one click
   - **Description**: Same as Chrome version
   - **Categories**: Web Development, Shopping, Other
   - **Support email**: Your email
   - **Support website**: Your GitHub repo
6. Upload screenshots (same as Chrome)
7. Set privacy policy: "This extension does not collect or transmit any user data"
8. Submit for review

**Review time**: Typically automated (instant) for simple extensions, or 1-2 weeks if manual review needed

## GitHub CI/CD Setup

The repository includes GitHub Actions workflow that automatically:
- Builds both Chrome and Firefox versions on every push
- Creates release artifacts when you push a version tag

### Creating a Release

1. Update version in `manifest.json`
2. Commit the change:
```bash
git add manifest.json
git commit -m "Bump version to 1.0.1"
```

3. Create and push a tag:
```bash
git tag v1.0.1
git push origin main --tags
```

4. GitHub Actions will automatically:
   - Build both versions
   - Create a GitHub Release
   - Attach the .zip files

You can then download these .zip files and upload to Chrome/Firefox stores.

## Store Listing Requirements

### Chrome Web Store

**Required fields:**
- 128x128 icon
- At least 1 screenshot (1280x800 recommended)
- Detailed description (max 132 characters for summary)
- Privacy policy (can be simple statement in description)

**Optional but recommended:**
- Promotional images
- Video demo
- Support website

### Firefox Add-ons

**Required fields:**
- 48x48 and 64x64 icons (will be generated from 128x128)
- Description
- Categories
- License (defaults to custom license)

**Optional but recommended:**
- Screenshots
- Support email/website
- Homepage URL

## Privacy Policy

Since this extension:
- Doesn't collect any user data
- Doesn't track users
- Only runs on fabtcg.com/decklists/* pages
- Doesn't require any special permissions

You can use this simple privacy statement:

```
This extension does not collect, store, or transmit any personal information or browsing data. It only operates on FAB TCG decklist pages to extract card information visible on the page and generate a Fabrary import URL.
```

## Version Updates

When releasing updates:

1. Update `manifest.json` version following semantic versioning:
   - Patch (1.0.1): Bug fixes
   - Minor (1.1.0): New features, backward compatible
   - Major (2.0.0): Breaking changes

2. Build and package new version
3. Upload to stores (updates are reviewed faster than initial submissions)

## Troubleshooting

### Build fails
- Ensure Node.js 20+ is installed
- Run `npm install` to install dependencies
- Check that all source files exist

### Chrome Web Store rejection
- Common issues: missing icons, unclear description, permissions not justified
- Review feedback and resubmit with fixes

### Firefox Add-ons rejection
- Common issues: manifest errors, unsafe code practices
- Check automated validator output
- Fix issues and resubmit

## Support

After publishing, monitor:
- User reviews on both stores
- GitHub issues
- Support email for bug reports

Good luck with your extension! 🎉
