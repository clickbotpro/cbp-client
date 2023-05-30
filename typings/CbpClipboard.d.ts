export declare class CbpClipboard {
    _sendAsync: (action: string, data: any) => void;
    constructor(_sendAsync: (action: string, data: any) => void);
    private sendAsync;
    writeText(text: string): Promise<void>;
    writeRTF(text: string): Promise<void>;
    readRTF(): Promise<string>;
    readText(): Promise<string>;
    readFilePaths(): Promise<Array<string>>;
    writeFilePaths(paths: Array<string>): Promise<Array<string>>;
    readHTML(): Promise<string>;
    clear(): Promise<string>;
    writeHTML(html: string): Promise<string>;
    paste(): Promise<string>;
}
