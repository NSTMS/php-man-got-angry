import { protocol,host,port,dir } from "../assets/connection";
export const check_player_existance = (nickname: string) => {
    return true;
}

export const add_player = () => {
    const headers = {}
    //headers_helper
    
    fetch(`${protocol}://${host}:${port}/${dir}`,{
        method:"POST",
        headers:headers
    })
}