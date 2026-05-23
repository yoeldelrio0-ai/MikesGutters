import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const puppeteer = require('C:/Users/yoeld/AppData/Local/Temp/puppeteer-test/node_modules/puppeteer');

const browser = await puppeteer.launch({
  executablePath: 'C:/Users/yoeld/.cache/puppeteer/chrome/win64-146.0.7680.153/chrome-win64/chrome.exe',
  args: ['--no-sandbox'],
});
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900 });
await page.goto('http://localhost:3000', { waitUntil: 'networkidle2' });
await new Promise(r => setTimeout(r, 1200));
await page.click('#chatFab');
// Wait for most of the conversation to play through (about 12 seconds)
await new Promise(r => setTimeout(r, 12000));
await page.screenshot({
  path: 'E:/BookedUp/Landing page for BookedUp Websites/Mikes Gutter Works/temporary screenshots/screenshot-chat-convo.png',
  clip: { x: 980, y: 200, width: 460, height: 700 }
});
await browser.close();
console.log('done');
