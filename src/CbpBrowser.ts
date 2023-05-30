import * as jbdt from './CbpDataTypes';
import {CbpTab} from './CbpTab';

export class CbpBrowser {
  
    public onBrowserDataUpdate = (_bd:jbdt.BrowserData)=>{};
    public onBrowserFileDownloadUpdate = (_bd:jbdt.BrowserFileDownloadUpdate)=>{};

    public readonly data: jbdt.BrowserPars;
    public _sendAsync: (action: string, data: any) => void;
    public readonly tabs: { [tabName: string]: CbpTab } = {};

    constructor(_sendAsync: (action: string, data: any) => void, data: jbdt.BrowserPars) 
    {
        this._sendAsync = _sendAsync;
        this.sendAsync = this.sendAsync.bind(this);
        this.sendAsyncNoData = this.sendAsyncNoData.bind(this);
        this.data=data;
    }

    public clearStorageData():Promise<boolean>
    {
        return this.sendAsyncNoData(jbdt.SDKClientActions.CLEAR_STORAGE_DATA);
    }
 
    public getBrowserPars():jbdt.BrowserPars
    {
        return this.data;
    }

    private static emptySendMethod(_action: string, _data: any)
    {
        //will prevent Tab object from working
        throw new Error("Tab already closed");
    }

    private async sendAsync<T>(action: string, data: T): Promise<any> {
        return this._sendAsync(action, data);
    }

    private async sendAsyncNoData(action: string): Promise<any> {
        return this._sendAsync(action, {});
    }

    private removeTabs(tabNames: Array<string>) {
        tabNames.forEach((k) => {
            this.tabs[k]._sendAsync = CbpBrowser.emptySendMethod;
            this.tabs[k].mouse._sendAsync = CbpBrowser.emptySendMethod;
            delete this.tabs[k];
        });
    }

    public async hasExternalTab(tabName:string): Promise<boolean> {
        const botNames = await this.sendAsync<any>(jbdt.SDKClientActions.GET_BOT_NAMES_WITH_TABNAME, {tabName});
        return botNames.length>0;
    }

    public hasTab(tabName:string): boolean {
        return typeof(this.tabs[tabName])!=="undefined";
    }

    public async openTab(tabName:string, url?:string): Promise<CbpTab> {
        return this.openTabData({tabName, url});
    }
 
    public async openTabData(data:jbdt.IOpenTabData): Promise<CbpTab> {

        const tabName=data.tabName.trim();
        if (this.hasTab(tabName)) {
            throw new Error("Tab '"+tabName+"' already present.");
        }
        let result = await this.sendAsync<jbdt.IOpenTabData>(jbdt.SDKClientActions.OPEN_TAB, data);
        if (result) {
            const tab = new CbpTab(this.sendAsync, tabName);
            this.tabs[tabName] = tab;
            return tab;
        } else {
            throw new Error("Failed to open tab " + tabName);
        }
    }

    public async closeTab(tabNames?: Array<string>): Promise<boolean> {
        const existingTabNames = Object.keys(this.tabs);
        if (existingTabNames.length === 0) {
            return false;
        }
        await this.sendAsync<jbdt.ICloseTabData>(jbdt.SDKClientActions.CLOSE_TAB, { tabNames: tabNames });
        if (typeof tabNames === "undefined") {
            this.removeTabs(existingTabNames);
            return true;
        }
        this.removeTabs(tabNames);
        return tabNames.length > 0;
    }


}