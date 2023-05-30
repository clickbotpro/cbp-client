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
exports.CbpDesktop = void 0;
const jbdt = __importStar(require("./CbpDataTypes"));
class CbpDesktop {
    constructor(_sendAsync, data) {
        this.data = data;
        this._sendAsync = _sendAsync;
        this.sendAsync = this.sendAsync.bind(this);
        this.sendAsyncNoData = this.sendAsyncNoData.bind(this);
        this.data2Pass = { source: jbdt.ClientSource.DESKTOP, name: data.name };
    }
    async sendAsync(action, data) {
        return this._sendAsync(action, data);
    }
    async sendAsyncNoData(action) {
        return this._sendAsync(action, {});
    }
    async takeScreenshot(capture, ttl) {
        return this.sendAsync(jbdt.SDKClientActions.TAKE_SCREENSHOT, { ...this.data2Pass, capture, ttl, full: false });
    }
    async deleteScreenshots(screenshots) {
        return this.sendAsync(jbdt.SDKClientActions.DELETE_FILES, { ...this.data2Pass, fileNames: screenshots });
    }
    async deleteScreenshot(screenshot) {
        const totalDeleted = await this.sendAsync(jbdt.SDKClientActions.DELETE_FILES, { ...this.data2Pass, fileNames: [screenshot] });
        return totalDeleted > 0;
    }
    async present(fileName) {
        return this.sendAsync(jbdt.SDKClientActions.PRESENT, { ...this.data2Pass, fileName: fileName });
    }
}
exports.CbpDesktop = CbpDesktop;
//# sourceMappingURL=CbpDesktop.js.map