const { creds } = require('./creds.js');
const fetch = require('node-fetch');
const nodemailer = require('nodemailer');
const fs = require('fs');
const cheerio = require('cheerio');

const TIMESTAMP_FILE = './seconduseTimestamp.txt';

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
        subject: "There is new inventory at Second Use", // Subject line
        text: `Second Use ${newTimestamp} https://www.seconduse.com/inventory/`, // plain text body
        html: `<b>Second Use ${newTimestamp} https://www.seconduse.com/inventory/</b>`, // html body
    };
};

async function sendUpdateEmail(newTimestamp) {
    transporter.sendMail(buildEmailObject(newTimestamp)).then(info => {
        console.log({ info });
    }).catch(console.error);
}

async function getOldTimestamp(newTimestamp) {
    if (!fs.existsSync(TIMESTAMP_FILE)) {
        return '';
    }
    return fs.readFileSync(TIMESTAMP_FILE, { encoding: 'utf8', flag: 'r' });
}

async function writeTimestamp(newTimestamp) {
    fs.writeFileSync(TIMESTAMP_FILE, newTimestamp);
}

async function scrape() {
    const response = await fetch('https://www.seconduse.com/inventory/');
    const body = await response.text();
    const $ = cheerio.load(body);
    const newTimestamp = $('.timestamp > p').text();
    const oldTimestamp = await getOldTimestamp();
    if (newTimestamp === oldTimestamp) {
        console.log("No new updates");
        return;
    }
    sendUpdateEmail(newTimestamp);
    writeTimestamp(newTimestamp);
    console.log("Updated timestamp");
}
scrape();
