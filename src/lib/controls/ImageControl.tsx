import { useEffect, useState,useRef } from "react";
import { Popover } from "react-tiny-popover";
import { HeroIcon } from "../common/HeroIcon";
import { Loading } from "../common/Loading";

interface ImageControlProps{
    image:string;
    placeholder?:string;
    noControl?:boolean;
    loading?:boolean;
    onUpload?:any;
    onRemove?:any;
    useImageKit?:boolean;
    fileName?:string;
}
export const ImageControl = ({
    image,
    placeholder,
    noControl,
    loading, 
    onUpload,
    onRemove
}:ImageControlProps) => {
    const [imageMenu, setImageMenu] = useState(false);
    const ref = useRef<HTMLInputElement>(null);

    const handleClick = () => {
        if(noControl){
            return;
        }
        setImageMenu(true);
    }
    const handleClickUploader = () => {
        if(ref.current){
            ref.current.click();
        }
    }

    const handleUpload = (e: any) => {
        if (e.target.files) {
            onUpload(e.target.files[0]);
        }
    }
    return(
        <div className="cursor-pointer rounded-lg">
            {
                image? 
                <div onClick={handleClick}>
                    <div className="w-28 h-28 rounded-lg overflow-hidden">
                        <img src={image} alt="featured-image" 
                            className="h-28 w-28 scale-100 hover:scale-110 duration-300 object-contain"
                        />
                    </div>
                    <Popover
                        isOpen={imageMenu}
                        positions={['left', 'bottom', 'right', 'top']} // preferred positions by priority
                        reposition={true}
                        containerClassName="z-20"
                        content={
                            <div className="p-3 bg-white border rounded-lg cursor-pointer text-sm">
                                <a href={image} target="_blank" rel="noreferrer">
                                    <div className="border-b py-2 hover:text-brand-300">View image</div>
                                </a>
                                <div className="py-2 hover:text-red-600" onClick={onRemove}>Remove image</div>
                            </div>
                        }
                        onClickOutside={() => setImageMenu(false)}
                    >
                        <div />
                    </Popover>
                </div>
                :
                <div className="cursor-pointer p-1 text-sm rounded-lg w-28 h-28 border-2 border-dashed border-slate-300 flex flex-col justify-center hover:bg-slate-200"
                    onClick={handleClickUploader}
                >
                    <HeroIcon name="CameraIcon" className="w-10 text-slate-300 mx-auto"/>
                    {
                        loading? <span className="ml-7"><Loading/></span> : <p className="text-center text-xs">{placeholder}</p>
                    }
                    <input type="file" onChange={handleUpload} className="hidden" ref={ref}/>
                </div>
            }
        </div>
    )
}