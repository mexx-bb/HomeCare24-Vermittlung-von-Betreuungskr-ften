import * as fs from 'fs';

async function fetchCss() {
  const html = await fetch('https://wiehler-homecare24.de/').then(r => r.text());
  const cssLinks = html.match(/href="([^"]+\.css[^"]*)"/g);
  console.log('CSS Links found:', cssLinks);
  
  if (cssLinks) {
    for (const match of cssLinks) {
      const fullUrl = match.replace('href="', '').replace('"', '');
      try {
        const css = await fetch(fullUrl).then(r => r.text());
        const hexColors = css.match(/#[A-Fa-f0-9]{6}\b/g);
        if (hexColors) {
          const unique = [...new Set(hexColors)];
          console.log(fullUrl, 'colors:', unique.slice(0, 5));
        }
      } catch(e) {}
    }
  }
}
fetchCss();
