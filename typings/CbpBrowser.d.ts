import * as jbdt from './CbpDataTypes';
import { CbpTab } from './CbpTab';
export declare class CbpBrowser {
    onBrowserDataUpdate: (_bd: jbdt.BrowserData) => void;
    onBrowserFileDownloadUpdate: (_bd: jbdt.BrowserFileDownloadUpdate) => void;
    readonly data: jbdt.BrowserPars;
    _sendAsync: (action: string, data: any) => void;
    readonly tabs: {
        [tabName: string]: CbpTab;
    };
    constructor(_sendAsync: (action: string, data: any) => void, data: jbdt.BrowserPars);
    clearStorageData(): Promise<boolean>;
    getBrowserPars(): jbdt.BrowserPars;
    private static emptySendMethod;
    private sendAsync;
    private sendAsyncNoData;
    private removeTabs;
    hasExternalTab(tabName: string): Promise<boolean>;
    hasTab(tabName: string): boolean;
    openTab(tabName: string, url?: string): Promise<CbpTab>;
    openTabData(data: jbdt.IOpenTabData): Promise<CbpTab>;
    closeTab(tabNames?: Array<string>): Promise<boolean>;
}
