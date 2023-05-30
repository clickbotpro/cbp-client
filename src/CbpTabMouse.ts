import * as jbdt from './CbpDataTypes';

export class CbpTabMouse
{
  private data2Pass:{source:jbdt.ClientSource, name:string};
  private tabName:string;
  public _sendAsync:(action: string, data: any)=>void;

  constructor(_sendAsync:(action: string, data: any)=>void, tabName:string)
  {
    this._sendAsync=_sendAsync;
    this.tabName=tabName;
    this.data2Pass={name:tabName, source:jbdt.ClientSource.BROWSER};
  }

  private async sendAsync<T>(action: string, data: T): Promise<any>
  {
    return this._sendAsync(action,data);
  }

  public async clickLeft(x: number, y: number): Promise<boolean>
  {
    return this.sendAsync<jbdt.IMouseOperationData>(
      jbdt.SDKClientActions.MOUSE_OPERATION,
      {...this.data2Pass, operation:"mouseLeftClick", x:x,y:y}
    );
  }

  public async clickRight(x: number, y: number): Promise<boolean>
  {
    return this.sendAsync<jbdt.IMouseOperationData>(
      jbdt.SDKClientActions.MOUSE_OPERATION,
      {...this.data2Pass, operation:"mouseRightClick", x:x,y:y}
    );
  }

  public async wheel(x: number, y: number): Promise<boolean>
  {
    return this.sendAsync<jbdt.IMouseOperationData>(
      jbdt.SDKClientActions.MOUSE_OPERATION,
      {...this.data2Pass, operation:"mouseWheel", x:x,y:y}
    );
  }

  public async moveTo(x: number, y: number): Promise<boolean>
  {
    return this.sendAsync<jbdt.IMouseOperationData>(
      jbdt.SDKClientActions.MOUSE_OPERATION,
      {...this.data2Pass, operation:"mouseMoveTo",x:x,y:y}
    );
  }

  public async clickLeftOnImage(imgName:string): Promise<number>
  {
    
    const screenshotImg:string = await this.sendAsync<jbdt.ITakeScreenshotData>(jbdt.SDKClientActions.TAKE_SCREENSHOT, {source:jbdt.ClientSource.BROWSER, name:this.tabName, full:false});
    const foundImages:Array<jbdt.ImagePosition>=await this.sendAsync<jbdt.IFindImagesByNameData>(jbdt.SDKClientActions.FIND_IMAGES_BYNAME, {imgName:imgName,srcImgFileName:screenshotImg});
    await this.sendAsync<jbdt.IDeleteFiles>(
      jbdt.SDKClientActions.DELETE_FILES,
      {...this.data2Pass, fileNames:[screenshotImg]}
    );
    if(foundImages.length===0) {
      return 0;
    }
    for(let i=0;i<foundImages.length;i++) {
      const imgPos=foundImages[i];
      await this.clickLeft(imgPos.x+imgPos.w/2,imgPos.y+imgPos.h/2);
    }
    return foundImages.length;
  }

  public async clickLeftOnElement(element:jbdt.HtmlElement): Promise<number>
  {
    const num= await this.sendAsync<jbdt.IClickOnElement>(
      jbdt.SDKClientActions.MOUSE_CLICK_ON_ELEMENT,
      {...this.data2Pass, element}
    );
    return num;
  }

}
