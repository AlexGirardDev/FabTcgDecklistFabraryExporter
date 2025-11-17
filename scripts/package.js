const fs = require('fs');
const path = require('path');
const archiver = require('archiver');

const targets = process.argv[2] ? [process.argv[2]] : ['chrome', 'firefox'];

async function packageExtension(target) {
  const distDir = path.join(__dirname, '..', 'dist', target);
  const outputDir = path.join(__dirname, '..', 'dist');

  // Ensure dist directory exists
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  // Read version from manifest
  const manifest = JSON.parse(
    fs.readFileSync(path.join(distDir, 'manifest.json'), 'utf8')
  );
  const version = manifest.version;

  const outputPath = path.join(outputDir, `fab-fabrary-export-${target}-v${version}.zip`);

  return new Promise((resolve, reject) => {
    const output = fs.createWriteStream(outputPath);
    const archive = archiver('zip', { zlib: { level: 9 } });

    output.on('close', () => {
      console.log(`✓ Packaged ${target} extension: ${outputPath} (${archive.pointer()} bytes)`);
      resolve();
    });

    archive.on('error', reject);

    archive.pipe(output);
    archive.directory(distDir, false);
    archive.finalize();
  });
}

async function main() {
  // First build both targets
  const { execSync } = require('child_process');

  for (const target of targets) {
    console.log(`Building ${target}...`);
    execSync(`node scripts/build.js ${target}`, { stdio: 'inherit' });
  }

  // Then package them
  for (const target of targets) {
    await packageExtension(target);
  }

  console.log('\n✓ All packages created successfully!');
}

main().catch(console.error);
