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
exports.CbpServices = void 0;
const jbdt = __importStar(require("./CbpDataTypes"));
class CbpServices {
    constructor(_sendAsync) {
        this._sendAsync = _sendAsync;
    }
    async sendAsync(action, data) {
        return this._sendAsync(action, data);
    }
    async chatgpt(pars) {
        return this.sendAsync(jbdt.SDKClientActions.SERVICE, { content: JSON.stringify(pars),
            receiver: "",
            serviceName: "chatgpt"
        });
    }
    async sms(pars) {
        return this.sendAsync(jbdt.SDKClientActions.SERVICE, { content: pars.content, receiver: pars.receiver, serviceName: "sms" });
    }
    async email(pars) {
        return this.sendAsync(jbdt.SDKClientActions.SERVICE, { receiver: pars.receiver,
            subject: pars.subject,
            content: pars.content,
            attachments: pars.attachments,
            serviceName: "email"
        });
    }
}
exports.CbpServices = CbpServices;
