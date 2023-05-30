import * as jbdt from './CbpDataTypes';
export declare class CbpServices {
    private _sendAsync;
    constructor(_sendAsync: (action: string, data: any) => void);
    private sendAsync;
    chatgpt(pars: jbdt.IServiceDataChatGptContent): Promise<string>;
    sms(pars: {
        receiver: string;
        content: string;
    }): Promise<void>;
    email(pars: {
        receiver: string;
        subject?: string;
        content: string;
        attachments?: Array<string>;
    }): Promise<void>;
}
