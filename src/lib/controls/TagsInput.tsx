import CreatableSelect from 'react-select/creatable';

interface TagsInputProps{
    options?:any, 
    values:string[], 
    onChange:any, 
    unclearable?:boolean, 
    placeholder?:string, 
    menuPlacement?:any, 
    disabled?:boolean
}

export const TagsInput = ({options, values, onChange, unclearable, placeholder, menuPlacement, disabled}:TagsInputProps) => {
    const handleChange = (evt:any) => {
        if(!evt){
            onChange([]);
        }else{
            onChange(evt.map((ev:any) => ev.value));
        }
    }

    const defaultValues = (vals:string[]) => {
        return vals.map(v => ({label:v, value: v}))
    }

    return (
        <CreatableSelect options={options? options : []}
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
            value={defaultValues(values)}
            onChange={handleChange}
            isClearable={!unclearable}
            placeholder={placeholder}
            menuPlacement={menuPlacement}
            isDisabled={disabled}
        />
    )
}