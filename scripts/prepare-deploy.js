const fs = require('fs');
const path = require('path');

function copyDir(src, dest) {
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }
  const entries = fs.readdirSync(src, { withFileTypes: true });
  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

const outDir = path.join(__dirname, '..', 'out');
const nextDir = path.join(__dirname, '..', '.next');

if (fs.existsSync(outDir)) {
  console.log('Copying static export from out/ to .next/ so both directories can be deployed to Cloudflare Pages...');
  copyDir(outDir, nextDir);
  console.log('Successfully prepared .next directory with index.html and static assets.');
} else {
  console.error('out directory does not exist.');
}
