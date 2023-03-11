interface SelectProps {
    onChange?: any,
    items: string,
    selectedItem: string | object,
    customClass?:string
}

export default function Select({onChange, items, selectedItem, customClass}: SelectProps){
    return(
        <div className={`flex cursor-pointer py-1 px-3 rounded-full items-center justify-center ${customClass? customClass : "bg-brand-300 hover:bg-brand-100 text-white"}`}
            onChange={onChange}
        >
            <select></select>
        </div>
    )
}
