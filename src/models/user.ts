import { ILecturerEntityResponse } from "./lecturer";
import { IStudentEntity, IStudentEntityResponse } from "./student";

export interface IUsersPermissionsMe {
    id?: number;
    username: string;
    email?: string;
    provider?: string
    confirmed?: boolean;
    blocked?: boolean;
    role?: IUsersRoleEntityResponse;
}
  
export interface IUsersPermissionsUser extends IUsersPermissionsMe {
    student?: IStudentEntityResponse
    lecturer?: ILecturerEntityResponse
}

export interface IUsersPermissionsEntity{
    id?:number;
    attributes: IUsersPermissionsUser;
}

export interface IUsersPermissionsEntityResponse{
    data:IUsersPermissionsEntity;
}

export interface IUsersPermissions {
    jwt: string;
    user?: IUsersPermissionsMe|IUsersPermissionsUser;
    expired?: string;
}

export interface IUsersPermissionsRegisterInput {
    username: string;
    email: string;
    password: string;
}
  
export interface IUsersPermissionsLoginInput {
    identifier: string;
    password: string;
    provider?: string;
}

export interface IUsersRoleEntity{
    id?: number
    attributes: IUsersRole
}

export interface IUsersRole{
    id?: number;
    name: string;
    description?: string;
    type?: string;
}

export interface IUsersRoleEntityResponse {
    data:IUsersRoleEntity;
}

export interface IUsersPermissionsPasswordResponse {
    ok: boolean;
}
  
  
export interface IUsersPermissionsCreateRoleResponse {
    ok: boolean;
}
  
export interface IUsersPermissionsUpdateRoleResponse {
    ok: boolean;
}
  
export interface IUsersPermissionsDeleteRoleResponse {
    ok: boolean;
}
  
export const UsersPermissionsMe = ():IUsersPermissionsMe => {
    return {
        username:"",
    }
}

export const UsersPermisisons = ():IUsersPermissions => {
    return {
        jwt:"",
        user:UsersPermissionsMe(),
        expired:""
    }
}

export const UsersPermissionsLoginInput = ():IUsersPermissionsLoginInput => {
    return{
        identifier:"",
        password:""
    }
}


export const UsersPermissionsRegisterInput = ():IUsersPermissionsRegisterInput => {
    return{
        username:"",
        email:"",
        password:""
    }
}