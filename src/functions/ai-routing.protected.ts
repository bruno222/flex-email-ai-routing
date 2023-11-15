/**
 *
 * You can test this API quickly and locally accessing from your Browser:
 *
 *     http://localhost:3000/ai-routing?ChannelSid=CH771225b182ee47479f7c092d7729573c
 *
 */

import "@twilio-labs/serverless-runtime-types";
import {
  Context,
  ServerlessCallback,
  ServerlessFunctionSignature,
} from "@twilio-labs/serverless-runtime-types/types";
import { Twilio as TwilioInterface } from "twilio";
import OpenAIApi from "openai";

import * as HelperType from "./utils/helper.protected";
import * as ConfigType from "./utils/config.protected";

type MyEvent = {
  ChannelSid: string;
  Subject: string;
};

type MyContext = {
  OPENAI_API_KEY: string;
};

type Messages = {
  content: string;
  role: "user" | "assistant";
};

const { ResponseOK, ohNoCatch } = <typeof HelperType>//@ts-ignore
require(Runtime.getFunctions()["utils/helper"].path);

const { aiPrompt, defaultQueue } = <typeof ConfigType>//@ts-ignore
require(Runtime.getFunctions()["utils/config"].path);

export const handler: ServerlessFunctionSignature<MyContext, MyEvent> = async (
  context,
  event,
  callback: ServerlessCallback
) => {
  try {
    const { OPENAI_API_KEY } = context;
    const { ChannelSid, Subject } = event;

    console.log(`New Event! ChannelSid: ${ChannelSid}, Subject: ${Subject}`);

    const twilioClient = context.getTwilioClient();

    if (!OPENAI_API_KEY) {
      throw new Error(
        "OPENAI_API_KEY is empty. Go to your .env file and define it."
      );
    }

    if (!ChannelSid) {
      throw new Error(
        "ChannelSid attribute came empty. Check your Studio flow Widget, probably the Function Widget does not have the 'ChannelSid' attribute defined there."
      );
    }

    const messages = await getEmails(twilioClient, ChannelSid, Subject);
    const answer = await findBestQueue(OPENAI_API_KEY, messages);
    return ResponseOK(answer, callback);
  } catch (e) {
    return ohNoCatch(e, callback);
  }
};

const getEmails = async (
  twilioClient: TwilioInterface,
  ChannelSid: string,
  Subject: string
) => {
  const messagesRaw = await twilioClient.conversations.v1
    .conversations(ChannelSid)
    .messages.list();

  if (messagesRaw.length === 0) {
    return [];
  }

  const customerAuthor = messagesRaw[0].author;

  const messages = <Messages[]>messagesRaw
    // Remove any msgs that are not from the user or the assistant
    .filter((item) => item.author != "system")

    // Format in a way that OpenAI understands, with "content" and "role"
    .map((item) => ({
      content: item.body.trim(),
      role: customerAuthor === item.author ? "user" : "assistant",
    }))

    // If email came empty, makes no sense of sending it, so we are filtering out
    .filter((item) => item.content !== "")

    // Lets add the Subject to the email to the messages of the user, perhaps the customer send some useful info within it...
    .map((item) => (item.role !== "user" ? item : { ...item, content: `${Subject}\r\n\r\n${item.content}` }));

  return messages;
};

const findBestQueue = async (apiKey: string, messages: Messages[]) => {
  console.log("OpenAI request: ", JSON.stringify(messages, null, 2));

  const openai = new OpenAIApi({ apiKey });
  const completion = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    temperature: 0,
    max_tokens: 500,
    messages: [{ role: "system", content: aiPrompt() }, ...messages],
  });

  console.log(
    "OpenAI response: ",
    JSON.stringify(completion.choices[0], null, 2)
  );

  const response = completion.choices[0].message.content!;

  try {
    return JSON.parse(response);
  } catch (e) {
    console.log(
      "Error when parsing the JSON from OpenAI response, perhaps the GPT hallucinated and responded with something else? The original answer: ",
      response
    );
    return defaultQueue;
  }
};
