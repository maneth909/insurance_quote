const fs = require('fs');
const path = require('path');

const directories = [
  'app',
  'components'
];

function replaceInFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  if (content.includes('slate')) {
    const newContent = content.replace(/slate/g, 'neutral');
    fs.writeFileSync(filePath, newContent, 'utf8');
    console.log(`Replaced slate in ${filePath}`);
  }
}

function walkDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      walkDir(fullPath);
    } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts') || fullPath.endsWith('.css')) {
      replaceInFile(fullPath);
    }
  }
}

directories.forEach(walkDir);
