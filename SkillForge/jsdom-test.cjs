const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');

const htmlPath = path.join(__dirname, 'dist', 'index.html');
const html = fs.readFileSync(htmlPath, 'utf-8');

const dom = new JSDOM(html, {
  url: "http://localhost/",
  runScripts: "dangerously",
  resources: "usable",
  pretendToBeVisual: true
});

dom.window.console.error = (msg, ...args) => {
  console.log("REACT ERROR:", msg, ...args);
};

dom.window.addEventListener("error", (event) => {
  console.log("RUNTIME ERROR:", event.error);
});

dom.window.addEventListener("unhandledrejection", (event) => {
  console.log("UNHANDLED PROMISE:", event.reason);
});

dom.window.onload = () => {
  setTimeout(() => {
    const root = dom.window.document.getElementById('root');
    console.log("Root content length:", root ? root.innerHTML.length : 0);
  }, 2000);
};
