import * as jbdt from "./CbpDataTypes";
export declare class CbpMessenger {
    readonly messengerName: string;
    readonly _sendAsync: (action: string, data: any) => void;
    onMessengerEvent: (e: jbdt.IMessengerEvent) => void;
    constructor(_sendAsync: (action: string, data: any) => void, messengerName: string);
    private sendAsync;
    sendTextMessage(to: string, msg: string): Promise<boolean>;
    sendFiles(to: string, files: Array<string>): Promise<Array<boolean>>;
    getContacts(): Promise<Array<jbdt.IMessengerContact>>;
    getChats(contactId?: string): Promise<Array<jbdt.IMessengerChat>>;
    getMessages(chatId: string): Promise<Array<jbdt.IMessengerChat>>;
    logout(): Promise<boolean>;
}
