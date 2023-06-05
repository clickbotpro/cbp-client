"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CbpMessenger = void 0;
const jbdt = __importStar(require("./CbpDataTypes"));
class CbpMessenger {
    constructor(_sendAsync, messengerName) {
        this.onMessengerEvent = () => { };
        this.messengerName = messengerName;
        this._sendAsync = _sendAsync;
    }
    async sendAsync(action, data) {
        return this._sendAsync(action, data);
    }
    async sendTextMessage(to, msg) {
        return this.sendAsync(jbdt.SDKClientActions.MESSENGER, {
            operation: "sendMessage",
            messengerName: this.messengerName,
            data: { to, msg },
        });
    }
    async sendFiles(to, files) {
        return this.sendAsync(jbdt.SDKClientActions.MESSENGER, {
            operation: "sendFiles",
            messengerName: this.messengerName,
            data: { to, files },
        });
    }
    async getContacts() {
        return this.sendAsync(jbdt.SDKClientActions.MESSENGER, { operation: "getContacts", messengerName: this.messengerName });
    }
    async getChats(contactId) {
        return this.sendAsync(jbdt.SDKClientActions.MESSENGER, {
            operation: "getChats",
            messengerName: this.messengerName,
            data: contactId,
        });
    }
    async getMessages(chatId) {
        return this.sendAsync(jbdt.SDKClientActions.MESSENGER, { operation: "getMessages", messengerName: this.messengerName, data: chatId });
    }
    async logout() {
        return this.sendAsync(jbdt.SDKClientActions.MESSENGER, { operation: "logout", messengerName: this.messengerName });
    }
}
exports.CbpMessenger = CbpMessenger;
