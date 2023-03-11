import Select from "react-select";
import { ISelectOptions } from "../../models/common";

interface ISelectSimpleMultiProps{
    options?:ISelectOptions[];
    values:string[], 
    onChange:any, 
    unclearable?:boolean, 
    placeholder?:string, 
    menuPlacement?:any, 
    disabled?:boolean
}

export default function SelectSimpleMulti({options, values, onChange, unclearable, placeholder, menuPlacement, disabled}:ISelectSimpleMultiProps){
    const handleChange = (evt:any) => {
        if(!evt){
            onChange([]);
        }else{
            onChange(evt.map((ev:any) => ev.value));
        }
    }

    const defaultValues = (opts:any[] = [], vals:string[]) => {
        return (opts && vals) ? opts.filter(o => vals.includes(o.value)) : [];
    }

    return (
        <Select options={options}
            styles={{
                control: (base, state) => ({
                    ...base,
                    borderWidth: "1px",
                    borderRadius:"0.5rem",  
                    cursor: "text",
                    borderColor: "rgb(203, 213, 225)",
                    outline: state.isFocused? "2px solid #3bd4b4":"none",
                    boxShadow: "none"
                })
            }}
            isMulti
            value={defaultValues(options, values)}
            onChange={handleChange}
            isClearable={!unclearable}
            placeholder={placeholder}
            menuPlacement={menuPlacement}
            isDisabled={disabled}
        />
    )
}