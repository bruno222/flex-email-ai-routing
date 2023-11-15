"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
// Imports global types
require("@twilio-labs/serverless-runtime-types");
exports.handler = function (context, event, callback) {
    var twiml = new Twilio.twiml.MessagingResponse();
    twiml.message('Hello World!');
    callback(null, twiml);
};
//# sourceMappingURL=reply.protected.js.map