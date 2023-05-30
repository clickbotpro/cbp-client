import * as jbdt from './CbpDataTypes';

export class CbpServices
{
  private _sendAsync:(action: string, data: any)=>void;
  constructor(_sendAsync:(action: string, data: any)=>void)
  {
    this._sendAsync=_sendAsync;
  }
  private async sendAsync<T>(action: string, data: T): Promise<any>
  {
    return this._sendAsync(action,data);
  }

  public async chatgpt(pars:jbdt.IServiceDataChatGptContent):Promise<string>
  {
    return this.sendAsync<jbdt.IServiceData>(
      jbdt.SDKClientActions.SERVICE,
      { content:JSON.stringify(pars),
        receiver:"",
        serviceName: "chatgpt"
      }
    );
  }

  
  public async sms(pars:{receiver:string, content:string}):Promise<void>
  {
    return this.sendAsync<jbdt.IServiceData>(
      jbdt.SDKClientActions.SERVICE,
      {content:pars.content, receiver:pars.receiver, serviceName: "sms"}
    );
  }

  public async email(pars:{receiver:string, subject?:string, content:string, attachments?:Array<string>}):Promise<void>
  {
    return this.sendAsync<jbdt.IServiceData>(
      jbdt.SDKClientActions.SERVICE,
      {receiver:pars.receiver, 
        subject:pars.subject, 
        content:pars.content, 
        attachments:pars.attachments, 
        serviceName: "email"
      }
    );
  }
}