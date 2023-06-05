import EventEmitter from "events";
import * as jbdt from "./CbpDataTypes";

export class CbpMessenger {
  public readonly messengerName: string;
  public readonly _sendAsync: (action: string, data: any) => void;
  public onMessengerEvent: (e: jbdt.IMessengerEvent) => void = () => {};

  constructor(
    _sendAsync: (action: string, data: any) => void,
    messengerName: string
  ) {
    this.messengerName = messengerName;
    this._sendAsync = _sendAsync;
  }

  private async sendAsync<T>(action: string, data: T): Promise<any> {
    return this._sendAsync(action, data);
  }

  public async sendTextMessage(to: string, msg: string): Promise<boolean> {
    return this.sendAsync<jbdt.IMessengerData>(
      jbdt.SDKClientActions.MESSENGER,
      {
        operation: "sendMessage",
        messengerName: this.messengerName,
        data: { to, msg },
      }
    );
  }

  public async sendFiles(
    to: string,
    files: Array<string>
  ): Promise<Array<boolean>> {
    return this.sendAsync<jbdt.IMessengerData>(
      jbdt.SDKClientActions.MESSENGER,
      {
        operation: "sendFiles",
        messengerName: this.messengerName,
        data: { to, files },
      }
    );
  }

  public async getContacts(): Promise<Array<jbdt.IMessengerContact>> {
    return this.sendAsync<jbdt.IMessengerData>(
      jbdt.SDKClientActions.MESSENGER,
      { operation: "getContacts", messengerName: this.messengerName }
    );
  }

  public async getChats(
    contactId?: string
  ): Promise<Array<jbdt.IMessengerChat>> {
    return this.sendAsync<jbdt.IMessengerData>(
      jbdt.SDKClientActions.MESSENGER,
      {
        operation: "getChats",
        messengerName: this.messengerName,
        data: contactId,
      }
    );
  }

  public async getMessages(
    chatId: string
  ): Promise<Array<jbdt.IMessengerChat>> {
    return this.sendAsync<jbdt.IMessengerData>(
      jbdt.SDKClientActions.MESSENGER,
      { operation: "getMessages", messengerName: this.messengerName, data: chatId }
    );
  }

  public async logout(): Promise<boolean> {
    return this.sendAsync<jbdt.IMessengerData>(
      jbdt.SDKClientActions.MESSENGER,
      { operation: "logout", messengerName: this.messengerName }
    );
  }
}
