
1. The gmail api changed which might affect the ability for certain account types to have bots send emails.
        Mostly how I did it was using this tutorial https://edigleyssonsilva.medium.com/how-to-send-emails-securely-using-gmail-and-nodejs-eef757525324
2. Once you identify the issue and have an account configured that can properly use the api to send emails, add your username and password to creds.js
3. Also add the email address you want to recieve the email
4. Set up a chron job to run index.js, or if you're on windows like I was you can use this to run scraper.bat https://www.jcchouinard.com/python-automation-using-task-scheduler/