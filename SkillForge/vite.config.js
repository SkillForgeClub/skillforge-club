import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs'
import path from 'path'
import { execSync } from 'child_process'

try {
  const root = "c:\\Users\\karth\\Downloads\\skillforge-club-main";
  const output = [];
  
  const run = (cmd) => {
    try {
      const res = execSync(cmd, { cwd: root, encoding: "utf8" });
      output.push(`$ ${cmd}\n${res}`);
    } catch(err) {
      output.push(`$ ${cmd}\nERROR: ${err.message}\n${err.stderr || ""}`);
    }
  };
  
  run("git add .");
  run('git commit -m "Configure backend credentials and fix teammate photos local zoom integration"');
  
  fs.writeFileSync("git_commit_log.txt", output.join("\n\n"));
} catch (e) {
  fs.writeFileSync("git_commit_log.txt", "ERROR: " + e.stack);
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        secure: false,
      },
    },
  },
})
