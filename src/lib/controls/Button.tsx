import { HeroIcon } from "../common/HeroIcon";
import { Loading } from "../common/Loading";

interface ButtonProps {
    onClick?: any;
    title: string;
    icon?: string;
    customClass?:string;
    small?:boolean;
    type?: "button" | "submit" | "reset";
    fullWidth?:boolean;
    loading?:boolean;
    disabled?:boolean;
}

export const Button = ({type, loading, onClick, title, icon, customClass, small, fullWidth, disabled}: ButtonProps) =>{
    return(
        <button type={type? type: "button"} className={`flex cursor-pointer py-1 px-3 rounded-lg items-center justify-center ${fullWidth? "w-full" : "w-fit"} 
            ${customClass? customClass : "bg-brand-300 hover:bg-brand-100 text-white"}`
        }
            onClick={onClick} disabled={loading || disabled}
        >
            {
                loading ? <div className="mr-12"><Loading white/></div> : 
                !icon? null:
                <HeroIcon name={icon} className="w-4 mr-3"/>
            }
            <span className={small? "text-sm" : ""}>{title}</span>
        </button>
    )
}