const fs = require('fs');
const path = require('path');

function copyDir(src, dest) {
  if (!fs.existsSync(dest)) fs.mkdirSync(dest, { recursive: true });
  for (let item of fs.readdirSync(src)) {
    if (item === 'node_modules') continue;
    let s = path.join(src, item);
    let d = path.join(dest, item);
    if (fs.statSync(s).isDirectory()) {
      copyDir(s, d);
    } else {
      fs.copyFileSync(s, d);
    }
  }
}

const srcDir = path.join(__dirname, 'SkillForge', 'backend');
const destDir = path.join(__dirname, 'backend');

copyDir(srcDir, destDir);
console.log('✅ Successfully copied all backend routes, controllers, middleware, and config to root backend!');
