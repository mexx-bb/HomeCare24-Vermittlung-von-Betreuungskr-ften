import fs from 'fs';
import path from 'path';

function replaceInFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf-8');
  let newContent = content
    .replace(/#2B7A6F/gi, '#55618b')
    .replace(/#205e55/gi, '#3c4564') // hover state for 2B7A6F -> 55618b (darker)
    .replace(/#e9f2f1/gi, '#eef1f6')
    // in pdfGenerator.ts
    .replace(/\[43,\s*122,\s*111\]/g, '[85, 97, 139]')
    // Step 7
    .replace(/bg-green-100/g, 'bg-[#eef1f6]');
  
  if (content !== newContent) {
    fs.writeFileSync(filePath, newContent, 'utf-8');
    console.log('Updated', filePath);
  }
}

function walk(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      walk(fullPath);
    } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
      replaceInFile(fullPath);
    }
  }
}

walk('./src');
