import { useState } from "react"

interface TextEditableProps{
    name: string,
    value: string,
    onChange:any,
    onBlur:any,
    type?:string, 
    disabled?:boolean
}

export const TextEditable = ({name,value, type, onChange, onBlur, disabled}:TextEditableProps) => {
    const [isEdit, setIsEdit] = useState(false);
    const onLostFocus = () => {
        setIsEdit(false);
        onBlur(value);
    }
    if(isEdit){
        return (
            <input name={name} 
                className="form-control
                    w-full
                    px-3
                    py-1
                    bg-clip-padding
                    border
                    border-slate-300
                    rounded-lg
                    m-0
                    focus:outline-none
                    focus:ring-2
                    focus:ring-brand-100" 
                value={value} onChange={(evt)=>onChange(evt.target.value)}
                type={type? type: "text"}
                disabled={disabled}
                onBlur={onLostFocus}
                autoFocus
            /> 
        );
    }
    return (
        <div className="w-full px-3 py-1 bg-clip-padding m-0" onClick={()=>setIsEdit(true)}>
            {value}
        </div>
    )           
}
