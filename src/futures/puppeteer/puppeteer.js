const { takeScreenShutWithUrl } = require("./puppeteer.fn")

const puppeteerRouter = require("express").Router()


// all puppeteer routs
// create image with url
puppeteerRouter.post("/puppeteer", takeScreenShutWithUrl)
module.exports = puppeteerRouter