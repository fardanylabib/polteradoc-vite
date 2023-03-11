import { ErrorLabel } from "../common/Labels"

interface TextFieldProps{
    name: string,
    value?: string | number,
    onChange?:any,
    type?:string, 
    disabled?:boolean,
    placeholder?:string,
    suffix?: string,
    prefix?: string,
    autoFocus?:boolean,
    error?:any,
}

export const TextField = ({name,value, type, onChange, disabled, placeholder, prefix, suffix, autoFocus, error}:TextFieldProps) => {
    return(
        <div className="relative">
            <input name={name} 
                className={`form-control
                    w-full
                    pl-3
                    pr-1
                    py-1.5
                    bg-clip-padding
                    border
                    ${error? "border-red-600":"border-slate-300"}
                    rounded-lg
                    m-0
                    focus:outline-none
                    focus:ring-2
                    ${error? "focus:ring-red-600":"focus:ring-brand-100"}`
                } 
                value={value} onChange={onChange}
                type={type? type: "text"}
                disabled={disabled}
                placeholder={placeholder}
                autoFocus={autoFocus}
            />
            {
                !suffix ? null:
                <div className="absolute text-xs right-1.5 top-2">
                    {suffix}
                </div>
            }
            {
                !error ? null: <ErrorLabel label={error}/>
            }
        </div>
    )
}
