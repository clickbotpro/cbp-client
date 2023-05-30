export declare class CbpLogger {
    private _sendAsync;
    private _botData;
    private _isElectron;
    constructor(botName: string, _sendAsync: (action: string, data: any) => void);
    private sendAsync;
    clear(): Promise<void>;
    error(msg: string, ...optionalParams: any[]): Promise<void>;
    warn(msg: string, ...optionalParams: any[]): Promise<void>;
    logImage(img: string, pars?: {
        w?: number;
        h?: number;
    }): Promise<void>;
    logHtml(msg?: string, ...optionalParams: any[]): Promise<void>;
    log(msg?: string, ...optionalParams: any[]): Promise<void>;
    clearAndError(msg: string, ...optionalParams: any[]): Promise<void>;
    clearAndLog(msg: string, ...optionalParams: any[]): Promise<void>;
    logApi(msg?: string, ...optionalParams: any[]): Promise<void>;
}
