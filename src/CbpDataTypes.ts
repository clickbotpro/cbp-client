export const BatchActions = {
  CLICK_ON_IMAGE: 'CLickOnImage',
  CLICK_ON_POS: 'CLICK_ON_POS',
  CLICK_ON_TEXT: 'CLICK_ON_TEXT',
  CLICK_ON_ELEMENT: 'CLICK_ON_ELEMENT',
};

export const SDKClientActions = {

  OS_EXEC:"OS_EXEC",
  CLIPBOARD:"CLIPBOARD",
  MESSENGER:"MESSENGER",
  WINDOW_ACTION:"WINDOW_ACTION",

  SERVICE:"SERVICE",
  PAUSE:"pause",
  
  INTERNAL_CLIENT_CONNECT:"INTERNAL_CLIENT_CONNECT",
  INTERNAL_CLIENT_DISCONNECT:"INTERNAL_CLIENT_DISCONNECT",
  INTERNAL_CLIENT_ERROR:"INTERNAL_CLIENT_ERROR",
  INTERNAL_CLIENT_SETUP:"setup",

  //actions coming from the sdk client
  OPEN_BROWSER:"openBrowser",
  OPEN_TAB: 'openTab',
  GOTO_URL: 'gotoUrl',
  TAKE_SCREENSHOT: 'takeScreenshot',
  GET_SCREENSHOT: 'getScreenshot',
  DELETE_FILES: 'deleteFiles',
  CLOSE_TAB: 'closeTab',
  CLEAR_STORAGE_DATA:"clearStorageData",
  GET_BOT_NAMES_WITH_TABNAME: 'getBotNamesWithTabName',

  GET_TAB_PARS:"GET_TAB_PARS",
  TAB_WAIT_FOR_FILE_CHOOSER:"TAB_WAIT_FOR_FILE_CHOOSER",
  TAB_SELECT:"TAB_SELECT",

  FIND_IMAGES_BASE64: 'findImagesBase64',
  FIND_IMAGES_BYNAME: 'findImagesByName',
  IMAGE_OPERATION: 'IMAGE_OPERATION',

  MOUSE_OPERATION: 'mouseOperation',
  MOUSE_CLICK_ON_ELEMENT: 'clickOnElement',

  KEYBOARD_OPERATION: 'keyboardOperation',
  EVALUATE: 'evaluate',
  TAB_OPERATION: 'tabOperation',
  DRAW_RECT: 'drawRect',
  DEBUG_DRAW_RECT: 'debugDrawRect',
  PRESENT: 'present',
  WAIT: 'wait',
  GET_ELEMENTS: 'getElements',
  GET_BOT_DATA: 'getBotData',
  GET_TEXT_POS: 'getTextPos',
  DROP_FILES_IN: 'dropFilesIn',
  READ_TEXT: 'readText',

  LOG_CLIENT: 'logClient',
  //LOG_BROWSER_CONSOLE: 'browserConsole',

  COOKIES_LOAD:"coockiesLoad",
  COOKIES_SAVE:"coockiesSave",
  COOKIES_DELETE:"coockiesDelete",
  COOKIES_HAS:"coockiesHas",
  COOKIES_HAS_SAVED:"coockiesHasSaved",

  DESKTOP_LIST:"listDesktops",
  START_ANOTHER_BOT:"startAnotherBot",
  CHECK_ACCESSIBILITY_PERMISSIONS:"checkAccessibility",
  //SEND_MAIL:"sendMail",
  //
  ERROR: 'error'
};


export interface IClipboardData {
  operation: "writeText" | "readText" | "paste" | "readRTF" | "writeRTF"|"clear"|"readHTML"|"writeHTML"|"readFilePaths"|"writeFilePaths";
  data?: any;
}


export interface IMessengerEvent {
  event: "isReady" | "receiveMessage" | "doLogin";
  data?: any;
  messengerName:string;
}

export interface IMessengerData {
  operation: "logout"|"getContacts" | "getChats" | "getMessages" | "sendMessage" |"sendFiles" | "close" | "open";
  data?: any;
  messengerName:string;
}

export enum AdditionalLogOperations {
  MOUSE="MOUSE",
  KEYBOARD="KEYBOARD",
  ELEMENT_HIGHLIGHT="ELEMENT_HIGHLIGHT",
  IMAGE_CAPTURE="IMAGE_CAPTURE"
}

export enum ClientSource {
  BROWSER="browser",
  DESKTOP="desktop"
}

export interface IScheduleData{
  runBotOnAppStart:{value:boolean,default:boolean,visible:boolean};
  runNextFixedDate:{value:string,default:string,visible:boolean};
  runBotLoop:{value:boolean,default:boolean,visible:boolean};
  runAfter:{value:string,default:string,visible:boolean};
  runFoldersChange:{value:Array<string>,default:Array<string>,enableFlag:boolean,visible:boolean,fileExtensions:Array<string>};
  runShortcuts:{value:Array<string>,default:Array<string>,enableFlag:boolean,visible:boolean};
  runCron:{ minute:string, hour:string, dayMonth:string,month:string,dayWeek:string,enableFlag:boolean,visible:boolean};
}

export interface ExtStartArgs {
    startInitiator: "appStart"|"manualStart"|"timed"|"folderChange"|"loop"|"otherBot"|"batchmode"|"shortcut";
    changedFiles?: Array<string>;//only set when startInitiator is folderChange
    otherBotName?:string;//only set when startInitiator is otherBot afterOtherBot
    otherBotData?:IAnotherBotData;
    shortcut?:string;
}


export interface IBrowserDataUpdate {
  browserData: BrowserData;
}


export interface ITabPars {
  loading:boolean;
  w:number;
  h:number;
  hidden:boolean;
}

export interface IOpenTabData {
  tabName: string;
  url?: string;
  w?:number;
  h?:number;
  hidden?:boolean;
}

export interface IGotoUrlData {
  tabName: string;
  url: string;
}

export interface IWindowActionData {
  target:"window"|"webContents";
  tabName: string;
  functionName: string;
  args?: Array<any>;
}

export interface ITakeScreenshotData { 
  name: string;//in case of browser its tabName, in case of desktop its desktopName
  source: ClientSource;
  full:boolean;
  capture?: ImagePosition;//if undefined, capture full page.
  ttl?:number;
}

export interface IFileChooserData {
  name: string;//in case of browser its tabName, in case of desktop its desktopName
  source: ClientSource;
  files:Array<string>;
}

export interface ITabSelectData {
  name: string;//in case of browser its tabName, in case of desktop its desktopName
  source: ClientSource;
  selector:string;
  values:Array<string>;
}

export interface IClickOnElement {
  name: string;//in case of browser its tabName, in case of desktop its desktopName
  source: ClientSource;
  element:HtmlElement
}

export interface IDeleteFiles {
  name: string;//in case of browser its tabName, in case of desktop its desktopName
  source: ClientSource;
  fileNames:Array<string>
}

export interface IPresentData {
  name: string;//in case of browser its tabName, in case of desktop its desktopName
  source: ClientSource;
  fileName: string;
}
export interface IGetScreenshotData {
  fileName: string;
}
export interface ICloseTabData {
  tabNames?: Array<string>;
}
export interface IFindImagesBase64Data {
  srcImgFileName: string;
  imgBase64: ImageBase64;
}
export interface IFindImagesByNameData {
  srcImgFileName: string;
  imgName: string;
}

export type KeyboardOperationType = "keyboardType"|"keyboardBackspace"|"keyboardCopy"|"keyboardPaste"|"keyboardPress"|"keyboardRelease"|"keyboardReload";
export type MouseOperationType = "mouseMoveTo"|"mouseLeftClick"|"mouseRightClick"|"mouseWheel";

export interface IMouseOperationData
{
  operation:MouseOperationType;
  name: string;//in case of browser its tabName, in case of desktop its desktopName
  source: ClientSource;
  x: number;
  y: number;
}

export interface IClickLeftSelectorData {
  tabName: string;
  selector: string;
}
export interface IKeyboardOperationData {
  operation:KeyboardOperationType;
  name: string;//in case of browser its tabName, in case of desktop its desktopName
  source: ClientSource;
  text: string;
  delay?:number;
}
export interface IEvaluateJsData {
  tabName: string;
  js: string;
}
export interface ITabRefresh {
  tabName: string;
  operation:"refresh"|"goBack"|"goForward";
}

export type BotLogScope = 'ADDITIONAL' | 'BOTPROCESS' | 'BROWSER_CONSOLE_LOG';
export interface IBotLogData {
  botName:string;
  msg: string;
  pars?: any;
  scope: BotLogScope;
  level: 'error' | 'warn' | 'info' | 'verbose' | 'debug' | 'silly' | 'image' | 'html';
  time?:string;
  clear?: boolean;
}
export interface IDrawData {
  imgName: string;
  pos: Array<ImagePosition>;
  clr: number;
  thick: number;
}


export interface IImageOperationData {
  scale?: {x?:number,y?:number};
  resize?: {w?:number,h?:number};
  imgName: string;
}

export interface IDebugDrawData {
  name: string;//in case of browser its tabName, in case of desktop its desktopName
  source: ClientSource;
  pos: Array<ImagePosition>;
  borderColor: string;
  border: number;
}
export interface IWaitData {
  sec: number;
}
export interface IActionsCounterData {
  action: string;
  counter: number;
}
export interface IGetElements {
  tabName: string;
  elementNames?:Array<string>;
  filters?: Array<string>;
}
export interface IGetTextPos {
  tabName: string;
  text: string;
}
export interface IDropFilesIn {
  tabName: string;
  pos: ImagePosition;
  files: Array<IFilePath>;
  
}

export interface ISelectFiles {
  tabName: string;
  files: Array<IFilePath>;
  
}

export interface IReadText {
  imgName: string;
  lang?:string;
}

export interface ImagePosition {
  x: number;
  y: number;
  w: number;
  h: number;
  scale?: number;
}

export interface HtmlElement {
  name: string;
  type: string;
  pos: ImagePosition;
  //
  id?: string;
  value?: string;
  text?: string;
  title?:string;
  href?:string;
  class?:string;
  src?:string;
}

export interface ImageBase64 {
  encodedData: string;
}

export class BrowserPars {
  w: number = 800;
  h: number = 600;
  storeData:boolean=true;
  //stealth:boolean=false;
  //adblock:boolean=false;
  //args: Array<string> = [];
  //visible:boolean=true;
  navigationTimeout: number = 30000;
  waitUntil:"networkidle2"|"domcontentloaded"|"load"="networkidle2";
  hidden:boolean=true;
  consoleLogs:boolean=false;
  agent:string="";//Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/105.0.5195.52 Safari/537.36
}

export interface BrowserTabData
{
  tabName:string;
  imgFilePath?:IFilePath;//screenshot file path
  loading:boolean;
}

export interface BrowserFileDownloadUpdate {
  filePath:string;
  state:"cancelled"|"interrupted"|"completed"|"will-download";
}

export interface BrowserData {
  pars:BrowserPars;
  tabs: Array<BrowserTabData>;
}

export interface ClientBotData {
  browser?:BrowserData;
  tmpFolder:string;
  outputFolder:string;
}

export interface IFilePath {
  filePath: string;
}

export interface IUploadFile {
  tabName:string;
  file:IFilePath;
}

export interface IDesktopData {
  name: string;
  primary: boolean;
  id:string;
}

export interface IAnotherBotData
{
  dataRow:Array<{id:string,value:string}>;
}
export interface IStartAnotherBot {
  botName: string;
  data?:IAnotherBotData;
  onLog?:(msg:string)=>void;
}

export interface IServiceDataChatGptContent {
  model: string;
  temperature: number;
  max_tokens: number;
  messages: Array<{
      role: "system" | "user" | "assistant";
      msg: string;
  }>;
}

export interface IServiceData { 
    receiver?: string;//email or phone
    content: string;//sms content or email body, or chatgpt string {model:string, temperature:number, max_tokens:number};
    serviceName:"email" | "sms" | "chatgpt";
    //for email
    from?:string;
    subject?: string;
    attachments?: Array<string>;
    //for chatgpt
}

export interface IUserSettings
{
  devMode:boolean;
  tmpFolderPath:string;
  outputFolderPath:string;
  hasEmail:boolean,
  hasSms:boolean
}

export interface IMessengerContact {
  name?:string;
  email?:string;
  phone?:string;
  id?:string;
  isMe:boolean;  
  isGroup:boolean;
}

export interface IMessengerChat {
  chatId:string;
  name:string;
  isGroup:boolean;
}

export interface IMessengerMsg {
  id:string;
  timestamp:number;
  from?:string;
  author?:string;
  body:string;
  fromMe:boolean;
  type:string;
}