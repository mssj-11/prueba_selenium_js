const { Builder } = require("selenium-webdriver");

async function getDriver() {
    let driver = await new Builder().forBrowser("firefox").build();
    return driver;
}

module.exports = { getDriver };