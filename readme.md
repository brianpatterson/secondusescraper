
1. The gmail api changed which might affect the ability for certain account
   types to have bots send emails. Mostly how I did it was using this tutorial
   https://edigleyssonsilva.medium.com/how-to-send-emails-securely-using-gmail-and-nodejs-eef757525324
2. Once they are enabled, you can get directly to setting up an app password at
   https://myaccount.google.com/apppasswords (the docs don't tell you this for
   some reason and I couldn't find them anywhere in settings).
3. Once you identify the issue and have an account configured that can properly
   use the api to send emails, create creds.js from creds.template.js, adding
   your username and password and recepient email.
4. Set up a cron job to run index.js, or if you're on windows like I was you
   can use this to run scraper.bat
   https://www.jcchouinard.com/python-automation-using-task-scheduler/
