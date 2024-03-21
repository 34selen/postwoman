const puppeteer = require('puppeteer')
const FLAG = process.env.FLAG

module.exports.visit = async function visit() {
    try {
        browser = await puppeteer.launch({
            pipe: true,
            args: [
                '--no-sandbox',
                '--disable-default-apps',
                '--disable-extensions',
                '--disable-gpu',
                '--disable-sync',
                '--disable-translate',
                '--hide-scrollbars',
                '--metrics-recording-only',
                "--js-flags='--jitless'",
                '--mute-audio',
                '--no-first-run',
                '--safebrowsing-disable-auto-update',
                '--disable-dev-shm-usage',
            ],
            executablePath: "/usr/bin/google-chrome-stable",
            headless: 'new'
        });
        
        page = await browser.newPage();
        await page.setCookie({
            name: 'FLAG',
            value: FLAG,
            domain: 'nginx',
            httpOnly: false,
            path: '/',
            "sameSite": "Strict",
        });
        await page.goto(`http://nginx/`, { waitUntil: 'networkidle0' })
        await new Promise(r => setTimeout(r, 5000));
        await browser.close();
        return "success"
    } catch (e) {
        return "failed"
    }
}