import { HeroIcon } from '../common/HeroIcon';
import {adminMenu, routes} from '../../constants/menu';
import { useContext, useEffect, useState } from 'react';
import { cloneDeep, get, set } from 'lodash';
import { useNavigate } from 'react-router';
import { AppContext } from '../../AppContext';
import { Sidebar } from './Sidebar';
import { BottomNavbar } from './BottomNavbar';
import { useLazyQuery } from '@apollo/client';
import { USER_PERMISSIONS_ME } from '../../graphql/queries/users';
import { Loading } from '../common/Loading';
import { IUsersPermissions, IUsersPermissionsEntityResponse } from '../../models/user';

export const Layout = ({children=<div/>}) =>{
    const {userAuth, setUserWithExpiryDate} = useContext(AppContext);
    const [menuState, setMenuState] = useState<any>({menu:[]});
    const [clickId, setClickId] = useState(0);
    const [title, setTitle] = useState("Beranda");
    const [breadcrumbs, setBreadcrumbs] = useState("Beranda");
    const [collapse, setCollapse] = useState(false);
    const navigate = useNavigate();
    const [getUser, {loading:usrLoading, error:usrError, data:usrData}] = useLazyQuery(USER_PERMISSIONS_ME);
  
    const userRole = userAuth?.user?.role?.data.attributes.name;

    const selectPath = (obj:any, path:string, titlePath:string, url:string) => {
        if(obj.submenu){
            const expandPath = `${path}.expand`;
            const menuTemp = cloneDeep(menuState);
            const isExpanded = get(menuTemp, expandPath);
            set(menuTemp, expandPath, !isExpanded);
            setMenuState(menuTemp);
        }else{
            setClickId(obj.id);
            setTitle(obj.title);
            setBreadcrumbs(titlePath);
            if(url){
                navigate(url);
            }
        }
    }
    
    useEffect(()=>{
        if(usrData && usrData.usersPermissionsUser){
            const _userData:IUsersPermissionsEntityResponse = usrData.usersPermissionsUser;
            if(_userData){
                const _authData:IUsersPermissions = {
                    ...userAuth,
                    user: {
                        ..._userData.data.attributes,
                        id: _userData.data.id
                    }
                };
                setUserWithExpiryDate(_authData);
            }
        }
    },[usrData]);

    useEffect(()=>{
        if(!userRole){ //if user role already there, skip
            getUser({
                variables: {id: userAuth.user?.id}
            });
        }else{
            const menuTemp = {
                menu: adminMenu.menu.filter(m => m.roles.includes(userRole))
            }
            const paths = window.location.pathname.split("/").filter(p => p.length > 0);
            const indexes:any[] = [];
            let currentMenu = menuTemp.menu;
            let lastMenu:any;
            let titlePath = "";
            let menuPath = "";
            paths.forEach((path, index) => {
                let findIndex = null, submenu = null;
                currentMenu.find((m, mi)=>{
                    if(m.url === path){
                        findIndex = mi;
                        submenu = m.submenu;
                        indexes.push(mi);
                        titlePath += (index == 0 ? m.title : ` / ${m.title}`);
                        lastMenu = m;
                        return m;
                    }
                });
                if(findIndex != null && submenu != null){
                    currentMenu = submenu;
                }
            });
            indexes.forEach((val, count)  => {
                if(count==0){
                    menuPath += `menu[${val}]`;
                }else{
                    menuPath += `.submenu[${val}]`;
                }
                set(menuTemp, `${menuPath}.expand`, true);
            });
            setMenuState(menuTemp);
            if(paths[0]==="profile"){
                setClickId(-1);
                setTitle("Profil Saya");
                setBreadcrumbs("Profil");
            }else if(lastMenu){
                setClickId(lastMenu.id);
                setTitle(lastMenu.title);
                setBreadcrumbs(titlePath);
            }
        }
        
    },[JSON.stringify(userAuth), window.location.pathname]);


    useEffect(()=>{
        if(usrError){
          window.pushToast("Error mendapatakan data user", "error");
        }
      },[usrError]);

    const getParentMenu = () =>{
        if(!breadcrumbs){
            return "";
        }
        return breadcrumbs.split("/")[0].trim();
    }

    return (
        <div className="flex h-screen">
            <div className={`relative h-screen overflow-hidden filter drop-shadow-2xl hidden lg:block ${collapse? "pr-4 w-16" : "p-4 w-64"}`}>
                <Sidebar 
                    onSelect={selectPath} selectedId={clickId} menu={menuState.menu}
                />
            </div>
            <div className='z-20'/>
            <div className='overflow-auto fixed inset-x-0 bottom-0 lg:hidden z-20 bg-brand-100'>
                <BottomNavbar 
                    onSelect={selectPath} selectedId={clickId} menu={menuState.menu}
                />
            </div>
            <div className="flex flex-col flex-grow h-full text-dark-100 w-3/4">
                <div className="flex py-3 px-5">
                    <div className="text-lg font-bold flex-grow">
                        {title}
                    </div>
                    {
                        usrLoading? 
                        <div className='w-20'><Loading/> </div>:
                        <div className="rounded-full w-8 h-8 hover:bg-slate-100 cursor-pointer flex flex-col ml-2"
                            onClick={()=>navigate(routes.PROFILE)}
                        >
                            <HeroIcon className="w-5 m-auto" name="UserIcon"/>
                        </div>
                    }
                </div>
                <div className="flex-grow overflow-hidden z-10">
                    {children}
                </div>
            </div>
        </div>
    )
}
