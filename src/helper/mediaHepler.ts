import { BACKEND_HOST } from "../constants/Env";

export const getFullMediaPath = (uri:any) => {
    if(uri){
        return `${BACKEND_HOST}${uri}`;
    }
    return "";
}