export interface IResponse<T = any> {
    status: number;
    data?: T;
    statusText?: string;
    error?: any
}

export class BaseResponse<T = any> {

    response: IResponse<BaseResponse<any>>;
    status: number = -1;
    data: T;
    tip: any;

    public constructor(response: IResponse) {
        this.response = response;
        if (response) {
            this.status = response.status;
            this.data = response.data;
        }
    }

    public resultSuccess(): boolean {
        if (this.response.status >= 200 && this.response.status < 300) {
            return true;
        }
        return false;
    }
}

export abstract class IRequest {

    /**
     * GET请求,获取一个流
     * @param url 
     */
    abstract requestBlobForGet(url: string,progressBlock?: (progress: number) => void): Promise<ArrayBuffer>;



    /**
     * GET请求
     * @param url 
     */
    abstract requestForGet<T = any>(url: string): Promise<BaseResponse<T>>;

    /**
     * POST 请求
     * @param url POST URL
     * @param data 
     */
    abstract requestForPost<T = any>(url: string, data: any): Promise<BaseResponse<T>>;

    /**
    * PUT 请求
    * @param url 
    * @param data 
    */
    abstract requestForPut<T = any>(url: string, data: any): Promise<BaseResponse<T>>;

    /**
    * DELETE 请求
    * @param url 
    */
    abstract requestForDelete<T = any>(url: string): Promise<BaseResponse<T>>;

    /**
     * 上传文件
     * @param url 
     * @param file 
     */
    abstract uploadFile<T>(url: string, file: File, progressBlock?: (progress: number) => void): Promise<BaseResponse>;

}