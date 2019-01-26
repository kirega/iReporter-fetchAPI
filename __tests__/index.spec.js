const puppeteer = require('puppeteer');
let browser, page;

beforeAll(async () => {
    browser = await puppeteer.launch();
    page = await browser.newPage();
    await page.goto('https://kirega.github.io/iReporter/ui/index.html');

});
afterAll(async () => {
    await browser.close();
});

describe("index", () => {
    it('loads', async () => {
        expect(await page.content()).toMatch('iReporter');
    });
});
