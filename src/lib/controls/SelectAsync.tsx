import React, { useState } from "react";
import AsyncSelect from "react-select/async";
import { ISelectOptions } from "../../models/common";
import { ErrorLabel } from "../common/Labels";
import { SelectSimpleProps } from "./SelectSimple";

interface SelectAsyncProps extends SelectSimpleProps{
    onLoad:Function;
    defaultLabel: string;
}

export const SelectAsync = ({value, defaultLabel, onChange, onLoad, placeholder, menuPlacement, disabled, error}:SelectAsyncProps) => {
    const [options, setOptions] = useState([]);
    const [changed, setChanged] = useState(false);
    const callbackOptions = (inputValue:any, callback:Function) => {
        onLoad(
            inputValue,
            (result:ISelectOptions[])=>{
                setOptions(options);
                callback(result);
            }
        );
    };

    const handleChange = (evt:any) => {
        setChanged(true);
        if(!evt){
            onChange("",{});
        }else{
            onChange(evt.value, {...evt});
        }
    }

    const getValueObj = (opts:any[], val:any) => {
        if(!changed && !opts.length){
            return {label:defaultLabel, value:val};
        }
        if(!val){
            return null;
        }
        return opts.find(o => o.value === val);
    }
    
    return (
        <React.Fragment>
            <AsyncSelect
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
                isClearable
                placeholder={placeholder}
                menuPlacement={menuPlacement}
                isDisabled={disabled}
                cacheOptions
                loadOptions={callbackOptions}
            />
            {
                error? <ErrorLabel label={error}/> : null
            }
        </React.Fragment>
    )
}
