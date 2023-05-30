import * as jbdt from './CbpDataTypes';
export declare class CbpDesktop {
    private data2Pass;
    readonly data: jbdt.IDesktopData;
    _sendAsync: (action: string, data: any) => void;
    constructor(_sendAsync: (action: string, data: any) => void, data: jbdt.IDesktopData);
    private sendAsync;
    private sendAsyncNoData;
    takeScreenshot(capture?: jbdt.ImagePosition, ttl?: number): Promise<string>;
    deleteScreenshots(screenshots?: Array<string>): Promise<number>;
    deleteScreenshot(screenshot: string): Promise<boolean>;
    present(fileName: string): Promise<void>;
}
