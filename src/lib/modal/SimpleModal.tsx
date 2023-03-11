import {useState, useRef, useEffect} from "react";
import IconButton from "../controls/IconButton";

interface SimpleModalProps{
    title: string,
    children?:any,
    onClose?:any,
    unclosable?: boolean,
    size?: "sm" | "md" | "lg"
}

export const SimpleModal = ({
    title,
    children,
    onClose,
    unclosable,
    size
}:SimpleModalProps) => {
    const handleClose = ()=> {
        if(unclosable){
            return;
        }
        onClose();
    }
    return (
        <div className="fixed top-0 left-0 w-full h-screen z-20 flex flex-col justify-center">
            <div className="absolute bg-black opacity-60 w-full h-screen" onClick={handleClose}/>     
            <div className={`flex justify-center transition-opacity duration-300 max-h-screen py-3`}>
                <div className={`flex flex-col relative w-10/12 ${size==="sm"? "md:w-1/3" : (size === "md" ? "md:w-2/3" : "")} bg-white rounded-2xl overflow-hidden`}>
                    {
                            unclosable?null:
                            <IconButton onClick={handleClose} icon="XMarkIcon" className="absolute top-2 right-2"/>
                    }
                    <div className="p-5 text-lg font-bold">
                        {title}
                    </div>
                    <div className="flex flex-col overflow-hidden flex-grow h-full">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
}