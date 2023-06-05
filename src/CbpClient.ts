import { WebSocket } from 'ws';

import * as jbdt from './CbpDataTypes';
import { CbpUtils } from './CbpUtils';
import { CbpLogger } from './CbpLogger';
import { CbpBrowser } from './CbpBrowser'; 
import { CbpDesktop } from './CbpDesktop'; 
import { CbpTabMouse } from './CbpTabMouse';
import { CbpTabKeyboard } from './CbpTabKeyboard';
import { CbpTab } from './CbpTab';
import { CbpServices } from './CbpServices';
import { CbpClipboard } from './CbpClipboard';
import { ExtStartArgs } from './CbpDataTypes';
import { CbpMessenger } from './CbpMessenger';
import path from 'path';
import fs from 'fs';

export * from './CbpDataTypes';
export * from './CbpTab';
export * from './CbpTabMouse';
export * from './CbpTabKeyboard';
export * from './CbpLogger';
export * from './CbpBrowser'; 
export * from './CbpDesktop';
export * from './CbpServices';
export * from './CbpClipboard';
export * from './CbpUtils';
export * from './CbpMessenger';

const tt:CbpTab|undefined=undefined;
const ctm:CbpTabMouse|undefined=undefined; 
const ctk:CbpTabKeyboard|undefined=undefined; 

export default class CbpClient 
{
  private wsclient: WebSocket | undefined = undefined;
  private callbacks: { [uid: number]: Function } = {};
  private callbackUids = 0;
  private readonly botName: string;
  private onConsoleInput?: Function;

  public onQueue?: (args:jbdt.ExtStartArgs) => boolean;
  public onWillClose?: () => void;
  public onSystemMessage?: (msg: string) => void;

  public readonly logger:CbpLogger;
  public readonly clipboard:CbpClipboard;
  public readonly services:CbpServices;
  public readonly desktops: { [id: number]: CbpDesktop } = {};
  public readonly anotherBotLogStreams: { [botName: string]: Function } = {};
  private readonly messengers: Array<CbpMessenger> = [];
  private browser?:CbpBrowser;
  
  constructor(botName?: string) {
    this.botName = botName || process.env.botName || this.getBotNameFromPackage();//fwhen there are no env vars (the bot is not running through cbp app), user can pass botName
    if(this.botName.length<3) {
      throw new Error("invalid bot name passed: "+botName);
    }
    this.connect = this.connect.bind(this);
    this.checkConnection=this.checkConnection.bind(this);
    this.sendAsync=this.sendAsync.bind(this);
    this.sendAsyncNoData=this.sendAsyncNoData.bind(this);
    this.logger=new CbpLogger(this.botName, this.sendAsync);
    this.services=new CbpServices(this.sendAsync);
    this.clipboard=new CbpClipboard(this.sendAsync);
  }

  public async getMessenger(messengerName:"whatsapp"):Promise<CbpMessenger>
  {
    const existing=this.messengers.find(m=>m.messengerName===messengerName);
    if(existing) {
      return existing;
    }
    const browser=await this.getBrowser();//this is important. we need to make sure the browser is open before we open the messenger
    const m=new CbpMessenger(this.sendAsync,messengerName);
    const data:jbdt.IMessengerData={operation:"open",messengerName};
    this.sendAsync(jbdt.SDKClientActions.MESSENGER,data);
    this.messengers.push(m);
    return m;
  }

  public closeMessenger(messengerName:"whatsapp"):boolean
  {
    const existing=this.messengers.find(m=>m.messengerName===messengerName);
    if(existing) {
      const data:jbdt.IMessengerData={operation:"close",messengerName};
      this.sendAsync(jbdt.SDKClientActions.MESSENGER,data);
      this.messengers.splice(this.messengers.indexOf(existing),1);
      return true;
    }
    return false;
  }

  private getBotNameFromPackage():string
  {
    const packageJsonPath=path.join(process.cwd(),"package.json");
    if(fs.existsSync(packageJsonPath)) {
      const json=JSON.parse(fs.readFileSync(packageJsonPath).toString());
      if(json.name) {
        return json.name;
      }
    }
  }

  public async exec(cmd:string):Promise<string>
  {
    let result=await this.sendAsync<string>(jbdt.SDKClientActions.OS_EXEC,cmd) as string;
    return result;
  }

  public async pause(sec:number=0):Promise<boolean>
  {
    let result=await this.sendAsync<number>(jbdt.SDKClientActions.PAUSE,sec) as boolean;
    return result;
  }

  public async disconnect(): Promise<void> {
    if(this===undefined) {
      throw new Error("disconnect this is undefined");
    }

    if(this.browser) {
      await this.browser.closeTab();
      delete this.browser;
    }

    for (const key in this.desktops) {
      delete this.desktops[key];
    }

    if (this.wsclient) {
      this.wsclient.terminate();
      delete this.wsclient;
    }
  }

  public isConnected(): boolean {
    if (!this.wsclient) {
      return false;
    }
    return this.wsclient.readyState == this.wsclient.OPEN;
  }

  private checkConnection():void
  {
    if(!this.isConnected()) {
      throw new Error("not connected. call connect() first");
    }
  }

  public getUserSettings():jbdt.IUserSettings
  {
    return CbpUtils.getUserSettings();
  }

  public async getBrowser(browserPars?:Partial<jbdt.BrowserPars>):Promise<CbpBrowser>
  {
    if(this.browser) {
      return this.browser;
    }
    const mergedPars:jbdt.BrowserPars={...new jbdt.BrowserPars(), ...browserPars};
    let result=await this.sendAsync<jbdt.BrowserPars>(jbdt.SDKClientActions.OPEN_BROWSER, mergedPars) as boolean;
    if(!result) {
      throw new Error("there was an error opening the browser");
    }
    this.browser=new CbpBrowser(this.sendAsync,mergedPars);
    return this.browser;
  }


  public async connect(cbpAppUrl?:string): Promise<void>
  {
    const localUrls=["ws://localhost:8080", "ws://127.0.0.1:8080"]
    const botFolder = process.cwd();//dirname(process.argv[1]);
    await this.disconnect();

    const start=async(url:string):Promise<void>=>{
      return new Promise((resolve, reject) => {
        // ws://localhost:8080
        //console.log(`JsBotSdkClient connecting to ${url}`);
        this.wsclient = new WebSocket(url);
        this.wsclient.onopen = () => {
          this.send('setup', { botName: this.botName,botFolder}, resolve);
        };
        this.wsclient.onmessage = (ws: any) => {
          this.handleIncomingMsg(ws.data);
        };
        this.wsclient.onerror = (ev) => {
          reject(ev);
        };
      });
    }
    if(typeof cbpAppUrl === "string") {
      await start(cbpAppUrl);
    } else {
      for(let i=0;i<localUrls.length;i++) {
        try {
          await start(localUrls[i]);
          return;
        } catch(e) {
          //
        }
      }
      throw new Error("Could not connect to ClickbotPro App. Make sure it is running and try again.");
    }
  }

  private handleIncomingMsg(strJson: string): void
  {
    const dataFromJson = JSON.parse(strJson);
    const uid  = dataFromJson.uid;
    const cb = this.callbacks[uid];
    if (cb) {
      delete this.callbacks[uid];
      try {
        cb(dataFromJson.data, dataFromJson.error);
      } catch (e) {
        console.error(`cbp-client error not caught by client ${e}`);
      }
    }

    if (uid == -128) {
      try {
        const d=dataFromJson.data as jbdt.IMessengerEvent;
        const messenger=this.messengers.find(m=>m.messengerName===d.messengerName);
        if(messenger) {
          messenger.onMessengerEvent(d);
        }
      } catch (e) {
        console.error(e);
      }
    }

    if (uid == -127) {
      try {
        if (this.onQueue) {
          const d=dataFromJson.data as jbdt.ExtStartArgs;
          this.onQueue(d);
        }
      } catch (e) {
        console.error(e);
      }
    }


    if (uid == -126) {
      try {
        if (this.browser) {
          const d=dataFromJson.data as jbdt.BrowserFileDownloadUpdate;
          this.browser.onBrowserFileDownloadUpdate(d);
        }
      } catch (e) {
        console.error(e);
      }
    }

    if (uid == -125) {
      try {
        const botName=dataFromJson.data.botName;
        if (botName && this.anotherBotLogStreams[botName]) {
          this.anotherBotLogStreams[botName](dataFromJson.data);
        }
      } catch (e) {
        console.error(e);
      }
    }

    if (uid == -124) {
      try {
        if (this.browser) {
          const newBd=dataFromJson.data as jbdt.BrowserData;
          this.browser.onBrowserDataUpdate(newBd);
        }
      } catch (e) {
        console.error(e);
      }
    }
    if (uid == -123) {
      try {
        if (this.onConsoleInput) {
          this.onConsoleInput(dataFromJson.data);
        }
      } catch (e) {
        console.error(e);
      }
    }

    if (uid == -122) {
      try {
        if (this.onWillClose) {
          this.onWillClose();
        }
      } catch (e) {
        console.error(e);
      }
    }

    if (uid == -121) {
      try {
        if (this.onSystemMessage) {
          this.onSystemMessage(dataFromJson.data as string);
        }
      } catch (e) {
        console.error(e);
      }
    }
  }

  public async getDesktopList():Promise<Array<CbpDesktop>>
  {
    let result=await this.sendAsync<any>(jbdt.SDKClientActions.DESKTOP_LIST, {}) as Array<jbdt.IDesktopData>;
    result.forEach((v)=>{
      if(!this.desktops[v.id]) {
        this.desktops[v.id]=new CbpDesktop(this.sendAsync,v);
      }
    });
    const ids=Object.keys(this.desktops);
    return ids.map<CbpDesktop>((id)=>this.desktops[(id)]);
  }

  //
  public async findImagesBase64(srcImgFileName: string, imgBase64: jbdt.ImageBase64): Promise<Array<jbdt.ImagePosition>>
  {
    return this.sendAsync<jbdt.IFindImagesBase64Data>(
      jbdt.SDKClientActions.FIND_IMAGES_BASE64,
      { srcImgFileName, imgBase64 }
    );
  }

  public async findImagesByName(srcImgFileName: string, imgName: string): Promise<Array<jbdt.ImagePosition>>
  {
    return this.sendAsync<jbdt.IFindImagesByNameData>(
      jbdt.SDKClientActions.FIND_IMAGES_BYNAME,
      { srcImgFileName, imgName }
    );
  }

  public async imageOperation(data:jbdt.IImageOperationData): Promise<string>
  {
    return this.sendAsync<jbdt.IImageOperationData>(jbdt.SDKClientActions.IMAGE_OPERATION,data);
  }

  public async drawRect(imgName: string, pos: Array<jbdt.ImagePosition>, thick = 1, clr = 0): Promise<string>
  {
    return this.sendAsync<jbdt.IDrawData>(
      jbdt.SDKClientActions.DRAW_RECT,
      {imgName,pos,clr,thick}
    );
  }

  public async waitForSec(sec: number): Promise<void>
  {
    return this.sendAsync<jbdt.IWaitData>(jbdt.SDKClientActions.WAIT, { sec });
  }

  public async getBotData(): Promise<jbdt.ClientBotData>
  {
    return this.sendAsyncNoData(jbdt.SDKClientActions.GET_BOT_DATA);
  }

  public async readText(imgName: string,lang?: string): Promise<string>
  {
    return this.sendAsync<jbdt.IReadText>(jbdt.SDKClientActions.READ_TEXT, {imgName,lang});
  }


  public async sendAsyncNoData(action: string): Promise<any>
  {
    return this.sendAsync<void>(action);
  }

  public async sendAsync<T>(action: string, data?: T): Promise<any> {
    this.checkConnection();
    return new Promise((resolve, reject) => {
      const sent = this.send(
        action,
        data,
        (responseData: any, responseErrorDesc: any) => {
          if (responseErrorDesc) {
            reject(responseErrorDesc);
          } else {
            resolve(responseData);
          }
        }
      );
      if (!sent) {
        reject(new Error('cant send because the client is not connected'));
      }
    });
  }

  private send(action:string, data?:any, callback?:Function): boolean {
    if (!this.isConnected()) {
      return false;
    }
    this.callbackUids++;
    if (callback) {
      this.callbacks[this.callbackUids] = callback;
    }
    const json = JSON.stringify({
      action,
      data,
      uid: this.callbackUids,
    });
    this.wsclient?.send(json);
    return true;
  }

  public async startAnotherBot(data:jbdt.IStartAnotherBot):Promise<string>
  {
    if(data.onLog) {
      this.anotherBotLogStreams[data.botName]=data.onLog;
    }
    return this.sendAsync<jbdt.IStartAnotherBot>(
      jbdt.SDKClientActions.START_ANOTHER_BOT,
      {botName:data.botName, data:data.data}
    );
  }

  public async checkAccessibilityPermissions():Promise<boolean>
  {
    return this.sendAsync<any>(
      jbdt.SDKClientActions.CHECK_ACCESSIBILITY_PERMISSIONS,
      {botName:this.botName}
    );
  }

  public getExtStartArgs():ExtStartArgs|undefined
  {
      return CbpUtils.getExtStartArgs();
  }
}
