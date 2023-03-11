import Flatpickr from "react-flatpickr";
import { format, parse } from "date-fns";

interface IDatePickerProps{
    dateValue:string,
    onDateChange:any
}

export const DatePicker = ({dateValue, onDateChange}:IDatePickerProps) => {
    return(
        <Flatpickr
            options={{
                altInput: true,
                altFormat: "j F Y",
                dateFormat: "dd mmm Y",
                defaultDate: dateValue? parse(dateValue, "yyyy-MM-dd", new Date()) : undefined,
                onChange:(dates)=>{
                    onDateChange(format(new Date(dates[0]), "yyyy-MM-dd"));
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