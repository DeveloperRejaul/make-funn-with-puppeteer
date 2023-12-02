const AmazonRouter = require("./amazon/amazon")
const puppeteerRouter = require("./puppeteer/puppeteer")

const appRoutes = [
    AmazonRouter,
    puppeteerRouter,
]


module.exports = appRoutes