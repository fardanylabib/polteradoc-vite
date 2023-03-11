import { INavbarProps } from '../../models/common';
import { HeroIcon } from '../common/HeroIcon';

export const BottomNavbar = ({menu,onSelect,selectedId}:INavbarProps) => {
    return(
        <div className="flex py-1 justify-around bg-brand-100 text-white">
        {
            menu.map((m, i) => (
                <div key={m.url} className="mx-1 text-sm cursor-pointer min-w-max">
                    <div onClick={()=>onSelect(m, `menu[${i}]`, `${m.title}`, `/${m.url}`)}>
                        <div className={`${selectedId === m.id  ? "bg-brand-20" : "hover:bg-brand-50"} rounded-xl py-1 px-2`}>
                            <div className="flex justify-center"><HeroIcon name={m.icon} className="mx-auto w-5 h-5"/></div>
                            <p className="text-center text-xs">{m.shortTitle ? m.shortTitle : m.title}</p>
                        </div>
                    </div>
                </div>
            ))
        }
        </div>
    )
}