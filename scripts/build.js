const fs = require('fs');
const path = require('path');

const target = process.argv[2] || 'chrome';
const distDir = path.join(__dirname, '..', 'dist', target);

// Clean and create dist directory
if (fs.existsSync(distDir)) {
  fs.rmSync(distDir, { recursive: true });
}
fs.mkdirSync(distDir, { recursive: true });

// Files to copy
const filesToCopy = [
  'content.js',
  'styles.css',
  'README.md'
];

// Copy files
filesToCopy.forEach(file => {
  const src = path.join(__dirname, '..', file);
  const dest = path.join(distDir, file);
  if (fs.existsSync(src)) {
    fs.copyFileSync(src, dest);
    console.log(`Copied ${file}`);
  }
});

// Handle manifest
const manifest = JSON.parse(
  fs.readFileSync(path.join(__dirname, '..', 'manifest.json'), 'utf8')
);

if (target === 'firefox') {
  // Add Firefox-specific fields
  manifest.browser_specific_settings = {
    gecko: {
      id: 'fab-fabrary-export@example.com',
      strict_min_version: '109.0'
    }
  };

  // Firefox uses manifest v2 or v3, ensure compatibility
  console.log('Building for Firefox with Manifest V3');
}

// Write manifest
fs.writeFileSync(
  path.join(distDir, 'manifest.json'),
  JSON.stringify(manifest, null, 2)
);

console.log(`Built ${target} extension successfully!`);
