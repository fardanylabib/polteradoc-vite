import React from "react";
import Select from "react-select";
import { ISelectCityOptions} from "../../models/common";
import { ErrorLabel } from "../common/Labels";

interface SelectCityProps{
    options:ISelectCityOptions[]; 
    value:string | number;
    onChange:any;
    unclearable?:boolean; 
    placeholder?:string;
    menuPlacement?:any;
    disabled?:boolean;
    error?:any;
}

export const SelectCity = ({options, value, onChange, unclearable, placeholder, menuPlacement, disabled, error}:SelectCityProps) => {
    const handleChange = (evt:any) => {
        if(!evt){
            onChange("", "");
        }else{
            onChange(evt.value, evt.provinceID);
        }
    }

    const defaultValue = (opts:any[], val:any) => {
        return opts ? opts.find(o => o.value === val) : "";
    }

    return (
        <React.Fragment>
            <Select options={options}
                styles={{
                    control: (base, state) => ({
                        ...base,
                        borderWidth: "1px",
                        borderRadius:"0.5rem",  
                        cursor: "text",
                        borderColor: error ? "#dc2626": "#cbd5e1",
                        outline: state.isFocused? `2px solid ${error?"#dc2626" : "#3bd4b4"}`:"none",
                        boxShadow: "none"
                    })
                }}
                value={defaultValue(options, value)}
                onChange={handleChange}
                isClearable={!unclearable}
                placeholder={placeholder}
                menuPlacement={menuPlacement}
                isDisabled={disabled}
            />
            {
                error? <ErrorLabel label={error}/> : null
            }
        </React.Fragment>
    )
}