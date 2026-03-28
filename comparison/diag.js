const { chromium } = require('@playwright/test');
const http = require('http');
const fs = require('fs');
const path = require('path');
const ROOT = '/Users/lenards/sandbox/pattern-fly/elm-patternfly-charts';

const server = http.createServer((req, res) => {
  const filePath = path.join(ROOT, req.url === '/' ? '/index.html' : req.url);
  fs.readFile(filePath, (err, data) => {
    if (err) { res.writeHead(404); res.end('404 ' + req.url); return; }
    const ext = path.extname(filePath);
    const type = ext === '.js' ? 'application/javascript' : 'text/html';
    res.writeHead(200, {'Content-Type': type});
    res.end(data);
  });
});

server.listen(9999, async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  page.on('pageerror', e => console.log('CRASH:', e.message));
  page.on('response', r => { if (r.status() >= 400) console.log('404:', r.url()); });
  
  await page.goto('http://localhost:9999/experiments-elm-charts/index.html', {waitUntil: 'networkidle'});
  await page.waitForTimeout(500);
  const body = await page.evaluate(() => document.body.innerHTML);
  console.log('=== FULL BODY (elm-charts) ===');
  console.log(body.slice(0, 1000));
  
  await browser.close();
  server.close();
});
