import React from "react";
import Select from "react-select";
import { ISelectOptions } from "../../models/common";
import { ErrorLabel } from "../common/Labels";

export interface SelectSimpleProps{
    options?:ISelectOptions[]; 
    value:string | number;
    onChange:Function;
    unclearable?:boolean; 
    placeholder?:string;
    menuPlacement?:any;
    disabled?:boolean;
    error?:any;
}

export const SelectSimple = ({options, value, onChange, unclearable, placeholder, menuPlacement, disabled, error}:SelectSimpleProps) => {
    const handleChange = (evt:any) => {
        if(!evt){
            onChange("",{});
        }else{
            onChange(evt.value, {...evt});
        }
    }

    const getValueObj = (opts:ISelectOptions[] = [], val:any) => {
        return opts.find(o => o.value === val);
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
                value={getValueObj(options, value)}
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