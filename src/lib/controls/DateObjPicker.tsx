import Flatpickr from "react-flatpickr";

interface IDatePickerProps{
    dateValue:Date,
    onDateChange:any,
    disabled?:boolean
}

export const DatePicker = ({dateValue, onDateChange, disabled}:IDatePickerProps) => {
    return(
        <Flatpickr
            disabled={disabled}
            options={{
                altInput: true,
                altFormat: "j F Y",
                dateFormat: "dd mmm Y",
                defaultDate: dateValue,
                onChange:(dates)=>{
                    onDateChange(new Date(dates[0]));
                }
            }}
            className="form-control
                w-full
                pl-3
                pr-1
                py-1.5
                bg-clip-padding
                border
                border-slate-300
                rounded-lg
                m-0
                focus:outline-none
                focus:ring-2
                focus:ring-brand-100" 
        />
    )
}