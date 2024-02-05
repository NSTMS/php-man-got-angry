import { Header } from "./headers_helper";
import { protocol,host,port,dir } from "../assets/connection";

export class ApiRequest{
    method: "GET" | "POST" | "PUT" | "DELETE" = "GET";
    headers: Header;
    mode : "text" | "json" = "text";
    params: string;


    constructor(apiMethod: "GET" | "POST" | "PUT" | "DELETE" = "GET",apiParams: Record<string, string>[] = [] , apiMode: "text" | "json" = "json",apiHeaders: Header = new Header("json-default")){
        this.method = apiMethod;
        this.headers = apiHeaders;
        this.mode = apiMode;
        this.params = ApiRequestHelper._prepare_params(apiParams);
    }

    async _exec_get(){
        try {
            const request = await fetch(`${protocol}://${host}:${port}/${dir}${this.params}`,{
                method:this.method,
                headers:this.headers as {},
            })

            let response = await ApiRequestHelper.get_response(this.mode, request);

            console.log(response);

            return response;
    
        } catch (error) {
            console.error("Error:", error);
        }
    }

    async _exec_post(body: any = {}) {
        try {
            const request = await fetch(`${protocol}://${host}:${port}/${dir}${this.params}`,{
                method:this.method,
                headers:this.headers as {},
                body: body
            })

            let response = ApiRequestHelper.get_response(this.mode, request);
            console.log(response);
    
        } catch (error) {
            console.error("Error:", error);
        }
    }
}

class ApiRequestHelper{
    static async get_response (mode: string, request:Response ){
        let response;
        if(mode == "text")
        {
            response = await request.text();
        }
        else{
            response = await request.json();
        }
        return response;
    }

    static _prepare_params(param: Record<string, string>[])
    {
        let response = "";
        param.forEach((p,q) => response += `?${p}=${q}&`);
        return response;
    } 



    static async show_response(mode: string, request:Response ){
        let reponse = this.get_response(mode,request);
        // dopisz albo usuń
    }
}


