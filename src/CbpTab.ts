import * as jbdt from './CbpDataTypes';
import {CbpTabMouse} from "./CbpTabMouse";
import {CbpTabKeyboard} from './CbpTabKeyboard';
import { CbpWindow } from './CbpWindow';

export class CbpTab extends CbpWindow
{
  private data2Pass:{source:jbdt.ClientSource, name:string};

  public readonly tabName:string;
  public readonly mouse:CbpTabMouse;
  public readonly keyboard:CbpTabKeyboard;
  
  constructor(_sendAsync:(action: string, data: any)=>void, tabName:string)
  {
    super(_sendAsync,tabName);
    this.tabName=tabName;
    this.mouse=new CbpTabMouse(this._sendAsync,tabName);
    this.keyboard=new CbpTabKeyboard(this._sendAsync,tabName);
    this.data2Pass={source:jbdt.ClientSource.BROWSER, name:tabName};
  }

  public async getPars():Promise<jbdt.ITabPars>
  {
    const tabName=this.tabName;
    return this.sendAsync<any>(jbdt.SDKClientActions.GET_TAB_PARS,{tabName});
  }


  public async waitForFileChooser(files:Array<string>):Promise<void>
  {
    return this.sendAsync<jbdt.IFileChooserData>(
      jbdt.SDKClientActions.TAB_WAIT_FOR_FILE_CHOOSER,
      {...this.data2Pass, files:files}
    );
  }

  public async select(selector:string, ...values:Array<string>):Promise<void>
  {
    //await page.select('select[name="choose1"]', 'val2');
    return this.sendAsync<jbdt.ITabSelectData>(
      jbdt.SDKClientActions.TAB_SELECT,
      {...this.data2Pass, selector, values}
    );
  }

  public async takeFullScreenshot(ttl?:number): Promise<string>
  {
    return this.sendAsync<jbdt.ITakeScreenshotData>(
      jbdt.SDKClientActions.TAKE_SCREENSHOT,
      {...this.data2Pass, ttl, full:true }
    );
  }

  public async takeScreenshot(capture?:jbdt.ImagePosition, ttl?:number): Promise<string>
  {
    if(typeof(capture)==="undefined") {
      const tabPars=await this.getPars();
      capture={x:0,y:0,w:tabPars.w,h:tabPars.h};
    }
    return this.sendAsync<jbdt.ITakeScreenshotData>(
      jbdt.SDKClientActions.TAKE_SCREENSHOT,
      {...this.data2Pass, capture, ttl, full:false}
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

  public async gotoUrl(url: string): Promise<boolean>
  {
    return this.sendAsync<jbdt.IGotoUrlData>(
      jbdt.SDKClientActions.GOTO_URL,
      {tabName:this.tabName,url:url}
    );
  }

  public async present(fileName: string): Promise<void>
  {
    return this.sendAsync<jbdt.IPresentData>(
      jbdt.SDKClientActions.PRESENT,
      {...this.data2Pass, fileName:fileName}
    );
  }

  public async getElements(pars:{elementNames?:Array<string>,filters?: Array<string>}): Promise<Array<jbdt.HtmlElement>>
  {
    return this.sendAsync<jbdt.IGetElements>(
      jbdt.SDKClientActions.GET_ELEMENTS,
      {tabName:this.tabName, filters:pars.filters, elementNames:pars.elementNames}
    );
  }

  public async getTextPos(text: string): Promise<Array<jbdt.ImagePosition>>
  {
    return this.sendAsync<jbdt.IGetTextPos>(
      jbdt.SDKClientActions.GET_TEXT_POS, {tabName:this.tabName,text:text}
    );
  }

  public async dropFilesIn(pos: jbdt.ImagePosition, files: Array<string>): Promise<boolean>
  {
    const filePaths=files.map((fullPath:string)=>{return {filePath: fullPath} as jbdt.IFilePath});
    return this.sendAsync<jbdt.IDropFilesIn>(jbdt.SDKClientActions.DROP_FILES_IN, {
      tabName:this.tabName, pos:pos, files: filePaths
    });
  }
  
  /*
  public async loadCookies(): Promise<boolean>
  {
    return this.sendAsync<string>(jbdt.SDKClientActions.COOKIES_LOAD, this.tabName);
  }

  public async saveCookies(): Promise<boolean>
  {
    return this.sendAsync<string>(jbdt.SDKClientActions.COOKIES_SAVE, this.tabName);
  }

  public async deleteCookies(): Promise<boolean>
  {
    return this.sendAsync<string>(jbdt.SDKClientActions.COOKIES_DELETE, this.tabName);
  }

  public async hasCookies(): Promise<boolean>
  {
    return this.sendAsync<string>(jbdt.SDKClientActions.COOKIES_HAS, this.tabName);
  }

  public async hasSavedCookies(): Promise<boolean>
  {
    return this.sendAsync<string>(jbdt.SDKClientActions.COOKIES_HAS_SAVED, this.tabName);
  }*/


  public async refresh(): Promise<void>
  {
    return this.sendAsync<jbdt.ITabRefresh>(jbdt.SDKClientActions.TAB_OPERATION, {tabName:this.tabName,operation:"refresh"});
  }

  public async goBack(): Promise<void>
  {
    return this.sendAsync<jbdt.ITabRefresh>(jbdt.SDKClientActions.TAB_OPERATION, {tabName:this.tabName,operation:"goBack"});
  }

  public async goForward(): Promise<void>
  {
    return this.sendAsync<jbdt.ITabRefresh>(jbdt.SDKClientActions.TAB_OPERATION, {tabName:this.tabName,operation:"goForward"});
  }

  public async debugDrawRect(pos: Array<jbdt.ImagePosition>|jbdt.ImagePosition, options?:{border:2, borderColor:"black"}): Promise<void>
  {
    if(!options) {
      options={border:2, borderColor:"black"};
    }
    if(!Array.isArray(pos)) {
      pos=[pos];
    }
    return this.sendAsync<jbdt.IDebugDrawData>(
      jbdt.SDKClientActions.DEBUG_DRAW_RECT,
      {...this.data2Pass,pos,borderColor:options.borderColor,border:options.border}
    );
  }

}
