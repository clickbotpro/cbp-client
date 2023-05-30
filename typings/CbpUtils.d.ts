import { ExtStartArgs, IUserSettings } from "CbpDataTypes";
export declare class CbpUtils {
    static getExtStartArgs(): ExtStartArgs | undefined;
    static getUserSettings(): IUserSettings;
    static getEnvCheckbox(key: string): boolean;
    static getEnvArray(key: string): Array<string>;
}
