export declare const BatchActions: {
    CLICK_ON_IMAGE: string;
    CLICK_ON_POS: string;
    CLICK_ON_TEXT: string;
    CLICK_ON_ELEMENT: string;
};
export declare const SDKClientActions: {
    OS_EXEC: string;
    CLIPBOARD: string;
    MESSENGER: string;
    WINDOW_ACTION: string;
    SERVICE: string;
    PAUSE: string;
    INTERNAL_CLIENT_CONNECT: string;
    INTERNAL_CLIENT_DISCONNECT: string;
    INTERNAL_CLIENT_ERROR: string;
    INTERNAL_CLIENT_SETUP: string;
    OPEN_BROWSER: string;
    OPEN_TAB: string;
    GOTO_URL: string;
    TAKE_SCREENSHOT: string;
    GET_SCREENSHOT: string;
    DELETE_FILES: string;
    CLOSE_TAB: string;
    CLEAR_STORAGE_DATA: string;
    GET_BOT_NAMES_WITH_TABNAME: string;
    GET_TAB_PARS: string;
    TAB_WAIT_FOR_FILE_CHOOSER: string;
    TAB_SELECT: string;
    FIND_IMAGES_BASE64: string;
    FIND_IMAGES_BYNAME: string;
    IMAGE_OPERATION: string;
    MOUSE_OPERATION: string;
    MOUSE_CLICK_ON_ELEMENT: string;
    KEYBOARD_OPERATION: string;
    EVALUATE: string;
    TAB_OPERATION: string;
    DRAW_RECT: string;
    DEBUG_DRAW_RECT: string;
    PRESENT: string;
    WAIT: string;
    GET_ELEMENTS: string;
    GET_BOT_DATA: string;
    GET_TEXT_POS: string;
    DROP_FILES_IN: string;
    READ_TEXT: string;
    LOG_CLIENT: string;
    COOKIES_LOAD: string;
    COOKIES_SAVE: string;
    COOKIES_DELETE: string;
    COOKIES_HAS: string;
    COOKIES_HAS_SAVED: string;
    DESKTOP_LIST: string;
    START_ANOTHER_BOT: string;
    CHECK_ACCESSIBILITY_PERMISSIONS: string;
    ERROR: string;
};
export interface IClipboardData {
    operation: "writeText" | "readText" | "paste" | "readRTF" | "writeRTF" | "clear" | "readHTML" | "writeHTML" | "readFilePaths" | "writeFilePaths";
    data?: any;
}
export interface IMessengerEvent {
    event: "isReady" | "receiveMessage" | "doLogin";
    data?: any;
    messengerName: string;
}
export interface IMessengerData {
    operation: "logout" | "getContacts" | "getChats" | "getMessages" | "sendMessage" | "sendFiles" | "close" | "open";
    data?: any;
    messengerName: string;
}
export declare enum AdditionalLogOperations {
    MOUSE = "MOUSE",
    KEYBOARD = "KEYBOARD",
    ELEMENT_HIGHLIGHT = "ELEMENT_HIGHLIGHT",
    IMAGE_CAPTURE = "IMAGE_CAPTURE"
}
export declare enum ClientSource {
    BROWSER = "browser",
    DESKTOP = "desktop"
}
export interface IScheduleData {
    runBotOnAppStart: {
        value: boolean;
        default: boolean;
        visible: boolean;
    };
    runNextFixedDate: {
        value: string;
        default: string;
        visible: boolean;
    };
    runBotLoop: {
        value: boolean;
        default: boolean;
        visible: boolean;
    };
    runAfter: {
        value: string;
        default: string;
        visible: boolean;
    };
    runFoldersChange: {
        value: Array<string>;
        default: Array<string>;
        enableFlag: boolean;
        visible: boolean;
        fileExtensions: Array<string>;
    };
    runShortcuts: {
        value: Array<string>;
        default: Array<string>;
        enableFlag: boolean;
        visible: boolean;
    };
    runCron: {
        minute: string;
        hour: string;
        dayMonth: string;
        month: string;
        dayWeek: string;
        enableFlag: boolean;
        visible: boolean;
    };
}
export interface ExtStartArgs {
    startInitiator: "appStart" | "manualStart" | "timed" | "folderChange" | "loop" | "otherBot" | "batchmode" | "shortcut";
    changedFiles?: Array<string>;
    otherBotName?: string;
    otherBotData?: IAnotherBotData;
    shortcut?: string;
}
export interface IBrowserDataUpdate {
    browserData: BrowserData;
}
export interface ITabPars {
    loading: boolean;
    w: number;
    h: number;
    hidden: boolean;
}
export interface IOpenTabData {
    tabName: string;
    url?: string;
    w?: number;
    h?: number;
    hidden?: boolean;
}
export interface IGotoUrlData {
    tabName: string;
    url: string;
}
export interface IWindowActionData {
    target: "window" | "webContents";
    tabName: string;
    functionName: string;
    args?: Array<any>;
}
export interface ITakeScreenshotData {
    name: string;
    source: ClientSource;
    full: boolean;
    capture?: ImagePosition;
    ttl?: number;
}
export interface IFileChooserData {
    name: string;
    source: ClientSource;
    files: Array<string>;
}
export interface ITabSelectData {
    name: string;
    source: ClientSource;
    selector: string;
    values: Array<string>;
}
export interface IClickOnElement {
    name: string;
    source: ClientSource;
    element: HtmlElement;
}
export interface IDeleteFiles {
    name: string;
    source: ClientSource;
    fileNames: Array<string>;
}
export interface IPresentData {
    name: string;
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
export type KeyboardOperationType = "keyboardType" | "keyboardBackspace" | "keyboardCopy" | "keyboardPaste" | "keyboardPress" | "keyboardRelease" | "keyboardReload";
export type MouseOperationType = "mouseMoveTo" | "mouseLeftClick" | "mouseRightClick" | "mouseWheel";
export interface IMouseOperationData {
    operation: MouseOperationType;
    name: string;
    source: ClientSource;
    x: number;
    y: number;
}
export interface IClickLeftSelectorData {
    tabName: string;
    selector: string;
}
export interface IKeyboardOperationData {
    operation: KeyboardOperationType;
    name: string;
    source: ClientSource;
    text: string;
    delay?: number;
}
export interface IEvaluateJsData {
    tabName: string;
    js: string;
}
export interface ITabRefresh {
    tabName: string;
    operation: "refresh" | "goBack" | "goForward";
}
export type BotLogScope = 'ADDITIONAL' | 'BOTPROCESS' | 'BROWSER_CONSOLE_LOG';
export interface IBotLogData {
    botName: string;
    msg: string;
    pars?: any;
    scope: BotLogScope;
    level: 'error' | 'warn' | 'info' | 'verbose' | 'debug' | 'silly' | 'image' | 'html';
    time?: string;
    clear?: boolean;
}
export interface IDrawData {
    imgName: string;
    pos: Array<ImagePosition>;
    clr: number;
    thick: number;
}
export interface IImageOperationData {
    scale?: {
        x?: number;
        y?: number;
    };
    resize?: {
        w?: number;
        h?: number;
    };
    imgName: string;
}
export interface IDebugDrawData {
    name: string;
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
    elementNames?: Array<string>;
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
    lang?: string;
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
    id?: string;
    value?: string;
    text?: string;
    title?: string;
    href?: string;
    class?: string;
    src?: string;
}
export interface ImageBase64 {
    encodedData: string;
}
export declare class BrowserPars {
    w: number;
    h: number;
    storeData: boolean;
    navigationTimeout: number;
    waitUntil: "networkidle2" | "domcontentloaded" | "load";
    hidden: boolean;
    consoleLogs: boolean;
    agent: string;
}
export interface BrowserTabData {
    tabName: string;
    imgFilePath?: IFilePath;
    loading: boolean;
}
export interface BrowserFileDownloadUpdate {
    filePath: string;
    state: "cancelled" | "interrupted" | "completed" | "will-download";
}
export interface BrowserData {
    pars: BrowserPars;
    tabs: Array<BrowserTabData>;
}
export interface ClientBotData {
    browser?: BrowserData;
    tmpFolder: string;
    outputFolder: string;
}
export interface IFilePath {
    filePath: string;
}
export interface IUploadFile {
    tabName: string;
    file: IFilePath;
}
export interface IDesktopData {
    name: string;
    primary: boolean;
    id: string;
}
export interface IAnotherBotData {
    dataRow: Array<{
        id: string;
        value: string;
    }>;
}
export interface IStartAnotherBot {
    botName: string;
    data?: IAnotherBotData;
    onLog?: (msg: string) => void;
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
    receiver?: string;
    content: string;
    serviceName: "email" | "sms" | "chatgpt";
    from?: string;
    subject?: string;
    attachments?: Array<string>;
}
export interface IUserSettings {
    devMode: boolean;
    tmpFolderPath: string;
    outputFolderPath: string;
    hasEmail: boolean;
    hasSms: boolean;
}
export interface IMessengerContact {
    name?: string;
    email?: string;
    phone?: string;
    id?: string;
    isMe: boolean;
    isGroup: boolean;
}
export interface IMessengerChat {
    chatId: string;
    name: string;
    isGroup: boolean;
}
export interface IMessengerMsg {
    id: string;
    timestamp: number;
    from?: string;
    author?: string;
    body: string;
    fromMe: boolean;
    type: string;
}
