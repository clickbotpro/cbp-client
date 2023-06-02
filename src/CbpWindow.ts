import * as jbdt from "./CbpDataTypes";

export class CbpWindow {
  public _sendAsync: (action: string, data: any) => void;
  private _tabName: string;
  constructor(
    _sendAsync: (action: string, data: any) => void,
    tabName: string
  ) {
    this._sendAsync = _sendAsync;
    this._tabName = tabName;
  }
  public async sendAsync<T>(action: string, data: T): Promise<any> {
    return this._sendAsync(action, data);
  }

  private async sendWindowAction(
    functionName: string,
    args?: Array<any>
  ): Promise<any> {
    return this.sendAsync<jbdt.IWindowActionData>(
      jbdt.SDKClientActions.WINDOW_ACTION,
      { target:"window", tabName: this._tabName, functionName, args }
    );
  }

  private async sendWindowWebContentsAction(
    functionName: string,
    args?: Array<any>
  ): Promise<any> {
    return this.sendAsync<jbdt.IWindowActionData>(
      jbdt.SDKClientActions.WINDOW_ACTION,
      { target:"webContents", tabName: this._tabName, functionName, args }
    );
  }

  //webcontants actions

  /**
   * Executes the editing command `copy` in web page.
   */
  async copy(): Promise<void> {
    return this.sendWindowWebContentsAction("copy");
  }

  /**
   * Copy the image at the given position to the clipboard.
   */
  async copyImageAt(x: number, y: number): Promise<void> {
    return this.sendWindowWebContentsAction("copyImageAt", [x, y]);
  }

  /**
   * Executes the editing command `cut` in web page.
   */
  async cut(): Promise<void> {
    return this.sendWindowWebContentsAction("cut");
  }

  /**
   * Executes the editing command `delete` in web page.
   */
  async delete(): Promise<void> {
    return this.sendWindowWebContentsAction("delete");
  }

  /**
   * The request id used for the request.
   *
   * Starts a request to find all matches for the `text` in the web page. The result
   * of the request can be obtained by subscribing to `found-in-page` event.
   */
  async findInPage(text: string, options?: any): Promise<number> {
    return this.sendWindowWebContentsAction("findInPage", [text, options]);
  }

  /**
   * Stops any `findInPage` request for the `webContents` with the provided `action`.
   */
  async stopFindInPage(
    action: "clearSelection" | "keepSelection" | "activateSelection"
  ): Promise<void> {
    return this.sendWindowWebContentsAction("stopFindInPage", [action]);
  }

  /**
   * Inserts `text` to the focused element.
   */
  async insertText(text: string): Promise<void> {
    return this.sendWindowWebContentsAction("insertText", [text]);
  }

  /**
   * Starts inspecting element at position (`x`, `y`).
   */
  async inspectElement(x: number, y: number): Promise<void> {
    return this.sendWindowWebContentsAction("inspectElement", [x, y]);
  }

  /**
   * Executes the editing command `paste` in web page.
   */
  async paste(): Promise<void> {
    return this.sendWindowWebContentsAction("paste");
  }

  /**
   * Reloads current page and ignores cache.
   */
  async reloadIgnoringCache(): Promise<void> {
    return this.sendWindowWebContentsAction("reloadIgnoringCache");
  }

  /*async clearCache(): Promise<void>
  {
    return this.sendWindowWebContentsAction("clearCache");
  }*/

  /**
   * Executes the editing command `replace` in web page.
   */
  async replace(text: string): Promise<void> {
    return this.sendWindowWebContentsAction("replace", [text]);
  }

  /**
   * Executes the editing command `selectAll` in web page.
   */
  async selectAll(): Promise<void> {
    return this.sendWindowWebContentsAction("selectAll");
  }

  /**
   * Overrides the user agent for this web page.
   */
  async setUserAgent(userAgent: string): Promise<void> {
    return this.sendWindowWebContentsAction("setUserAgent", [userAgent]);
  }

  /**
   * Executes the editing command `undo` in web page.
   */
  async undo(): Promise<void> {
    return this.sendWindowWebContentsAction("undo");
  }
  /**
   * Executes the editing command `unselect` in web page.
   */
  async unselect(): Promise<void> {
    return this.sendWindowWebContentsAction("unselect");
  }

  /**
   * If *offscreen rendering* is enabled sets the frame rate to the specified number.
   * Only values between 1 and 240 are accepted.
   */
  async setFrameRate(fps: number): Promise<void> {
    return this.sendWindowWebContentsAction("setFrameRate", [fps]);
  }

  //window actions


  async hide(): Promise<void> {
    return this.sendWindowAction("hide");
  }
  async show(): Promise<void> {
    return this.sendWindowAction("show");
  }

  /**
   * Moves window to the center of the screen.
   */
  async center(): Promise<void> {
    return this.sendWindowAction("center");
  }

  /**
   * Focuses on the window.
   */
  async focus(): Promise<void> {
    return this.sendWindowAction("focus");
  }

  async isDestroyed(): Promise<boolean> {
    return this.sendWindowAction("isDestroyed");
  }
  
  async isFocused(): Promise<boolean> {
    return this.sendWindowAction("isFocused");
  }

  async isVisible(): Promise<boolean> {
    return this.sendWindowAction("isVisible");
  }

  async executeJavaScript(js: string): Promise<any>
  {
    return this.sendWindowWebContentsAction("executeJavaScript", [js]);
  }
  /**
   * Whether the window is in fullscreen mode.
   */

  /**
   * Same as `webContents.reload`.
   */
  /*async reload(): Promise<void> {
    return this.sendWindowAction("reload");
  }*/

  /**
   * Makes the window ignore all mouse events.
   *
   * All mouse events happened in this window will be passed to the window below this
   * window, but if this window has focus, it will still receive keyboard events.
   */
  async setIgnoreMouseEvents(ignore: boolean, options?: any): Promise<void> {
    return this.sendWindowAction("setIgnoreMouseEvents", [ignore, options]);
  }

  /**
   * Resizes the window to `width` and `height`. If `width` or `height` are below any
   * set minimum size constraints the window will snap to its minimum size.
   */
  async setSize(
    width: number,
    height: number,
    animate?: boolean
  ): Promise<void> {
    return this.sendWindowAction("setSize", [width, height, animate]);
  }

    async setContentSize(
      width: number,
      height: number
    ): Promise<void> {
      return this.sendWindowAction("setContentSize", [width, height]);
    }

  async setTitle(title: string): Promise<void> {
    return this.sendWindowAction("setTitle", [title]);
  }
}
