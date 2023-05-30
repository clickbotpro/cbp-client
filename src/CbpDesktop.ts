import * as jbdt from './CbpDataTypes';

export class CbpDesktop
{
  private data2Pass:{source:jbdt.ClientSource, name:string};
  public readonly data:jbdt.IDesktopData;
  public _sendAsync:(action: string, data: any)=>void;

  constructor(_sendAsync:(action: string, data: any)=>void, data:jbdt.IDesktopData)
  {
    this.data=data;
    this._sendAsync=_sendAsync;
    this.sendAsync=this.sendAsync.bind(this);
    this.sendAsyncNoData=this.sendAsyncNoData.bind(this);
    this.data2Pass={source:jbdt.ClientSource.DESKTOP, name:data.name};
  }

  private async sendAsync<T>(action: string, data: T): Promise<any>
  {
    return this._sendAsync(action,data);
  }

  private async sendAsyncNoData(action: string): Promise<any>
  {
    return this._sendAsync(action,{});
  }

  public async takeScreenshot(capture?:jbdt.ImagePosition, ttl?:number): Promise<string>
  {
    return this.sendAsync<jbdt.ITakeScreenshotData>(
      jbdt.SDKClientActions.TAKE_SCREENSHOT,
      {...this.data2Pass, capture, ttl, full:false }
    );
  }

  public async deleteScreenshots(screenshots?:Array<string>): Promise<number>
  {
    return this.sendAsync<jbdt.IDeleteFiles>(
      jbdt.SDKClientActions.DELETE_FILES,
      {...this.data2Pass, fileNames:screenshots }
    );
  }

  public async deleteScreenshot(screenshot:string): Promise<boolean>
  {
    const totalDeleted=await this.sendAsync<jbdt.IDeleteFiles>(
      jbdt.SDKClientActions.DELETE_FILES,
      {...this.data2Pass, fileNames:[screenshot] }
    );
    return totalDeleted>0;
  }

  public async present(fileName: string): Promise<void>
  {
    return this.sendAsync<jbdt.IPresentData>(
      jbdt.SDKClientActions.PRESENT,
      {...this.data2Pass, fileName:fileName}
    );
  }


}
