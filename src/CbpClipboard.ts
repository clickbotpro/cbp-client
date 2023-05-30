import * as jbdt from './CbpDataTypes';

export class CbpClipboard
{

  public _sendAsync:(action: string, data: any)=>void;

  constructor(_sendAsync:(action: string, data: any)=>void)
  {
    this._sendAsync=_sendAsync;
  }

  private async sendAsync<T>(action: string, data: T): Promise<any>
  {
    return this._sendAsync(action,data);
  }

  public async writeText(text:string): Promise<void>
  {
    return this.sendAsync<jbdt.IClipboardData>(
      jbdt.SDKClientActions.CLIPBOARD,
      { operation:"writeText", data:text}
    );
  }

  public async writeRTF(text:string): Promise<void>
  {
    return this.sendAsync<jbdt.IClipboardData>(
      jbdt.SDKClientActions.CLIPBOARD,
      { operation:"writeRTF", data:text}
    );
  }

  public async readRTF(): Promise<string>
  {
    return this.sendAsync<jbdt.IClipboardData>(
      jbdt.SDKClientActions.CLIPBOARD,
      { operation:"readRTF"}
    );
  }

  public async readText(): Promise<string>
  {
    return this.sendAsync<jbdt.IClipboardData>(
      jbdt.SDKClientActions.CLIPBOARD,
      { operation:"readText"}
    );
  }

  public async readFilePaths(): Promise<Array<string>>
  {
    return this.sendAsync<jbdt.IClipboardData>(
      jbdt.SDKClientActions.CLIPBOARD,
      { operation:"readFilePaths"}
    );
  }

  public async writeFilePaths(paths:Array<string>): Promise<Array<string>>
  {
    return this.sendAsync<jbdt.IClipboardData>(
      jbdt.SDKClientActions.CLIPBOARD,
      { operation:"writeFilePaths",data:paths}
    );
  }

  public async readHTML(): Promise<string>
  {
    return this.sendAsync<jbdt.IClipboardData>(
      jbdt.SDKClientActions.CLIPBOARD,
      { operation:"readHTML"}
    );
  }

  public async clear(): Promise<string>
  {
    return this.sendAsync<jbdt.IClipboardData>(
      jbdt.SDKClientActions.CLIPBOARD,
      { operation:"clear"}
    );
  }

  public async writeHTML(html:string): Promise<string>
  {
    return this.sendAsync<jbdt.IClipboardData>(
      jbdt.SDKClientActions.CLIPBOARD,
      { operation:"writeHTML", data:html}
    );
  }

  public async paste(): Promise<string>
  {
    return this.sendAsync<jbdt.IClipboardData>(
      jbdt.SDKClientActions.CLIPBOARD,
      { operation:"paste"} 
    );
  }

}
