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
exports.CbpWindow = void 0;
const jbdt = __importStar(require("./CbpDataTypes"));
class CbpWindow {
    constructor(_sendAsync, tabName) {
        this._sendAsync = _sendAsync;
        this._tabName = tabName;
    }
    async sendAsync(action, data) {
        return this._sendAsync(action, data);
    }
    async sendWindowAction(functionName, args) {
        return this.sendAsync(jbdt.SDKClientActions.WINDOW_ACTION, { target: "window", tabName: this._tabName, functionName, args });
    }
    async sendWindowWebContentsAction(functionName, args) {
        return this.sendAsync(jbdt.SDKClientActions.WINDOW_ACTION, { target: "webContents", tabName: this._tabName, functionName, args });
    }
    async copy() {
        return this.sendWindowWebContentsAction("copy");
    }
    async copyImageAt(x, y) {
        return this.sendWindowWebContentsAction("copyImageAt", [x, y]);
    }
    async cut() {
        return this.sendWindowWebContentsAction("cut");
    }
    async delete() {
        return this.sendWindowWebContentsAction("delete");
    }
    async findInPage(text, options) {
        return this.sendWindowWebContentsAction("findInPage", [text, options]);
    }
    async stopFindInPage(action) {
        return this.sendWindowWebContentsAction("stopFindInPage", [action]);
    }
    async insertText(text) {
        return this.sendWindowWebContentsAction("insertText", [text]);
    }
    async inspectElement(x, y) {
        return this.sendWindowWebContentsAction("inspectElement", [x, y]);
    }
    async paste() {
        return this.sendWindowWebContentsAction("paste");
    }
    async reloadIgnoringCache() {
        return this.sendWindowWebContentsAction("reloadIgnoringCache");
    }
    async replace(text) {
        return this.sendWindowWebContentsAction("replace", [text]);
    }
    async selectAll() {
        return this.sendWindowWebContentsAction("selectAll");
    }
    async setUserAgent(userAgent) {
        return this.sendWindowWebContentsAction("setUserAgent", [userAgent]);
    }
    async undo() {
        return this.sendWindowWebContentsAction("undo");
    }
    async unselect() {
        return this.sendWindowWebContentsAction("unselect");
    }
    async setFrameRate(fps) {
        return this.sendWindowWebContentsAction("setFrameRate", [fps]);
    }
    async hide() {
        return this.sendWindowAction("hide");
    }
    async show() {
        return this.sendWindowAction("show");
    }
    async center() {
        return this.sendWindowAction("center");
    }
    async focus() {
        return this.sendWindowAction("focus");
    }
    async isDestroyed() {
        return this.sendWindowAction("isDestroyed");
    }
    async isFocused() {
        return this.sendWindowAction("isFocused");
    }
    async isVisible() {
        return this.sendWindowAction("isVisible");
    }
    async executeJavaScript(js) {
        return this.sendWindowWebContentsAction("executeJavaScript", [js]);
    }
    async setIgnoreMouseEvents(ignore, options) {
        return this.sendWindowAction("setIgnoreMouseEvents", [ignore, options]);
    }
    async setSize(width, height, animate) {
        return this.sendWindowAction("setSize", [width, height, animate]);
    }
    async setContentSize(width, height) {
        return this.sendWindowAction("setContentSize", [width, height]);
    }
    async setTitle(title) {
        return this.sendWindowAction("setTitle", [title]);
    }
}
exports.CbpWindow = CbpWindow;
