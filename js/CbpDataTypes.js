"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BrowserPars = exports.ClientSource = exports.AdditionalLogOperations = exports.SDKClientActions = exports.BatchActions = void 0;
exports.BatchActions = {
    CLICK_ON_IMAGE: 'CLickOnImage',
    CLICK_ON_POS: 'CLICK_ON_POS',
    CLICK_ON_TEXT: 'CLICK_ON_TEXT',
    CLICK_ON_ELEMENT: 'CLICK_ON_ELEMENT',
};
exports.SDKClientActions = {
    OS_EXEC: "OS_EXEC",
    CLIPBOARD: "CLIPBOARD",
    WINDOW_ACTION: "WINDOW_ACTION",
    SERVICE: "SERVICE",
    PAUSE: "pause",
    INTERNAL_CLIENT_CONNECT: "INTERNAL_CLIENT_CONNECT",
    INTERNAL_CLIENT_DISCONNECT: "INTERNAL_CLIENT_DISCONNECT",
    INTERNAL_CLIENT_ERROR: "INTERNAL_CLIENT_ERROR",
    INTERNAL_CLIENT_SETUP: "setup",
    OPEN_BROWSER: "openBrowser",
    OPEN_TAB: 'openTab',
    GOTO_URL: 'gotoUrl',
    TAKE_SCREENSHOT: 'takeScreenshot',
    GET_SCREENSHOT: 'getScreenshot',
    DELETE_FILES: 'deleteFiles',
    CLOSE_TAB: 'closeTab',
    CLEAR_STORAGE_DATA: "clearStorageData",
    GET_BOT_NAMES_WITH_TABNAME: 'getBotNamesWithTabName',
    GET_TAB_PARS: "GET_TAB_PARS",
    TAB_WAIT_FOR_FILE_CHOOSER: "TAB_WAIT_FOR_FILE_CHOOSER",
    TAB_SELECT: "TAB_SELECT",
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
    COOKIES_LOAD: "coockiesLoad",
    COOKIES_SAVE: "coockiesSave",
    COOKIES_DELETE: "coockiesDelete",
    COOKIES_HAS: "coockiesHas",
    COOKIES_HAS_SAVED: "coockiesHasSaved",
    DESKTOP_LIST: "listDesktops",
    START_ANOTHER_BOT: "startAnotherBot",
    CHECK_ACCESSIBILITY_PERMISSIONS: "checkAccessibility",
    ERROR: 'error'
};
var AdditionalLogOperations;
(function (AdditionalLogOperations) {
    AdditionalLogOperations["MOUSE"] = "MOUSE";
    AdditionalLogOperations["KEYBOARD"] = "KEYBOARD";
    AdditionalLogOperations["ELEMENT_HIGHLIGHT"] = "ELEMENT_HIGHLIGHT";
    AdditionalLogOperations["IMAGE_CAPTURE"] = "IMAGE_CAPTURE";
})(AdditionalLogOperations = exports.AdditionalLogOperations || (exports.AdditionalLogOperations = {}));
var ClientSource;
(function (ClientSource) {
    ClientSource["BROWSER"] = "browser";
    ClientSource["DESKTOP"] = "desktop";
})(ClientSource = exports.ClientSource || (exports.ClientSource = {}));
class BrowserPars {
    constructor() {
        this.w = 800;
        this.h = 600;
        this.storeData = true;
        this.navigationTimeout = 30000;
        this.waitUntil = "networkidle2";
        this.hidden = true;
        this.consoleLogs = false;
        this.agent = "";
    }
}
exports.BrowserPars = BrowserPars;
