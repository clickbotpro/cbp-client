import * as jbdt from './CbpDataTypes';
import { CbpTabMouse } from "./CbpTabMouse";
import { CbpTabKeyboard } from './CbpTabKeyboard';
import { CbpWindow } from './CbpWindow';
export declare class CbpTab extends CbpWindow {
    private data2Pass;
    readonly tabName: string;
    readonly mouse: CbpTabMouse;
    readonly keyboard: CbpTabKeyboard;
    constructor(_sendAsync: (action: string, data: any) => void, tabName: string);
    getPars(): Promise<jbdt.ITabPars>;
    waitForFileChooser(files: Array<string>): Promise<void>;
    select(selector: string, ...values: Array<string>): Promise<void>;
    takeFullScreenshot(ttl?: number): Promise<string>;
    takeScreenshot(capture?: jbdt.ImagePosition, ttl?: number): Promise<string>;
    deleteScreenshots(screenshots?: Array<string>): Promise<number>;
    deleteScreenshot(screenshot: string): Promise<boolean>;
    gotoUrl(url: string): Promise<boolean>;
    present(fileName: string): Promise<void>;
    getElements(pars: {
        elementNames?: Array<string>;
        filters?: Array<string>;
    }): Promise<Array<jbdt.HtmlElement>>;
    getTextPos(text: string): Promise<Array<jbdt.ImagePosition>>;
    dropFilesIn(pos: jbdt.ImagePosition, files: Array<string>): Promise<boolean>;
    refresh(): Promise<void>;
    goBack(): Promise<void>;
    goForward(): Promise<void>;
    debugDrawRect(pos: Array<jbdt.ImagePosition> | jbdt.ImagePosition, options?: {
        border: 2;
        borderColor: "black";
    }): Promise<void>;
}
