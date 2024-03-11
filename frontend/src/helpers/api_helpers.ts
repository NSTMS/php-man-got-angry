import { Header } from "./classes/headers_helper";
import { protocol,host,dir } from "../assets/connection";
import type { ApiMethodType } from "../types/apiMethodType";
export class ApiRequest{
    method: ApiMethodType ;
    headers: Header;
    params: string;

    // const request = new ApiRequest("GET","/pomocy")

    constructor(apiMethod: ApiMethodType = "GET",apiParams: string = ""){
        this.method = apiMethod;
        this.headers = new Header("json-default");
        this.params = apiParams;
    }

    async _exec_get(){
        try {
            return await fetch(`${protocol}://${host}/${dir}${this.params}`,{
                method:this.method,
                headers:this.headers as {},
            })
        } catch (error) {
            throw error;
        }
    }

    async _exec_post(body: Record<string, any> = {}) {
        try {
            const formData =  ApiRequestHelper._prepare_body(body);
            return await fetch(`${protocol}://${host}/${dir}${this.params}`,{
                method:this.method,
                headers:this.headers as {},
                body: formData
            });
        } catch (error) {
            throw error;
        }
    }
}

class ApiRequestHelper{
    static _prepare_body(body: Record<string, any> = {})
    {
        const fd = new FormData();
        for(let d in body)
        {
            fd.append(d, body[d]);
        }
        return fd;
    } 
}

