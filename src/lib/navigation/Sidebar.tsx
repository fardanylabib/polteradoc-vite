import { INavbarProps } from '../../models/common';
// import Logo from '../../assets/logo.png';
import { HeroIcon } from '../common/HeroIcon';

export const Sidebar = ({menu, onSelect, selectedId}:INavbarProps) => {
    return(
        <div className="flex flex-col h-full">
            <div className="flex flex-col h-3/4 flex-grow rounded-3xl text-white bg-brand-300">
                <div className="flex items-center p-4">
                    {/* <img src={Logo} className="h-10 mx-auto" alt="brand"/> */}
                    <div className="ml-4">
                        <div className="font-bold text-xl">SIM-OJT</div>
                        <div className="text-xxs">Sistem Informasi Manajemen On Job Training</div>
                    </div>
                </div>
                <div className="flex-grow overflow-auto scrollbar max-h-full">
                {
                    menu.map((m, i) => (
                        <div key={m.url} className="my-1 mx-3 text-sm">
                            <div onClick={()=>onSelect(m, `menu[${i}]`, `${m.title}`, `/${m.url}`)}>
                                <div className={`${selectedId === m.id  ? "bg-brand-100" : "hover:bg-brand-400"} rounded-xl p-2.5 flex items-center cursor-pointer`}>
                                    <HeroIcon name={m.icon} className="mr-2 w-5"/>
                                    <p className="flex-grow">{m.title}</p>
                                    {
                                        m.submenu? <HeroIcon name={m.expand? "ChevronDownIcon" : "ChevronRightIcon"} className="w-3"/> : null
                                    }
                                </div>
                                
                            </div>
                            {
                                !m.submenu || !m.expand? null:
                                m.submenu.map((sm:any, j:number) => (
                                    <div key={sm.url} className="ml-8">
                                        <div onClick = {()=>onSelect(sm, `menu[${i}].submenu[${j}]`, `${m.title} / ${sm.title}`,`/${m.url}/${sm.url}`)}>
                                            <div className={`${selectedId === sm.id ? "bg-brand-20" : "hover:bg-brand-50"} rounded-xl py-2 px-2.5 flex items-center cursor-pointer text-sm`}>
                                                <p className="flex-grow">{sm.title}</p>
                                                {
                                                    sm.submenu? <HeroIcon name={sm.expand? "ChevronDownIcon" : "ChevronRightIcon"} className="w-3"/> : null
                                                }
                                            </div>
                                        </div>
                                        {
                                            !sm.submenu || !sm.expand ? null:
                                            sm.submenu.map((ssm:any, k:number) => (
                                                <div onClick={()=>onSelect(ssm, `menu[${i}].submenu[${j}].submenu[${k}]`, `${m.title} / ${sm.title} / ${ssm.title}`,`/${m.url}/${sm.url}/${ssm.url}`)} key={ssm.url}>
                                                    <div className={`${selectedId === ssm.id ? "bg-brand-20" : "hover:bg-brand-50"} rounded-xl py-2 ml-3 pl-2 flex items-center cursor-pointer text-xs`}>
                                                        <p>{ssm.title}</p>
                                                    </div>
                                                </div>
                                            ))
                                        }
                                    </div>
                                ))
                            }
                        </div>
                    ))
                }
                </div>
                <div className="py-2"/>
            </div>     
        </div>
    )
}