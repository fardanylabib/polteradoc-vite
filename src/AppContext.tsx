import { addDays } from "date-fns";
import { createContext, useState } from "react";
import { LOCAL_STORAGE_KEY, DEFAULT_TOKEN } from "./constants/Env";
import { IUsersPermissions, UsersPermisisons } from "./models/user";
import {useEffect} from "react";


export interface IAppContextValue{
    userAuth: IUsersPermissions;
    setUserAuth: Function;
    setUserWithExpiryDate: Function;
    removeUserAuth: Function;
}
export const AppContext = createContext<IAppContextValue>({
    userAuth:{
        jwt:"",
    },
    setUserAuth:()=>{},
    setUserWithExpiryDate: ()=>{},
    removeUserAuth: ()=>{}
});
export const AppProvider = ({children=<div/>}) => {
    const [userAuth, setUserAuth] = useState<IUsersPermissions>(UsersPermisisons());
    const setUserWithExpiryDate = async(_userPermission: IUsersPermissions) => {
        console.log(_userPermission);
        if(!_userPermission){
          return;
        }
        const currentDate = new Date();
        window.token = _userPermission.jwt ? _userPermission.jwt : DEFAULT_TOKEN; //set token to global var
        setUserAuth({
          ..._userPermission,
          expired : addDays(currentDate, 1).getTime().toString() //set expiration login state
        });
    }
    
    const removeUserAuth = () => {
        try {
            // Save to local storage
            window.localStorage.removeItem(LOCAL_STORAGE_KEY);
            setUserAuth(UsersPermisisons());
            window.location.pathname = "/";
        } catch (error) {
            console.log(error);
        }
    }
    const value: IAppContextValue = {
        userAuth,
        setUserAuth,
        setUserWithExpiryDate,
        removeUserAuth,
    };

    useEffect(()=>{
        const initUserAuth = async () => {
            window.token = userAuth.jwt? userAuth.jwt: DEFAULT_TOKEN;
            if(!userAuth.jwt){
                try {
                    // Get from local storage by key
                    const _userAuth = window.localStorage.getItem(LOCAL_STORAGE_KEY);
                    if(!_userAuth){
                        setUserAuth(UsersPermisisons());
                        return;
                    }
                    const _userAuthJson = JSON.parse(_userAuth);
                    if(!_userAuthJson || !_userAuthJson.expired){
                        setUserAuth(UsersPermisisons());
                        return;
                    }
                    const currentDate = new Date();
                    const expiryDate = new Date(_userAuthJson.expired);
                    if(expiryDate < currentDate){
                        setUserAuth(UsersPermisisons());
                        return;
                    }
                    await setUserWithExpiryDate(_userAuthJson); //set expiration login state
                } catch (error) {
                    console.log(error);
                    setUserAuth(UsersPermisisons());
                }
            }else{
                try {
                    // Save to local storage
                    window.localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(userAuth));
                } catch (error) {
                    console.log(error);
                }
            }
        }
        initUserAuth();
    },[JSON.stringify(userAuth)]);

    return (
        <AppContext.Provider 
            value={value}
        >
            {children}
        </AppContext.Provider>
    );
}