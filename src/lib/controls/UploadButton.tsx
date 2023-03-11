import { useEffect, useState } from "react";
import { Loading } from "../common/Loading";
import { HeroIcon } from "../common/HeroIcon";
import { Button } from "./Button";

interface IUploadButtonProps{
    fileUrl: string;
    title: string;
    onError?: any;
    onSuccess?: any;
    onRemove?: any;
    useImageKit?: any; 
    fileName: string;
    id?: string;
}
export const UploadButton = ({fileUrl, title, onError, onSuccess, onRemove, useImageKit, fileName, id="" }:IUploadButtonProps) => {
    const [loading, setLoading] = useState(false);

    useEffect(()=>{
        const uploader = document.getElementById(id);
        if(uploader){
            uploader.addEventListener('change', ()=>{
                setLoading(true);
            });
        }
    },[fileUrl]);

    const handleClick = () => {
        const uploader = document.getElementById(id);
        if(uploader){
            uploader.click();
        }
    }

    const onDone = (result:any) => {
        setLoading(false);
        if(result){
            onSuccess(result);
        }else{
            onError();
        }
    }
    
    if(fileUrl){
        return(
            <div className="w-48">
                <a href={fileUrl} target="_blank" rel="noreferrer"
                    className="cursor-pointer font-semibold text-ellipsis text-sm whitespace-nowrap"
                >
                    {fileUrl}
                </a>
                <Button title="Hapus file" icon="XMarkIcon" onClick={onRemove}/>
            </div>
        )
    }
    return (
        <div className="flex cursor-pointer py-1 px-3 rounded-full items-center justify-center w-fit bg-brand-300 hover:bg-brand-100 text-white"
                onClick={handleClick}
        >
            {
                loading ? <div className="mr-12">
                    <Loading white/>
                </div> : 
                <HeroIcon name="ArrowUpTrayIcon" className="w-4 mr-3"/>
            }
            <span>{title}</span>
            {/* <IKUpload
                fileName={fileName}
                onError={()=>onDone(null)}
                onSuccess={onDone}
                className="hidden"
                id={id}
            /> */}
        </div>
    )
}