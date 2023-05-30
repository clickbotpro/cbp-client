import { ExtStartArgs, IUserSettings } from "CbpDataTypes";

export class CbpUtils
{
    static getExtStartArgs():ExtStartArgs|undefined
    {
        const sa=process.env.startArgs;
        if(!sa || sa.length===0) {
          return;
        }
        return JSON.parse(sa);
    }

    static getUserSettings():IUserSettings
    {
      const str=process.env.userSettings;
      return JSON.parse(str) as IUserSettings;
    }

    static getEnvCheckbox(key:string):boolean
    {
        if(!key)
        throw new Error("key is empty");
        let env = process.env[key];
        if(!env)
            throw new Error("env is not set for key "+key);
        if(env.length===0)
            throw new Error("env is empty for key "+key);
        return env==="true" || env==="1";
    }

    static getEnvArray(key:string):Array<string>
    {
        if(!key)
            throw new Error("key is empty");
        let env = process.env[key];
        if(!env)
            throw new Error("env is not set for key "+key);
        if(env.length===0)
            throw new Error("env is empty for key "+key);
        const json=JSON.parse(env);
        if(!Array.isArray(json)) {
            throw new Error("env is not array for key "+key);
        }
        return json as Array<string>;
    }
}