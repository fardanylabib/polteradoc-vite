interface TextAreaProps{
    name: string,
    value: string,
    onChange?:any,
    type?:string, 
    disabled?:boolean,
    placeholder?:string;
}

export default function TextArea({name,value, type, onChange, disabled, placeholder}:TextAreaProps){
    return(
        <textarea name={name} 
            className="form-control
                w-full
                px-3
                py-1.5
                bg-clip-padding
                border
                border-slate-300
                rounded-lg
                m-0
                focus:outline-none
                focus:ring-2
                focus:ring-brand-100" 
            value={value} onChange={onChange}
            disabled={disabled}
            rows={3}
            placeholder={placeholder}
        />
    )
}