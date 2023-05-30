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
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = require("ws");
const jbdt = __importStar(require("./CbpDataTypes"));
const CbpUtils_1 = require("./CbpUtils");
const CbpLogger_1 = require("./CbpLogger");
const CbpBrowser_1 = require("./CbpBrowser");
const CbpDesktop_1 = require("./CbpDesktop");
const CbpServices_1 = require("./CbpServices");
const CbpClipboard_1 = require("./CbpClipboard");
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
__exportStar(require("./CbpDataTypes"), exports);
__exportStar(require("./CbpTab"), exports);
__exportStar(require("./CbpTabMouse"), exports);
__exportStar(require("./CbpTabKeyboard"), exports);
__exportStar(require("./CbpLogger"), exports);
__exportStar(require("./CbpBrowser"), exports);
__exportStar(require("./CbpDesktop"), exports);
__exportStar(require("./CbpServices"), exports);
__exportStar(require("./CbpClipboard"), exports);
__exportStar(require("./CbpUtils"), exports);
const tt = undefined;
const ctm = undefined;
const ctk = undefined;
class CbpClient {
    constructor(botName) {
        this.wsclient = undefined;
        this.callbacks = {};
        this.callbackUids = 0;
        this.desktops = {};
        this.anotherBotLogStreams = {};
        this.botName = botName || process.env.botName || this.getBotNameFromPackage();
        if (this.botName.length < 3) {
            throw new Error("invalid bot name passed: " + botName);
        }
        this.connect = this.connect.bind(this);
        this.checkConnection = this.checkConnection.bind(this);
        this.sendAsync = this.sendAsync.bind(this);
        this.sendAsyncNoData = this.sendAsyncNoData.bind(this);
        this.logger = new CbpLogger_1.CbpLogger(this.botName, this.sendAsync);
        this.services = new CbpServices_1.CbpServices(this.sendAsync);
        this.clipboard = new CbpClipboard_1.CbpClipboard(this.sendAsync);
    }
    getBotNameFromPackage() {
        const packageJsonPath = path_1.default.join(process.cwd(), "package.json");
        if (fs_1.default.existsSync(packageJsonPath)) {
            const json = JSON.parse(fs_1.default.readFileSync(packageJsonPath).toString());
            if (json.name) {
                return json.name;
            }
        }
    }
    async exec(cmd) {
        let result = await this.sendAsync(jbdt.SDKClientActions.OS_EXEC, cmd);
        return result;
    }
    async pause(sec = 0) {
        let result = await this.sendAsync(jbdt.SDKClientActions.PAUSE, sec);
        return result;
    }
    async disconnect() {
        if (this === undefined) {
            throw new Error("disconnect this is undefined");
        }
        if (this.browser) {
            await this.browser.closeTab();
            delete this.browser;
        }
        for (const key in this.desktops) {
            delete this.desktops[key];
        }
        if (this.wsclient) {
            this.wsclient.terminate();
            delete this.wsclient;
        }
    }
    isConnected() {
        if (!this.wsclient) {
            return false;
        }
        return this.wsclient.readyState == this.wsclient.OPEN;
    }
    checkConnection() {
        if (!this.isConnected()) {
            throw new Error("not connected. call connect() first");
        }
    }
    getUserSettings() {
        return CbpUtils_1.CbpUtils.getUserSettings();
    }
    async getBrowser(browserPars) {
        if (this.browser) {
            return this.browser;
        }
        const mergedPars = { ...new jbdt.BrowserPars(), ...browserPars };
        let result = await this.sendAsync(jbdt.SDKClientActions.OPEN_BROWSER, mergedPars);
        if (!result) {
            throw new Error("there was an error opening the browser");
        }
        this.browser = new CbpBrowser_1.CbpBrowser(this.sendAsync, mergedPars);
        return this.browser;
    }
    async connect(cbpAppUrl) {
        const localUrls = ["ws://localhost:8080", "ws://127.0.0.1:8080"];
        const botFolder = process.cwd();
        await this.disconnect();
        const start = async (url) => {
            return new Promise((resolve, reject) => {
                this.wsclient = new ws_1.WebSocket(url);
                this.wsclient.onopen = () => {
                    this.send('setup', { botName: this.botName, botFolder }, resolve);
                };
                this.wsclient.onmessage = (ws) => {
                    this.handleIncomingMsg(ws.data);
                };
                this.wsclient.onerror = (ev) => {
                    reject(ev);
                };
            });
        };
        if (typeof cbpAppUrl === "string") {
            await start(cbpAppUrl);
        }
        else {
            for (let i = 0; i < localUrls.length; i++) {
                try {
                    await start(localUrls[i]);
                    return;
                }
                catch (e) {
                }
            }
            throw new Error("Could not connect to ClickbotPro App. Make sure it is running and try again.");
        }
    }
    handleIncomingMsg(strJson) {
        const dataFromJson = JSON.parse(strJson);
        const uid = dataFromJson.uid;
        const cb = this.callbacks[uid];
        if (cb) {
            delete this.callbacks[uid];
            try {
                cb(dataFromJson.data, dataFromJson.error);
            }
            catch (e) {
                console.error(`cbp-client error not caught by client ${e}`);
            }
        }
        if (uid == -127) {
            try {
                if (this.onQueue) {
                    const d = dataFromJson.data;
                    this.onQueue(d);
                }
            }
            catch (e) {
                console.error(e);
            }
        }
        if (uid == -126) {
            try {
                if (this.browser) {
                    const d = dataFromJson.data;
                    this.browser.onBrowserFileDownloadUpdate(d);
                }
            }
            catch (e) {
                console.error(e);
            }
        }
        if (uid == -125) {
            try {
                const botName = dataFromJson.data.botName;
                if (botName && this.anotherBotLogStreams[botName]) {
                    this.anotherBotLogStreams[botName](dataFromJson.data);
                }
            }
            catch (e) {
                console.error(e);
            }
        }
        if (uid == -124) {
            try {
                if (this.browser) {
                    const newBd = dataFromJson.data;
                    this.browser.onBrowserDataUpdate(newBd);
                }
            }
            catch (e) {
                console.error(e);
            }
        }
        if (uid == -123) {
            try {
                if (this.onConsoleInput) {
                    this.onConsoleInput(dataFromJson.data);
                }
            }
            catch (e) {
                console.error(e);
            }
        }
        if (uid == -122) {
            try {
                if (this.onWillClose) {
                    this.onWillClose();
                }
            }
            catch (e) {
                console.error(e);
            }
        }
        if (uid == -121) {
            try {
                if (this.onSystemMessage) {
                    this.onSystemMessage(dataFromJson.data);
                }
            }
            catch (e) {
                console.error(e);
            }
        }
    }
    async getDesktopList() {
        let result = await this.sendAsync(jbdt.SDKClientActions.DESKTOP_LIST, {});
        result.forEach((v) => {
            if (!this.desktops[v.id]) {
                this.desktops[v.id] = new CbpDesktop_1.CbpDesktop(this.sendAsync, v);
            }
        });
        const ids = Object.keys(this.desktops);
        return ids.map((id) => this.desktops[(id)]);
    }
    async findImagesBase64(srcImgFileName, imgBase64) {
        return this.sendAsync(jbdt.SDKClientActions.FIND_IMAGES_BASE64, { srcImgFileName, imgBase64 });
    }
    async findImagesByName(srcImgFileName, imgName) {
        return this.sendAsync(jbdt.SDKClientActions.FIND_IMAGES_BYNAME, { srcImgFileName, imgName });
    }
    async imageOperation(data) {
        return this.sendAsync(jbdt.SDKClientActions.IMAGE_OPERATION, data);
    }
    async drawRect(imgName, pos, thick = 1, clr = 0) {
        return this.sendAsync(jbdt.SDKClientActions.DRAW_RECT, { imgName, pos, clr, thick });
    }
    async waitForSec(sec) {
        return this.sendAsync(jbdt.SDKClientActions.WAIT, { sec });
    }
    async getBotData() {
        return this.sendAsyncNoData(jbdt.SDKClientActions.GET_BOT_DATA);
    }
    async readText(imgName, lang) {
        return this.sendAsync(jbdt.SDKClientActions.READ_TEXT, { imgName, lang });
    }
    async sendAsyncNoData(action) {
        return this.sendAsync(action);
    }
    async sendAsync(action, data) {
        this.checkConnection();
        return new Promise((resolve, reject) => {
            const sent = this.send(action, data, (responseData, responseErrorDesc) => {
                if (responseErrorDesc) {
                    reject(responseErrorDesc);
                }
                else {
                    resolve(responseData);
                }
            });
            if (!sent) {
                reject(new Error('cant send because the client is not connected'));
            }
        });
    }
    send(action, data, callback) {
        if (!this.isConnected()) {
            return false;
        }
        this.callbackUids++;
        if (callback) {
            this.callbacks[this.callbackUids] = callback;
        }
        const json = JSON.stringify({
            action,
            data,
            uid: this.callbackUids,
        });
        this.wsclient?.send(json);
        return true;
    }
    async startAnotherBot(data) {
        if (data.onLog) {
            this.anotherBotLogStreams[data.botName] = data.onLog;
        }
        return this.sendAsync(jbdt.SDKClientActions.START_ANOTHER_BOT, { botName: data.botName, data: data.data });
    }
    async checkAccessibilityPermissions() {
        return this.sendAsync(jbdt.SDKClientActions.CHECK_ACCESSIBILITY_PERMISSIONS, { botName: this.botName });
    }
    getExtStartArgs() {
        return CbpUtils_1.CbpUtils.getExtStartArgs();
    }
}
exports.default = CbpClient;
//# sourceMappingURL=CbpClient.js.map