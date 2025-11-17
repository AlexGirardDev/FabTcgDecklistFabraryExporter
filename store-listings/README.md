# Store Listing Files

This directory contains all the content you need to publish the extension to Chrome Web Store and Firefox Add-ons.

## Files Overview

### 📄 chrome-store-listing.md
Complete content for Chrome Web Store submission including:
- Product name and description
- Category and keywords
- Privacy practices
- Screenshot requirements
- Promotional images specs

### 📄 firefox-store-listing.md
Complete content for Firefox Add-ons (AMO) submission including:
- Add-on details
- Categories and tags
- Privacy policy
- Technical details
- Developer comments

### 📄 screenshot-guide.md
Step-by-step guide for creating professional screenshots:
- Required sizes and formats
- Screenshot ideas with captions
- Tools and best practices
- Promotional image design tips

### 📄 ../PRIVACY.md
Privacy policy that can be:
- Linked in store listings
- Hosted on GitHub
- Referenced in documentation

## Icons ✅

Icons have been created and configured:
- ✅ `icon16.png` - 16x16px (for browser toolbar)
- ✅ `icon48.png` - 48x48px (for extensions page)
- ✅ `icon128.png` - 128x128px (for Chrome Web Store)
- ✅ Added to `manifest.json`
- ✅ Included in build scripts

## Next Steps

### 1. Create Screenshots
Follow `screenshot-guide.md` to create:
- [ ] Screenshot 1: Export button visible on fabtcg.com
- [ ] Screenshot 2: Deck imported to Fabrary
- [ ] Screenshot 3 (optional): Console debug output

### 2. Update Placeholders
In both listing files, replace:
- [ ] `YOUR_USERNAME` with your GitHub username
- [ ] `your-email@example.com` with your support email
- [ ] `[DATE]` in PRIVACY.md with current date

### 3. Build the Extension
```bash
npm install
npm run package
```

This creates:
- `dist/fab-tcg-decklist-fabrary-exporter-chrome-v1.0.0.zip`
- `dist/fab-tcg-decklist-fabrary-exporter-firefox-v1.0.0.zip`

### 4. Chrome Web Store Submission
1. Go to [Chrome Web Store Developer Dashboard](https://chrome.google.com/webstore/devconsole)
2. Pay $5 one-time developer fee (if not already paid)
3. Click "New Item"
4. Upload the Chrome .zip file
5. Copy/paste content from `chrome-store-listing.md`
6. Upload screenshots
7. Submit for review

### 5. Firefox Add-ons Submission
1. Go to [Firefox Add-on Developer Hub](https://addons.mozilla.org/developers/)
2. Create account (free, no fee)
3. Click "Submit a New Add-on"
4. Upload the Firefox .zip file
5. Copy/paste content from `firefox-store-listing.md`
6. Upload screenshots
7. Submit for review

## Tips

### Chrome Web Store
- Review typically takes 1-3 business days
- Be detailed in privacy practices section
- High-quality screenshots increase downloads
- Respond promptly to reviewer feedback

### Firefox Add-ons
- Simple extensions often auto-approved (instant)
- More complex extensions may take 1-2 weeks
- Reviewers are very thorough
- Source code may be requested for review

## Store Listing Best Practices

### Description
✅ DO:
- Start with what the extension does
- List clear benefits
- Mention it's free and open source
- Include privacy statement
- Keep it concise but informative

❌ DON'T:
- Use excessive capitalization
- Make exaggerated claims
- Include competitor names
- Use marketing buzzwords

### Screenshots
✅ DO:
- Show the extension in action
- Use clean, uncluttered captures
- Include captions
- Make key features obvious

❌ DON'T:
- Use low-resolution images
- Include personal information
- Show error states
- Over-annotate

### Privacy
✅ DO:
- Be completely transparent
- Explain why permissions are needed
- State clearly if no data is collected
- Provide a full privacy policy

❌ DON'T:
- Be vague about data usage
- Request unnecessary permissions
- Hide data collection practices

## Support After Publishing

Once published, monitor:
- User reviews on both stores
- GitHub issues for bug reports
- Support email for questions

Respond to:
- Negative reviews professionally
- Bug reports promptly
- Feature requests considerately

Update regularly:
- Fix bugs quickly
- Add requested features
- Keep compatible with browser updates

## Resources

- [Chrome Web Store Developer Policies](https://developer.chrome.com/docs/webstore/program-policies/)
- [Firefox Add-on Policies](https://extensionworkshop.com/documentation/publish/add-on-policies/)
- [Chrome Extension Best Practices](https://developer.chrome.com/docs/extensions/mv3/devguide/)
- [Firefox Extension Workshop](https://extensionworkshop.com/)

Good luck with your submission! 🚀
