import { Header } from "./headers_helper";
import { protocol,host,port,dir } from "../assets/connection";

export class ApiRequest{
    method: "GET" | "POST" | "PUT" | "DELETE" = "GET";
    headers: Header;
    mode : "text" | "json" = "text"

    constructor(apiMethod: "GET" | "POST" | "PUT" | "DELETE" = "GET", apiHeaders: Header = new Header("json-default"), apiMode: "text" | "json" = "json"){
        this.method = apiMethod;
        this.headers = apiHeaders;
        this.mode = apiMode;
    }

    async _exec_get(param: Record<string, string>[] = []){
        const params = ApiRequestHelper._prepare_params(param);
        try {
            const request = await fetch(`${protocol}://${host}:${port}/${dir}/${params}`,{
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

    async _exec_post(body: any = {}, param: Record<string, string>[] = []) {
        try {
            const params = ApiRequestHelper._prepare_params(param);
            const request = await fetch(`${protocol}://${host}:${port}/${dir}/${params}`,{
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
        param.forEach((p,q) => response += `?${p}=${q}`);
        return response;
    } 



    static async show_response(mode: string, request:Response ){
        let reponse = this.get_response(mode,request);
        // dopisz albo usuń
    }
}


