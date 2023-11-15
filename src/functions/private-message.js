"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
// Imports global types
require("@twilio-labs/serverless-runtime-types");
exports.handler = function (context, event, callback) {
    var assets = Runtime.getAssets();
    // After compiling the assets, the result will be "message.js" not a TypeScript file.
    var privateMessageAsset = assets['/message.js'];
    var privateMessagePath = privateMessageAsset.path;
    var message = require(privateMessagePath);
    var twiml = new Twilio.twiml.MessagingResponse();
    twiml.message(message.privateMessage());
    callback(null, twiml);
};
//# sourceMappingURL=private-message.js.map