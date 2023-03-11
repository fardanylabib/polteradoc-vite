interface FieldLabelProps{
    label:string,
    mandatory?:boolean,
    className?:string;
}

interface ErrorLabelProps{
    label:string,
    className?:string;
}

export const FieldLabel = ({label, mandatory, className}:FieldLabelProps) => (
    <div className={`flex text-sm font-semibold mb-1.5 ${className?className : ""}`}>
        <span>{label}</span>
        {
            mandatory? <span className="text-red-600 ml-1">*</span> : null
        }
    </div>
)



export const ErrorLabel = ({label, className}:ErrorLabelProps)=> (
    <div className={`text-red-600 text-xs font-semibold mt-0.5 ${className?className : ""}`}>
        {label}
    </div>
)