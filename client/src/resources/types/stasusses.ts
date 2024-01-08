export type STATUS_CODE = {
    id : number | string,
    description: string
}

export const STATUSSES : STATUS_CODE[] =
[
    {id:1, description: "ENTER THE GAME"} as STATUS_CODE,
    {id:2, description: "WAITING FOR MOVE"} as STATUS_CODE,
    {id:3, description: "WAITING FOR GAME"} as STATUS_CODE,
    {id:4, description: "ON MOVE"} as STATUS_CODE,
    {id:5, description: "AFK"} as STATUS_CODE,
    
    {id:"A", description: "first place"} as STATUS_CODE,
    {id:"B", description: "second place"} as STATUS_CODE,
    {id:"C", description: "third place"} as STATUS_CODE,
    {id:"D", description: "forth place"} as STATUS_CODE,
]