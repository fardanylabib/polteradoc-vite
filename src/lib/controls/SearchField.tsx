import { useEffect, useRef, useState } from "react"
import { SEARCH_DEBOUNCE_DELAY } from "../../constants/common";
import { HeroIcon } from "../common/HeroIcon";

interface ISearchField{
    onSearch:Function;
    placeholder:string;
    expanded:boolean;
}

export default function SearchField({onSearch, placeholder, expanded}:ISearchField){
    const [active, setActive] = useState(expanded);
    const [keyword, setKeyword] = useState("");
    const debouncer = useRef<any>(null);
    const elementRef = useRef<any>(null);

    useEffect(()=>{
        if(expanded){
            return;
        }
        let checkToInactive = (event:any) => {
            if(keyword.length > 0){
                return;
            }
            if(elementRef.current && !elementRef.current.contains(event.target)){
                setActive(false);
            }
        }
        document.addEventListener('click', checkToInactive);
        return ()=>{
            document.removeEventListener('click', checkToInactive);
        }
    },[keyword]);

    const onInputChange = (evt:any) => {
        const _keyword = evt.target.value;
        setKeyword(_keyword);
        clearTimeout(debouncer.current);
        if(_keyword.length > 1 || !_keyword){
            debouncer.current = setTimeout(()=>{
                onSearch(_keyword);
            }, SEARCH_DEBOUNCE_DELAY);
        }
    }

    const onSearchClick = ()=> {
        if(expanded){
            return;
        }
        setActive(true);
    }

    return(
        <div className={`flex items-center ${!expanded && !active? "h-8 w-8" : "rounded-full h-9 w-72 bg-slate-100 pr-0.5"}`}
            ref={elementRef}
        >
            {
                !active? null:
                <input className="border-0 outline-0 flex-grow bg-transparent px-4 placeholder:text-slate-300" type="search"
                    onChange={onInputChange}
                    value={keyword}
                    placeholder={placeholder?placeholder : "Search"}
                    autoFocus={true}
                />
            }
             <div className="rounded-full w-8 h-8 hover:bg-slate-200 cursor-pointer flex flex-col"
                onClick={onSearchClick}
            >
                <HeroIcon className="w-5 m-auto" name="MagnifyingGlassIcon"/>
            </div>
        </div>
    )
}