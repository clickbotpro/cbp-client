import * as jbdt from './CbpDataTypes';
export declare class CbpTabMouse {
    private data2Pass;
    private tabName;
    _sendAsync: (action: string, data: any) => void;
    constructor(_sendAsync: (action: string, data: any) => void, tabName: string);
    private sendAsync;
    clickLeft(x: number, y: number): Promise<boolean>;
    clickRight(x: number, y: number): Promise<boolean>;
    wheel(x: number, y: number): Promise<boolean>;
    moveTo(x: number, y: number): Promise<boolean>;
    clickLeftOnImage(imgName: string): Promise<number>;
    clickLeftOnElement(element: jbdt.HtmlElement): Promise<number>;
}
