const puppeteer = require('puppeteer');
const faker = require('faker');
let browser, page;

beforeEach(async () => {
    browser = await puppeteer.launch();
    page = await browser.newPage();
    await page.goto('https://kirega.github.io/iReporter-fetchAPI/ui/signup.html', {"waitUntil": "networkidle2"});
    user_exists = {
        "first_name": "Joseph",
        "last_name": "Mutiga",
        "other_names": "Kirega",
        "phonenumber": "0716570355",
        "email": "joseph.mutiga@gmail.com",
        "username": "Joe",
        "password": "12345678"
    };
    user = {
        "first_name": faker.fake("{{name.firstName}}"),
        "last_name": faker.fake("{{name.lastName}}"),
        "other_names": faker.fake("{{name.suffix}}"),
        "phonenumber": faker.phone.phoneNumber(),
        "email": faker.internet.email(),
        "username": faker.internet.userName(),
        "password": "12345678"
    };
});
afterEach(async () => {
    await browser.close();
});

describe("Sign up", () => {
    it("With existing username/email", async () => {
        await page.click("input[name=first_name]");
        await page.type("input[name=first_name]", user_exists.first_name);
        await page.click("input[name=last_name]");
        await page.type("input[name=last_name]", user_exists.last_name);
        await page.click("input[name=other_names]");
        await page.type("input[name=other_names]", user_exists.other_names);
        await page.click("input[name=phonenumber]");
        await page.type("input[name=phonenumber]", user_exists.phonenumber);
        await page.click("input[name=username]");
        await page.type("input[name=username]", user_exists.username);
        await page.click("input[name=email]");
        await page.type("input[name=email]", user_exists.email);
        await page.click("input[name=password]");
        await page.type("input[name=password]", user_exists.password);
        await page.click("input[name=confirm_password]");
        await page.type("input[name=confirm_password]", user_exists.password);
        await page.click('button');
        let content;
        setTimeout(async () => {
            content = await page.$eval(
                '#errors',
                res => res.innerText
            );
            expect(content).toMatch('Username/Email already exists');
        }, 3000);
    });
    it("With correct sign up details", async () => {
        await page.click("input[name=first_name]");
        await page.type("input[name=first_name]", user.first_name);
        await page.click("input[name=last_name]");
        await page.type("input[name=last_name]", user.last_name);
        await page.click("input[name=other_names]");
        await page.type("input[name=other_names]", user.other_names);
        await page.click("input[name=phonenumber]");
        await page.type("input[name=phonenumber]", user.phonenumber);
        await page.click("input[name=username]");
        await page.type("input[name=username]", user.username);
        await page.click("input[name=email]");
        await page.type("input[name=email]", user.email);
        await page.click("input[name=password]");
        await page.type("input[name=password]", user.password);
        await page.click("input[name=confirm_password]");
        await page.type("input[name=confirm_password]", user.password);
        await page.click('button');
        let content;
        setTimeout(async () => {
            content = await page.$eval(
                '#errors',
                res => res.innerText
            );
            expect(content).toMatch('Sign Up, successful!');
        }, 3000);
    })
});
