const puppeteer = require('puppeteer')
const fs = require('fs')
const buffer = new Buffer.alloc(1024)

async function compareTimestamps(newTimestamp) {
    let oldTimestamp =  fs.readFileSync('./seconduseTimestamp.txt', {encoding:'utf8', flag:'r'})
    console.log("old" + oldTimestamp)
    console.log("new" + newTimestamp)
}

async function scrape() {
    const browser = await puppeteer.launch({})
    const page = await browser.newPage()

    await page.goto('https://www.seconduse.com/inventory/')
    const element = await page.waitForSelector(".timestamp > p")
    const timestamp = await page.evaluate(element => element.textContent, element)
    const isUpdated = compareTimestamps(timestamp)
    browser.close()
}
scrape()