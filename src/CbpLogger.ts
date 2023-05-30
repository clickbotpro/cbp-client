import * as jbdt from './CbpDataTypes';

export class CbpLogger
{
  private _sendAsync:(action: string, data: any)=>void;
  private _botData:{botName:string,scope:jbdt.BotLogScope,clear:false};
  private _isElectron:boolean=false;
  constructor(botName:string, _sendAsync:(action: string, data: any)=>void)
  {
    this._botData={botName,scope:"BOTPROCESS",clear:false};
    this._sendAsync=_sendAsync;
    this._isElectron=process.env.ELECTRON_RUN_AS_NODE==="1";
  }
  private async sendAsync<T>(action: string, data: T): Promise<any>
  {
    return this._sendAsync(action,data);
  }

  ////
  public async clear(): Promise<void>
  {
    if(!this._isElectron) {
      console.clear();
    }
    return this.sendAsync<any>(jbdt.SDKClientActions.LOG_CLIENT,{...this._botData, level:"clear",msg:"",clear:true});
  }
  public async error(msg:string, ...optionalParams: any[]): Promise<void>
  {
    if(!this._isElectron) {
      if(optionalParams.length===0) {
        console.error(msg);
      } else {
        console.error(msg,optionalParams);
      }
    }
    return this.sendAsync<any>(jbdt.SDKClientActions.LOG_CLIENT,{...this._botData, level:"error",msg:msg,pars:optionalParams});
  }
  public async warn(msg:string, ...optionalParams: any[]): Promise<void>
  {
    if(!this._isElectron) {
      if(optionalParams.length===0) {
        console.warn(msg);
      } else {
        console.warn(msg,optionalParams);
      }
    }
    return this.sendAsync<any>(jbdt.SDKClientActions.LOG_CLIENT,{...this._botData, level:"warn",msg:msg,pars:optionalParams});
  }
  public async logImage(img:string, pars?:{w?:number,h?:number}):Promise<void>
  {
    if(!this._isElectron) {
      console.log(img,pars);
    }
    return this.sendAsync<any>(jbdt.SDKClientActions.LOG_CLIENT,{...this._botData, level:"image",msg:img, pars:pars});
  }
  public async logHtml(msg?: string, ...optionalParams: any[]): Promise<void>
  {
    if(!this._isElectron) {
      if(optionalParams.length===0) {
        console.log(msg);
      } else {
        console.log(msg,optionalParams);
      }
    }
    return this.sendAsync<any>(jbdt.SDKClientActions.LOG_CLIENT,{...this._botData, level:"html",msg:msg,pars:optionalParams});
  }
  public async log(msg?: string, ...optionalParams: any[]): Promise<void>
  {
    if(!this._isElectron) {
      if(optionalParams.length===0) {
        console.log(msg);
      } else {
        console.log(msg,optionalParams);
      }
    }
    return this.sendAsync<any>(jbdt.SDKClientActions.LOG_CLIENT,{...this._botData, level:"info",msg:msg,pars:optionalParams});
  }
  public async clearAndError(msg:string, ...optionalParams: any[]): Promise<void>
  {
    if(!this._isElectron) {
      console.clear();
      if(optionalParams.length===0) {
        console.error(msg);
      } else {
        console.error(msg,optionalParams);
      }
    }
    return this.sendAsync<any>(jbdt.SDKClientActions.LOG_CLIENT,{...this._botData, level:"error",msg:msg,pars:optionalParams,clear:true});
  }
  public async clearAndLog(msg:string, ...optionalParams: any[]): Promise<void>
  {
    if(!this._isElectron) {
      console.clear();
      if(optionalParams.length===0) {
        console.log(msg);
      } else {
        console.log(msg,optionalParams);
      }
    }
    return this.sendAsync<any>(jbdt.SDKClientActions.LOG_CLIENT,{...this._botData, level:"info",msg:msg,pars:optionalParams,clear:true});
  }

  public async logApi(msg?: string, ...optionalParams: any[]): Promise<void>
  {
    if(!this._isElectron) {
      if(optionalParams.length===0) {
        console.log(msg);
      } else {
        console.log(msg,optionalParams);
      }
    }
    //todo: log only to instance who started the app (interbot-actions)
    return this.sendAsync<any>(jbdt.SDKClientActions.LOG_CLIENT,{...this._botData, level:"api",msg:msg,pars:optionalParams});
  }
}
