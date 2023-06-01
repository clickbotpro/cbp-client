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
exports.CbpBrowser = void 0;
const jbdt = __importStar(require("./CbpDataTypes"));
const CbpTab_1 = require("./CbpTab");
class CbpBrowser {
    constructor(_sendAsync, data) {
        this.onBrowserDataUpdate = (_bd) => { };
        this.onBrowserFileDownloadUpdate = (_bd) => { };
        this.tabs = {};
        this._sendAsync = _sendAsync;
        this.sendAsync = this.sendAsync.bind(this);
        this.sendAsyncNoData = this.sendAsyncNoData.bind(this);
        this.data = data;
    }
    clearStorageData() {
        return this.sendAsyncNoData(jbdt.SDKClientActions.CLEAR_STORAGE_DATA);
    }
    getBrowserPars() {
        return this.data;
    }
    static emptySendMethod(_action, _data) {
        throw new Error("Tab already closed");
    }
    async sendAsync(action, data) {
        return this._sendAsync(action, data);
    }
    async sendAsyncNoData(action) {
        return this._sendAsync(action, {});
    }
    removeTabs(tabNames) {
        tabNames.forEach((k) => {
            this.tabs[k]._sendAsync = CbpBrowser.emptySendMethod;
            this.tabs[k].mouse._sendAsync = CbpBrowser.emptySendMethod;
            delete this.tabs[k];
        });
    }
    async hasExternalTab(tabName) {
        const botNames = await this.sendAsync(jbdt.SDKClientActions.GET_BOT_NAMES_WITH_TABNAME, { tabName });
        return botNames.length > 0;
    }
    hasTab(tabName) {
        return typeof (this.tabs[tabName]) !== "undefined";
    }
    async openTab(tabName, url) {
        return this.openTabData({ tabName, url });
    }
    async openTabData(data) {
        const tabName = data.tabName.trim();
        if (this.hasTab(tabName)) {
            throw new Error("Tab '" + tabName + "' already present.");
        }
        let result = await this.sendAsync(jbdt.SDKClientActions.OPEN_TAB, data);
        if (result) {
            const tab = new CbpTab_1.CbpTab(this.sendAsync, tabName);
            this.tabs[tabName] = tab;
            return tab;
        }
        else {
            throw new Error("Failed to open tab " + tabName);
        }
    }
    async closeTab(tabNames) {
        const existingTabNames = Object.keys(this.tabs);
        if (existingTabNames.length === 0) {
            return false;
        }
        await this.sendAsync(jbdt.SDKClientActions.CLOSE_TAB, { tabNames: tabNames });
        if (typeof tabNames === "undefined") {
            this.removeTabs(existingTabNames);
            return true;
        }
        this.removeTabs(tabNames);
        return tabNames.length > 0;
    }
}
exports.CbpBrowser = CbpBrowser;
