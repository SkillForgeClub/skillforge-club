const { chromium } = require('playwright');

(async () => {
  console.log('Launching browser...');
  const browser = await chromium.launch();
  const page = await browser.newPage();

  page.on('console', msg => console.log(`BROWSER CONSOLE [${msg.type()}]: ${msg.text()}`));
  page.on('pageerror', error => console.log(`BROWSER ERROR: ${error.message}`));

  console.log('Navigating...');
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });

  const rootHtml = await page.locator('#root').innerHTML();
  console.log('Root HTML length:', rootHtml.length);
  if (rootHtml.length < 50) {
    console.log('Root HTML is empty or too short:', rootHtml);
  } else {
    console.log('React successfully rendered.');
  }

  await browser.close();
})();
