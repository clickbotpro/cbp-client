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
exports.CbpTabMouse = void 0;
const jbdt = __importStar(require("./CbpDataTypes"));
class CbpTabMouse {
    constructor(_sendAsync, tabName) {
        this._sendAsync = _sendAsync;
        this.tabName = tabName;
        this.data2Pass = { name: tabName, source: jbdt.ClientSource.BROWSER };
    }
    async sendAsync(action, data) {
        return this._sendAsync(action, data);
    }
    async clickLeft(x, y) {
        return this.sendAsync(jbdt.SDKClientActions.MOUSE_OPERATION, { ...this.data2Pass, operation: "mouseLeftClick", x: x, y: y });
    }
    async clickRight(x, y) {
        return this.sendAsync(jbdt.SDKClientActions.MOUSE_OPERATION, { ...this.data2Pass, operation: "mouseRightClick", x: x, y: y });
    }
    async wheel(x, y) {
        return this.sendAsync(jbdt.SDKClientActions.MOUSE_OPERATION, { ...this.data2Pass, operation: "mouseWheel", x: x, y: y });
    }
    async moveTo(x, y) {
        return this.sendAsync(jbdt.SDKClientActions.MOUSE_OPERATION, { ...this.data2Pass, operation: "mouseMoveTo", x: x, y: y });
    }
    async clickLeftOnImage(imgName) {
        const screenshotImg = await this.sendAsync(jbdt.SDKClientActions.TAKE_SCREENSHOT, { source: jbdt.ClientSource.BROWSER, name: this.tabName, full: false });
        const foundImages = await this.sendAsync(jbdt.SDKClientActions.FIND_IMAGES_BYNAME, { imgName: imgName, srcImgFileName: screenshotImg });
        await this.sendAsync(jbdt.SDKClientActions.DELETE_FILES, { ...this.data2Pass, fileNames: [screenshotImg] });
        if (foundImages.length === 0) {
            return 0;
        }
        for (let i = 0; i < foundImages.length; i++) {
            const imgPos = foundImages[i];
            await this.clickLeft(imgPos.x + imgPos.w / 2, imgPos.y + imgPos.h / 2);
        }
        return foundImages.length;
    }
    async clickLeftOnElement(element) {
        const num = await this.sendAsync(jbdt.SDKClientActions.MOUSE_CLICK_ON_ELEMENT, { ...this.data2Pass, element });
        return num;
    }
}
exports.CbpTabMouse = CbpTabMouse;
//# sourceMappingURL=CbpTabMouse.js.map