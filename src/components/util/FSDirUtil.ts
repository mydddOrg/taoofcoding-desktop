import { AuthStore } from "stores/AuthStore";
import { DirType } from "./DirType";
import { FileUtil } from "./FileUtil";
import { ModuleUtil } from "./ModuleUtil";
import { Logger } from "components/logger/Logger";

export class FSDirUtil {


    private static appDataDir = (ModuleUtil.electron.app || ModuleUtil.remote.app).getPath('userData');

    private static DOCUMENT_DIR: string = "documents";


    /**
     * 文件DIR
     */
    public static fileDir(): string {
        return this.dirForType(DirType.File);
    }


    private static dirForType(type: string): string {
        const path = ModuleUtil.path;
        return path.join(FSDirUtil.userDataDir(), type);
    }


    public static async createUserDataDir(): Promise<boolean> {
        const userId = AuthStore.getInstance().userId;
        const path = await FSDirUtil.mkdirDirInUserData(userId);
        return path != '';
    }

    public static userDataDir(): string {
        const path = ModuleUtil.path;
        const userId = AuthStore.getInstance().userId;
        return path.join(FSDirUtil.documentPath(), userId);
    }

    public static async createDirs(): Promise<boolean> {
        await FSDirUtil.mkdirDirInUserData(DirType.File);
        return true;
    }


    /**
     * 生成指定目录
     */
    private static async mkdirDirInUserData(name: string): Promise<string> {
        const path = ModuleUtil.path;
        const fs = ModuleUtil.fs;
        return new Promise((resolove) => {
            const userDataPath: string = path.join(FSDirUtil.userDataDir(), name);
            fs.access(userDataPath, (err: any) => {
                if (err) {
                    fs.mkdir(userDataPath, { recursive: true }, function (error: any) {
                        if (error) {
                            Logger.error('mkdirDirInUserData',error);
                            resolove('');
                        } else {
                            resolove(userDataPath);
                        }
                    });
                } else {
                    resolove(userDataPath);
                }
            });
        });
    }

    /**
     * 项目文档根目录
     */
    public static documentPath(): string {
        const path = ModuleUtil.path;
        const documentPath = path.join(FSDirUtil.appDataDir, FSDirUtil.DOCUMENT_DIR);
        return documentPath;
    }

    /**
     * 日志目录
     */
    public static loggerPath(): string {
        return this.dirForType(DirType.Logger);
    }

    public static filePath(file: string): string {
        const path = ModuleUtil.path;
        const typePath = this.dirForType(DirType.File);
        const filePath = path.join(typePath, file);
        return filePath;
    }
    
    public static mediaPath(mediaId: string,type:string): string  {
        if(!mediaId)return '';
        const path = ModuleUtil.path;
        const typePath = this.dirForType(type);
        const mediaPath = path.join(typePath, mediaId);
        return mediaPath;
    }

    public static async mediaExists(mediaId: string,type:string): Promise<boolean> {
        const mediaPath = this.mediaPath(mediaId,type);
        const exists = await FileUtil.accessFile(mediaPath);
        return exists;
    }

    public static async writeAvataFile(mediaId: string, type:string,data: ArrayBuffer): Promise<boolean> {
        const mediaPath = this.mediaPath(mediaId,type);
        return FileUtil.writeFile(mediaPath,data);
    }

}