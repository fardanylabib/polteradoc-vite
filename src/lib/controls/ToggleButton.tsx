import { HeroIcon } from "../common/HeroIcon";

interface ToggleButtonProps {
    onChange?: any,
    text: string,
    checked: boolean,
    customClass?:string
}

export default function ToogleButton({onChange, text, checked, customClass}: ToggleButtonProps){
    return(
        <div className={`flex cursor-pointer py-1 px-3 rounded-full items-center justify-center ${customClass? customClass : "bg-brand-300 hover:bg-brand-100 text-white"}`}
            
        >
        </div>
    )
}
