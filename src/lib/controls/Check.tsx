import { HeroIcon } from "../common/HeroIcon";
import { CircleLoading } from "../common/Loading";

interface CheckProps{
    title?:string;
    onClick: any;
    isChecked:boolean;
    disabled?:boolean;
    isLoading?:boolean;
}

export const Check = ({title, onClick, isChecked, disabled, isLoading}:CheckProps) => (
    <div className="flex items-center">
        <div className={`${disabled? "border-slate-400" : `cursor-pointer border-brand-300 ${isChecked ? "bg-brand-300" : ""}`}
            relative w-5 h-5 border-2 rounded-md flex flex-col justify-center`
        }
            onClick={disabled ? undefined : onClick}
        >
            <div className="absolute w-full text-center">
                {
                    isLoading? <CircleLoading/> :
                    isChecked? <HeroIcon name="CheckIcon" className={disabled? "text-slate-400" : "text-white"}/> : null
                }
            </div>
        </div>
        {
            !title? null:
            <div className="ml-3">
                {title}
            </div>
        }
        
    </div>
)

