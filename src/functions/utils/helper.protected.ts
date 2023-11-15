import { ServerlessCallback } from "@twilio-labs/serverless-runtime-types/types";
import * as ConfigType from "./config.protected";

export const ohNoCatch = (e: any, callback: ServerlessCallback) => {
  console.error("Exception: ", typeof e, e);
  const response = new Twilio.Response();
  response.setStatusCode(403);
  response.appendHeader("Access-Control-Allow-Origin", "*");
  response.appendHeader("Access-Control-Allow-Methods", "OPTIONS POST GET");
  response.appendHeader("Access-Control-Allow-Headers", "Content-Type");
  response.appendHeader("Content-Type", "application/json");
  response.setBody({ error: typeof e === "string" ? e : e.message });
  callback(null, response);
};

export const ResponseOK = (obj: any, callback: ServerlessCallback) => {
  console.error("Response: ", typeof obj, obj);
  const response = new Twilio.Response();
  response.setStatusCode(200);
  response.appendHeader("Access-Control-Allow-Origin", "*");
  response.appendHeader("Access-Control-Allow-Methods", "OPTIONS POST GET");
  response.appendHeader("Access-Control-Allow-Headers", "Content-Type");
  response.appendHeader("Content-Type", "application/json");
  response.setBody(typeof obj === "string" ? { obj } : obj);
  callback(null, response);
};