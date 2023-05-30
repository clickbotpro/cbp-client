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
exports.CbpTabKeyboard = void 0;
const jbdt = __importStar(require("./CbpDataTypes"));
class CbpTabKeyboard {
    constructor(_sendAsync, tabName) {
        this._sendAsync = _sendAsync;
        this.tabName = tabName;
        this.data2Pass = { name: tabName, source: jbdt.ClientSource.BROWSER };
    }
    async sendAsync(action, data) {
        return this._sendAsync(action, data);
    }
    async type(text, delay = 0) {
        return this.sendAsync(jbdt.SDKClientActions.KEYBOARD_OPERATION, { ...this.data2Pass, operation: "keyboardType", text, delay });
    }
    async backspace(totalCharsToClear = 100, delay = 0) {
        return this.sendAsync(jbdt.SDKClientActions.KEYBOARD_OPERATION, { ...this.data2Pass, operation: "keyboardBackspace", text: totalCharsToClear.toString(), delay });
    }
    async press(key, delay = 0) {
        return this.sendAsync(jbdt.SDKClientActions.KEYBOARD_OPERATION, { ...this.data2Pass, operation: "keyboardPress", text: key, delay });
    }
    async release(key, delay = 0) {
        return this.sendAsync(jbdt.SDKClientActions.KEYBOARD_OPERATION, { ...this.data2Pass, operation: "keyboardRelease", text: key, delay });
    }
}
exports.CbpTabKeyboard = CbpTabKeyboard;
//# sourceMappingURL=CbpTabKeyboard.js.map