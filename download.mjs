import fs from 'fs';
import { mkdirSync } from 'fs';

async function download() {
  if (!fs.existsSync('public')) {
    mkdirSync('public');
  }
  const res = await fetch('https://wiehler-homecare24.de/wp-content/uploads/yootheme/cache/cc/LOGO-HOMECARE-ccdfb350.png');
  const buffer = await res.arrayBuffer();
  fs.writeFileSync('public/logo.png', Buffer.from(buffer));
  console.log('Logo downloaded!');
}

download();
