"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CbpUtils = void 0;
class CbpUtils {
    static getExtStartArgs() {
        const sa = process.env.startArgs;
        if (!sa || sa.length === 0) {
            return;
        }
        return JSON.parse(sa);
    }
    static getUserSettings() {
        const str = process.env.userSettings;
        return JSON.parse(str);
    }
    static getEnvCheckbox(key) {
        if (!key)
            throw new Error("key is empty");
        let env = process.env[key];
        if (!env)
            throw new Error("env is not set for key " + key);
        if (env.length === 0)
            throw new Error("env is empty for key " + key);
        return env === "true" || env === "1";
    }
    static getEnvArray(key) {
        if (!key)
            throw new Error("key is empty");
        let env = process.env[key];
        if (!env)
            throw new Error("env is not set for key " + key);
        if (env.length === 0)
            throw new Error("env is empty for key " + key);
        const json = JSON.parse(env);
        if (!Array.isArray(json)) {
            throw new Error("env is not array for key " + key);
        }
        return json;
    }
}
exports.CbpUtils = CbpUtils;
