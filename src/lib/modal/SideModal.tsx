import {useState, useRef, useEffect} from "react";
import IconButton from "../controls/IconButton";


interface SideModalProps{
    title?: string;
    children?:any;
    unclosable?:boolean;
    confirmButton?: string; 
    cancelButton?: string;
    onClose?:any; 
    onConfirm?:any;
    size?: "full" | "xl" | "lg" | "md" | "sm";
}

export const SideModal = ({
    onClose,
    title,
    children, 
    unclosable,
    confirmButton, 
    cancelButton, 
    onConfirm,
    size
}:SideModalProps) => {
    const [show, setShow] = useState(false);
    const closeModal = () => {
        setShow(false);
        setTimeout(()=>{
            onClose();
        },300);
    }
    const confirmModal = () => {
        setShow(false);
        setTimeout(()=>{
            onConfirm();
        },300);
    }

    useEffect(()=>{
        setTimeout(()=>{
          setShow(true);
        },30);
        if(unclosable){
           return; 
        }
    },[]);

    const getSize = (type:any) => {
        switch(type){
            case "full":
                return "";
            case "xl":
                return "lg:w-5/6";
            case "lg":
                return "lg:w-4/5";
            case "md":
                return "lg:w-1/2";
            default:
                return "lg:w-1/3";
        }
    }
    const getOffset = (type:any) => {
        switch(type){
            case "full":
            case "xl":
            case "lg":
                return "-right-full";
            case "md":
                return "lg:-right-1/2";
            default:
                return "lg:-right-1/3";
        }
    }

    return (
        <div className="fixed top-0 left-0 w-full h-screen z-20">
            <div className="absolute bg-black opacity-60 w-full h-screen" onClick={closeModal}/>     
            <div className={`absolute w-full transition-all duration-500
                ${getSize(size)} 
                ${show? "right-0" : getOffset(size)}
                bg-slate-100 h-screen top-0 flex flex-col`} 
            >
                {
                        unclosable?null:
                        <IconButton onClick={closeModal} icon="XMarkIcon" className="absolute top-2 right-2" bgClassName="bg-slate-100 hover:bg-slate-200"/>
                }
                <div className="p-5 text-lg font-bold">
                    {title}
                </div>
                <div className="px-5 flex-grow overflow-auto">
                    {children}
                </div>
            </div>
        </div>
    );
}