export class Header {
    headers: Record<string, string> = {};

    constructor(mode: string){
        if(mode === "json-default")
        {
            this.set('mode','cors');
            this.set('Access-Control-Allow-Origin','*');
            this.set('Access-Control-Allow-Headers','*');
            this.set("Content-Type","application/json");
        }
    }
    
    set(key: string, value: string) {
        this.headers[key] = value;
    }
}
