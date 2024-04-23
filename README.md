## What is it?

This solution provides an automated way to forward customer emails to the right queue in Flex using OpenAI.

When OpenAI doesn't know what to do, it will automatically reply the email to the customer, seeking clarification.

## How it works?

1. Customer sends an email;
2. It goes to a [Studio Flow](https://github.com/bruno222/flex-email-ai-routing/blob/6e80f23ca505225ec8d20345c72f26a0179de457/.docs/studio-flow-example.png);
3. Studio Flow [calls a Function](https://github.com/bruno222/flex-email-ai-routing/blob/6e80f23ca505225ec8d20345c72f26a0179de457/src/functions/ai-routing.protected.ts)
4. Function [calls OpenAI with a Prompt](https://github.com/bruno222/flex-email-ai-routing/blob/6e80f23ca505225ec8d20345c72f26a0179de457/src/functions/ai-routing.protected.ts#L111-L124)
5. Using the response from OpenAI, Studio creates a new attribute named `task.attributes.queue`; for instance, it could be set to "Sales".
6. It is not part of this Repo, but you only need to create a TaskRouter Workflow that matches this `task.attribute.queue` to the appropriate queue.

## How to install it?

1. clone this repo;
2. Run `npm install` to install the packages on your computer.
3. Rename `.env-example` to `.env` and follow the instructions in the `.env` file.
4. Go to `config.protected.ts` and update both the [Queue descriptions](https://github.com/bruno222/flex-email-ai-routing/blob/6e80f23ca505225ec8d20345c72f26a0179de457/src/functions/utils/config.protected.ts#L5-L26) and [the Prompt](https://github.com/bruno222/flex-email-ai-routing/blob/6e80f23ca505225ec8d20345c72f26a0179de457/src/functions/utils/config.protected.ts#L28-L50)
5. Run `npm run deploy` to deploy the functions to your Twilio environment.
6. import the Studio Flow from [studio-flow.json](https://github.com/bruno222/flex-email-ai-routing/blob/6e80f23ca505225ec8d20345c72f26a0179de457/.docs/studio-flow.json) and update the "Execute a Function" and "Send to Flex" widgets with the parameters that are currently empty (for "Execute a Function," select the Function you just deployed; for "Send to Flex," select the Workflow).
7. Configure the flow to execute this Studio Flow you just imported once an email arrives (Twilio Console > Menu Flex > Manage > Email)

## Examples

 Below are some examples when I was using [these Queues](https://github.com/bruno222/flex-email-ai-routing/blob/6e80f23ca505225ec8d20345c72f26a0179de457/src/functions/utils/config.protected.ts#L5-L26) and [this Prompt](https://github.com/bruno222/flex-email-ai-routing/blob/6e80f23ca505225ec8d20345c72f26a0179de457/src/functions/utils/config.protected.ts#L28-L50):

 ### Example 1 - Sales Queue

<p align="center">
  <img src="https://github.com/bruno222/flex-email-ai-routing/assets/1012787/f2ef31c6-2b40-40c9-9d9b-27c1ecbafdd7">
</p>


 Landed in Flex within the correct queue:

<p align="center">
  <img src="https://github.com/bruno222/flex-email-ai-routing/assets/1012787/aee38797-a594-4280-903d-d564266ef39a">
</p>


---
 ### Example 2 - Customer Service Queue

<p align="center">
  <img src="https://github.com/bruno222/flex-email-ai-routing/assets/1012787/93ff58e3-7797-4a9e-9727-d162dabdc75c">
</p>

 Landed in Flex correctly:

<p align="center">
  <img src="https://github.com/bruno222/flex-email-ai-routing/assets/1012787/2eb689f7-a378-4cae-bb0d-311712df5407">
</p>

---
### Example 3 - When in doubt?

When OpenAI cannot determine the Queue, it will reply to the customer, asking for more information about it:

<p align="center">
  <img src="https://github.com/bruno222/flex-email-ai-routing/assets/1012787/6f6b2c50-4850-4468-8084-b7ab9ee49da6">
</p>



