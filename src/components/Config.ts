
export class Config{

    private static instance:Config;

    target?:string;

    api:string;

    accessToken:string

    private constructor(config:string){
        const data = require('../../src/config/config-'+config+'.json');
        this.api = data.api;
        this.accessToken = data.accessToken;
    }

    public static getInstance():Config{
        const targetConfig = require('../../src/config/base.json');
        const target = targetConfig.target;
        if (!this.instance || this.instance.target !== target){
            this.instance = new Config(target);
        }
        return this.instance;
    }

    /**
     * 获取当前用户的Device ID
     */
    public deviceId():string {
        const deviceId = localStorage.deviceId;
        return localStorage.deviceId;
    }
    

    public disableCache():boolean{
        return false;
    }
} 


export default Config