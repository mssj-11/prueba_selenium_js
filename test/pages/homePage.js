const { By, until } = require("selenium-webdriver");

class HomePage {
    constructor(driver) {
        this.driver = driver;
        this.title = 'FC Barcelona';
        this.navLinks = By.css("nav ul li a");
    }

    async open() {
        await this.driver.get("http://127.0.0.1:5500/index.html");
    }

    async getNavLinks() {
        let elements = await this.driver.findElements(this.navLinks);
        let texts = [];
        for (let el of elements) {
            texts.push(await el.getText());
        }
        return texts;
    }

    async getTitle() {
        return await this.driver.getTitle();
    }

}

module.exports = HomePage;