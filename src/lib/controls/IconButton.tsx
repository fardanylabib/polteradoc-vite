import { HeroIcon } from "../common/HeroIcon";

interface IconButtonProps {
    icon:string,
    className?:string,
    bgClassName?:string,
    onClick?:any,
    large?: boolean,
    title?: string
}

export default function IconButton({icon, className, onClick, large, bgClassName, title}:IconButtonProps){
    return (
        <span title={title} className={`rounded-full ${bgClassName? bgClassName: "bg-white hover:bg-slate-200"} cursor-pointer flex flex-col ${className} ${large? "w-40 h-40" : "w-8 h-8"}`}
            onClick={onClick}
        >
            <HeroIcon className={`${large? "w-40 stroke-1" : "w-5"} m-auto`} name={icon}/>
        </span>
    )
}