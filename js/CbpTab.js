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
exports.CbpTab = void 0;
const jbdt = __importStar(require("./CbpDataTypes"));
const CbpTabMouse_1 = require("./CbpTabMouse");
const CbpTabKeyboard_1 = require("./CbpTabKeyboard");
const CbpWindow_1 = require("./CbpWindow");
class CbpTab extends CbpWindow_1.CbpWindow {
    constructor(_sendAsync, tabName) {
        super(_sendAsync, tabName);
        this.tabName = tabName;
        this.mouse = new CbpTabMouse_1.CbpTabMouse(this._sendAsync, tabName);
        this.keyboard = new CbpTabKeyboard_1.CbpTabKeyboard(this._sendAsync, tabName);
        this.data2Pass = { source: jbdt.ClientSource.BROWSER, name: tabName };
    }
    async getPars() {
        const tabName = this.tabName;
        return this.sendAsync(jbdt.SDKClientActions.GET_TAB_PARS, { tabName });
    }
    async waitForFileChooser(files) {
        return this.sendAsync(jbdt.SDKClientActions.TAB_WAIT_FOR_FILE_CHOOSER, { ...this.data2Pass, files: files });
    }
    async select(selector, ...values) {
        return this.sendAsync(jbdt.SDKClientActions.TAB_SELECT, { ...this.data2Pass, selector, values });
    }
    async takeFullScreenshot(ttl) {
        return this.sendAsync(jbdt.SDKClientActions.TAKE_SCREENSHOT, { ...this.data2Pass, ttl, full: true });
    }
    async takeScreenshot(capture, ttl) {
        if (typeof (capture) === "undefined") {
            const tabPars = await this.getPars();
            capture = { x: 0, y: 0, w: tabPars.w, h: tabPars.h };
        }
        return this.sendAsync(jbdt.SDKClientActions.TAKE_SCREENSHOT, { ...this.data2Pass, capture, ttl, full: false });
    }
    async deleteScreenshots(screenshots) {
        return this.sendAsync(jbdt.SDKClientActions.DELETE_FILES, { ...this.data2Pass, fileNames: screenshots });
    }
    async deleteScreenshot(screenshot) {
        const totalDeleted = await this.sendAsync(jbdt.SDKClientActions.DELETE_FILES, { ...this.data2Pass, fileNames: [screenshot] });
        return totalDeleted > 0;
    }
    async gotoUrl(url) {
        return this.sendAsync(jbdt.SDKClientActions.GOTO_URL, { tabName: this.tabName, url: url });
    }
    async present(fileName) {
        return this.sendAsync(jbdt.SDKClientActions.PRESENT, { ...this.data2Pass, fileName: fileName });
    }
    async getElements(pars) {
        return this.sendAsync(jbdt.SDKClientActions.GET_ELEMENTS, { tabName: this.tabName, filters: pars.filters, elementNames: pars.elementNames });
    }
    async getTextPos(text) {
        return this.sendAsync(jbdt.SDKClientActions.GET_TEXT_POS, { tabName: this.tabName, text: text });
    }
    async dropFilesIn(pos, files) {
        const filePaths = files.map((fullPath) => { return { filePath: fullPath }; });
        return this.sendAsync(jbdt.SDKClientActions.DROP_FILES_IN, {
            tabName: this.tabName, pos: pos, files: filePaths
        });
    }
    async refresh() {
        return this.sendAsync(jbdt.SDKClientActions.TAB_OPERATION, { tabName: this.tabName, operation: "refresh" });
    }
    async goBack() {
        return this.sendAsync(jbdt.SDKClientActions.TAB_OPERATION, { tabName: this.tabName, operation: "goBack" });
    }
    async goForward() {
        return this.sendAsync(jbdt.SDKClientActions.TAB_OPERATION, { tabName: this.tabName, operation: "goForward" });
    }
    async debugDrawRect(pos, options) {
        if (!options) {
            options = { border: 2, borderColor: "black" };
        }
        if (!Array.isArray(pos)) {
            pos = [pos];
        }
        return this.sendAsync(jbdt.SDKClientActions.DEBUG_DRAW_RECT, { ...this.data2Pass, pos, borderColor: options.borderColor, border: options.border });
    }
}
exports.CbpTab = CbpTab;
//# sourceMappingURL=CbpTab.js.map