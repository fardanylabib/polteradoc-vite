import { useState,useRef, Fragment } from "react";
import { Tooltip } from 'react-tooltip';
import { httpUpload } from "../../apis/Global";
import { API_HOST } from "../../constants/Env";
import { HeroIcon } from "../common/HeroIcon";
import { Loading } from "../common/Loading";

interface ImageControlProps{
    image:string;
    placeholder?:string;
    noControl?:boolean;
    onUploaded?:any;
    onRemove?:any;
    onError?:any;
    useImageKit?:boolean;
    fileName?:string;
}
export const ImageControl = ({
    image,
    placeholder,
    noControl,
    onUploaded,
    onRemove,
    onError
}:ImageControlProps) => {
    const [imageMenu, setImageMenu] = useState(false);
    const [loading, setLoading] = useState(false);
    const ref = useRef<HTMLInputElement>(null);

    const handleClickUploader = () => {
        if(ref.current){
            ref.current.click();
        }
    }

    const handleUpload = async (e: any) => {
        if (e.target.files) {
            setLoading(true);
            const {data, error} = await httpUpload(`${API_HOST}/upload`, e.target.files[0]);
            if(error){
                onError(error);
            }else{
                onUploaded({
                    url:data.url,
                    id:data.id
                });
            }
            setLoading(false);
        }
    }
    return(
        <div className="cursor-pointer rounded-lg">
            {
                image? 
                <Fragment>
                    <a data-tooltip-id="image-options">
                        <div className="w-60 h-60 rounded-lg overflow-hidden">
                            <img src={image} alt="featured-image" 
                                className="h-60 w-60 scale-100 hover:scale-110 duration-300 object-contain"
                            />
                        </div>
                    </a>
                    <Tooltip id="image-options" clickable openOnClick>
                        <div className="cursor-pointer text-sm">
                            <a href={image} target="_blank" rel="noreferrer">
                                <div className="border-b py-2 hover:font-bold">View image</div>
                            </a>
                            <div className="py-2 hover:font-bold" onClick={onRemove}>Remove image</div>
                        </div>
                    </Tooltip>
                </Fragment>
                :
                <div className="cursor-pointer p-1 text-sm rounded-lg w-60 h-60 border-2 border-dashed border-slate-300 flex flex-col justify-center hover:bg-slate-200"
                    onClick={handleClickUploader}
                >
                    <HeroIcon name="CameraIcon" className="w-10 text-slate-300 mx-auto"/>
                    {
                        loading? 
                        <span className="flex itens-center mx-auto"> 
                            <span>Mengupload</span><Loading/>
                        </span> : 
                        <p className="text-center text-xs">{placeholder}</p>
                    }
                    <input type="file" onChange={handleUpload} className="hidden" ref={ref}/>
                </div>
            }
        </div>
    )
}