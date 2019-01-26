const puppeteer = require('puppeteer');
let browser, page;
let user;
beforeEach(async () => {
    browser = await puppeteer.launch();
    page = await browser.newPage();
    await page.goto('https://kirega.github.io/iReporter-fetchAPI/ui/login.html',{ "waitUntil": "networkidle2" } );
  
    user = {
        "username": "demo",
        "password": '12345678'
    };
    fake_user = {
        "username": "fada",
        "password": '12345678'
    };

});
afterEach(async () => {
    await browser.close();
});

describe("login", () => {
    it('With right credentials', async () => {
        await page.click("input[name=username]");
        await page.type("input[name=username]", user.username);
        
        await page.click('input[name=password]');
        await page.type("input[name=password]", user.password);

        await page.click('button');
        await page.waitForSelector('#snackbar.success');
        const content = await page.$eval(
            '#snackbar',
            (response) => response.innerText
        );
        expect(content).toMatch('Success!');
    });
    it('With fake credentials', async () => {
        await page.click("input[name=username]");
        await page.type("input[name=username]", fake_user.username);
        
        await page.click('input[name=password]');
        await page.type("input[name=password]", fake_user.password);

        await page.click('button');
        // await page.waitForSelector('#errors').innerText != "";
        let content;
        setTimeout(async ()=>{
             content = await page.$eval(
                '#errors',
                (response) => response.innerText
                );
                expect(content).toMatch('Invalid username/password');
        }, 3000)
    });
});