Still have to write a good readme, but basically it is a 5 step process:

1) import the Studio Flow from /.docs/studio-flow.json

2) Deploy the Function like any other Twilio Function: `npm install && npm run deploy`. Dont forget to set the .env file looking into the .env-example

3) Configure an email to execute this Studio Flow within Console (menu Flex > Manage > Email)

4) If you receive an email in Flex, check if it has the task.attributes.queue defined, that means it worked!

5) Now go to /src/utils/config.protected.ts and update both the Queue descriptions and the Prompt.