export interface ISelectOptions{
    label:string;
    value:any;
}

export interface ISelectCityOptions extends ISelectOptions{
    provinceID: string;
}

export enum InputType{
    TEXT= "text",
    NUMBER="number",
    MONEY="money",
    PASSWORD="password",
    PHONE="phone"
}

export enum ModalSize{
    SMALL="sm",
    MEDIUM="md",
    LARGE="lg"
}

export interface IApiResponse{
    error:string;
    data:any;
}

export interface INavbarProps{
    menu:any[]
    onSelect:Function
    selectedId:number
}