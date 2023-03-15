import creds from './creds.js'

const puppeteer = require('puppeteer')
const nodemailer = require('nodemailer');
const fs = require('fs');
const buffer = new Buffer.alloc(1024);


const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: creds.user,
      pass: creds.pass,
    },
});

const buildEmailObject = (newTimestamp) => { 
    return {
        from: `"Second Use Mailer" <${creds.user}>`, // sender address
        to: creds.recipientEmail, // list of receivers
        subject: "New Stuff!", // Subject line
        text: `Second Use ${newTimestamp} https://www.seconduse.com/inventory/`, // plain text body
        html: `<b>Second Use ${newTimestamp} https://www.seconduse.com/inventory/</b>`, // html body
    }
}

async function compareTimestamps(newTimestamp) {
    let oldTimestamp =  fs.readFileSync('./seconduseTimestamp.txt', {encoding:'utf8', flag:'r'})

    if (oldTimestamp !== newTimestamp) {
        transporter.sendMail(buildEmailObject(newTimestamp)).then(info => {
            console.log({info});
        }).catch(console.error)
        fs.writeFileSync('./seconduseTimestamp.txt', newTimestamp)
        console.log("Updated timestamp")
    } else {
        console.log("No new updates")
    }
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