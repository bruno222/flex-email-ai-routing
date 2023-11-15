"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
// Imports global types
require("@twilio-labs/serverless-runtime-types");
exports.handler = function (context, event, callback) {
    var twiml = new Twilio.twiml.VoiceResponse();
    twiml.say((context.GREETING ? context.GREETING : 'Hello') + " " + (event.Body ? event.Body : 'World') + "!");
    callback(null, twiml);
};
//# sourceMappingURL=hello-world.js.map