import { API_HOST } from "../constants/Env";
import { IApiResponse } from "../models/common";
import { IUsersPermissionsLoginInput, IUsersPermissionsRegisterInput } from "../models/user";
export const RESPONSE_OK = 200;
export const RESPONSE_NOK = 500;
export const IS_DEMO = true;

export const register = async ({username,email,password}:IUsersPermissionsRegisterInput) => {
    try{
        const resp = await httpPost(`${API_HOST}/auth/local/register`,{username,email,password});
        let respData = resp.data;
        if(!respData){
            return {
                data: null,
                error: "No Response"
            }
        }
        if(respData.error){
            return {
                data: null,
                error: `Error ${respData.error.status} | ${respData.error.name}: ${respData.error.message}`
            }
        }
        return {
            error: null,
            data: {...resp.data, jwt:window.token}
        }
    }catch(err){
        return {
            data: null,
            error: JSON.stringify(err)
        }
    }
} 

export const login = async ({identifier,password}:IUsersPermissionsLoginInput) => {
    try{
        let resp = await httpPost(`${API_HOST}/auth/local`, {identifier, password});
        let respData = resp.data;
        if(!respData){
            return {
                data: null,
                error: "No Response"
            }
        }
        if(respData.error){
            return {
                data: null,
                error: `Error ${respData.error.status} | ${respData.error.name}: ${respData.error.message}`
            }
        }
        window.token = respData.jwt;
        resp = await httpGet(`${API_HOST}/users/me?populate=*`);
        if(!resp){
            return {
                data: null,
                error: "No Response"
            }
        }
        if(!resp.data || !resp.data.username){
            return {
                data: null,
                error: "Username/password salah"
            }
        }
        return {
            error: null,
            data: {...resp.data, jwt:window.token}
        }
    }catch(err){
        return {
            data: null,
            error: JSON.stringify(err)
        }
    }
}

export const httpGet = async (url:string):Promise<IApiResponse> => {
    try{
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json', 'Authorization' : `Bearer ${window.token}`
            }
        });
        const respJson = await response.json();
        if(respJson.data){
            return {
                error: "",
                data: respJson.data
            }
        }return {
            error: "No data",
            data: null
        }
    }catch(err){
        return {
            error: JSON.stringify(err),
            data: null
        }
    }
}

export const httpPost = async (url:string, data:any) => {
    try{
        const resp = await fetch(url,{
            method: 'POST',
            headers:{ 'Content-Type': 'application/json' , 'Authorization' : `Bearer ${window.token}`},
            body: JSON.stringify(data)
        });
        const respJson = await resp.json();
        if(respJson.data){
            return {
                error: "",
                data: respJson.data
            }
        }return {
            error: "",
            data: true
        }
    }catch(err){
        return {
            data: null,
            error: JSON.stringify(err)
        }
    }
}

export const httpPut = async (url:string, data:any) => {
    try{
        const resp = await fetch(url,{
            method: 'PUT',
            headers:{ 'Content-Type': 'application/json' , 'Authorization' : `Bearer ${window.token}`},
            body: {...data}
        });
        const respJson = await resp.json();
        if(respJson.data){
            return {
                error: "",
                data: respJson.data
            }
        }return {
            error: "",
            data: true
        }
    }catch(err){
        return {
            data: null,
            error: JSON.stringify(err)
        }
    }
}


export const httpDelete = async (url:string, data:any) => {
    try{
        const resp = await fetch(url,{
            method: 'DELETE',
            headers:{ 'Content-Type': 'application/json' , 'Authorization' : `Bearer ${window.token}`},
            body: {...data}
        });
        const respJson = await resp.json();
        if(respJson.data){
            return {
                error: "",
                data: respJson.data
            }
        }return {
            error: "",
            data: true
        }
    }catch(err){
        return {
            data: null,
            error: JSON.stringify(err)
        }
    }
}