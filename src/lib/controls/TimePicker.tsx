import Flatpickr from "react-flatpickr";
import { format, parse } from "date-fns";

interface ITimePickerProps{
    timeValue:string,
    onTimeChange:any
}

export const TimePicker = ({timeValue, onTimeChange}:ITimePickerProps) => {
    return(
        <Flatpickr
            options={{
                enableTime: true,
                noCalendar: true,
                dateFormat: "H:i",
                time_24hr: true,
                defaultDate: timeValue? parse(timeValue, "HH:mm", new Date()) : undefined,
                onChange:(dates)=>{
                    onTimeChange(format(new Date(dates[0]),"HH:mm"));
                }
            }}
            placeholder="Select Time"
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