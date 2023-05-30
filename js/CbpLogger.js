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
exports.CbpLogger = void 0;
const jbdt = __importStar(require("./CbpDataTypes"));
class CbpLogger {
    constructor(botName, _sendAsync) {
        this._isElectron = false;
        this._botData = { botName, scope: "BOTPROCESS", clear: false };
        this._sendAsync = _sendAsync;
        this._isElectron = process.env.ELECTRON_RUN_AS_NODE === "1";
    }
    async sendAsync(action, data) {
        return this._sendAsync(action, data);
    }
    async clear() {
        if (!this._isElectron) {
            console.clear();
        }
        return this.sendAsync(jbdt.SDKClientActions.LOG_CLIENT, { ...this._botData, level: "clear", msg: "", clear: true });
    }
    async error(msg, ...optionalParams) {
        if (!this._isElectron) {
            if (optionalParams.length === 0) {
                console.error(msg);
            }
            else {
                console.error(msg, optionalParams);
            }
        }
        return this.sendAsync(jbdt.SDKClientActions.LOG_CLIENT, { ...this._botData, level: "error", msg: msg, pars: optionalParams });
    }
    async warn(msg, ...optionalParams) {
        if (!this._isElectron) {
            if (optionalParams.length === 0) {
                console.warn(msg);
            }
            else {
                console.warn(msg, optionalParams);
            }
        }
        return this.sendAsync(jbdt.SDKClientActions.LOG_CLIENT, { ...this._botData, level: "warn", msg: msg, pars: optionalParams });
    }
    async logImage(img, pars) {
        if (!this._isElectron) {
            console.log(img, pars);
        }
        return this.sendAsync(jbdt.SDKClientActions.LOG_CLIENT, { ...this._botData, level: "image", msg: img, pars: pars });
    }
    async logHtml(msg, ...optionalParams) {
        if (!this._isElectron) {
            if (optionalParams.length === 0) {
                console.log(msg);
            }
            else {
                console.log(msg, optionalParams);
            }
        }
        return this.sendAsync(jbdt.SDKClientActions.LOG_CLIENT, { ...this._botData, level: "html", msg: msg, pars: optionalParams });
    }
    async log(msg, ...optionalParams) {
        if (!this._isElectron) {
            if (optionalParams.length === 0) {
                console.log(msg);
            }
            else {
                console.log(msg, optionalParams);
            }
        }
        return this.sendAsync(jbdt.SDKClientActions.LOG_CLIENT, { ...this._botData, level: "info", msg: msg, pars: optionalParams });
    }
    async clearAndError(msg, ...optionalParams) {
        if (!this._isElectron) {
            console.clear();
            if (optionalParams.length === 0) {
                console.error(msg);
            }
            else {
                console.error(msg, optionalParams);
            }
        }
        return this.sendAsync(jbdt.SDKClientActions.LOG_CLIENT, { ...this._botData, level: "error", msg: msg, pars: optionalParams, clear: true });
    }
    async clearAndLog(msg, ...optionalParams) {
        if (!this._isElectron) {
            console.clear();
            if (optionalParams.length === 0) {
                console.log(msg);
            }
            else {
                console.log(msg, optionalParams);
            }
        }
        return this.sendAsync(jbdt.SDKClientActions.LOG_CLIENT, { ...this._botData, level: "info", msg: msg, pars: optionalParams, clear: true });
    }
    async logApi(msg, ...optionalParams) {
        if (!this._isElectron) {
            if (optionalParams.length === 0) {
                console.log(msg);
            }
            else {
                console.log(msg, optionalParams);
            }
        }
        return this.sendAsync(jbdt.SDKClientActions.LOG_CLIENT, { ...this._botData, level: "api", msg: msg, pars: optionalParams });
    }
}
exports.CbpLogger = CbpLogger;
//# sourceMappingURL=CbpLogger.js.map