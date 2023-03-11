import { useEffect, useState } from 'react';
import { HeroIcon } from '../common/HeroIcon';

const MAX_PAGES_IN_LIST = 6;

interface IPaginationProps{
    current:number;
    total:number;
    onNext:Function;
    onPrev:Function;
    onGoTo:Function;
}

export const Pagination = ({
    current, total, onNext, onPrev, onGoTo
}:IPaginationProps) => {
    const [pages, setPages] = useState<string[]>(['1']);

    useEffect(()=>{
        setPages(getPageList(current, total))
    },[current, total])

    const getPageList = (currentPage:number, totalPage:number) => {
        let pageList:string[]= [];
        if(totalPage <= MAX_PAGES_IN_LIST){
            //1,2,3,4
            for(let i = 1 ; i<=totalPage ; i++){
                pageList = [...pageList, `${i}`];
            }
            return pageList;
        }
        pageList = new Array(MAX_PAGES_IN_LIST);
        pageList[0] = "1";
        pageList[MAX_PAGES_IN_LIST-1] = `${totalPage}`;
        if(currentPage < MAX_PAGES_IN_LIST-2){
            pageList[MAX_PAGES_IN_LIST-2] = '...';
            for(let i = 1; i < MAX_PAGES_IN_LIST-2 ; i++){
                pageList[i] = `${i+1}`;
            }
        }else if(totalPage - currentPage < MAX_PAGES_IN_LIST - 3){
            pageList[1] = '...';
            let counter = totalPage - 1;
            for(let i = MAX_PAGES_IN_LIST-2 ; i>1 ; i--){
                pageList[i] = `${counter}`;
                --counter;
            }
        }else{
            pageList[1] = '...';
            pageList[MAX_PAGES_IN_LIST-2] = '...';
            let counter = currentPage - 1;
            for(let i = 2; i< MAX_PAGES_IN_LIST-2 ; i++){
                pageList[i] = `${counter}`;
                ++counter;
            }
        }
        return pageList;
    }

    const handleClickPage = (id:number, page:string) => {
        if(page !== '...'){
            onGoTo(page);
            return;
        }
        if(id === 1){
            onGoTo(parseInt(pages[id+1])-1);
        }else{
            onGoTo(parseInt(pages[id-1])+1);
        }
    }

    const handleClickPrev = () => {
        if(current === 1){
            return;
        }
        onPrev();
    }

    const handleClickNext = () => {
        if(current === total){
            return;
        }
        onNext();
    }
    if(total < 2){
        return <div/>
    }
    const currentPage = `${current}`;
    return(
        <nav className='p-3' >
            <ul className="flex justify-center items-center space-x-3">
                <li>
                    <div onClick = {handleClickPrev} className="cursor-pointer w-8 h-8 rounded-full hover:bg-slate-200 flex flex-col justify-center">
                        <HeroIcon name="ChevronLeftIcon" className="m-auto h-4 text-slate-500"/>
                    </div>
                </li>
                {
                    pages.map((page, id) =>(
                        <li className={`${ page === currentPage ? 'text-brand-500 font-bold':'text-slate-400'}`} key={id}>
                            <div className="hover:font-bold cursor-pointer"
                                onClick={() => handleClickPage(id, page)}
                            >
                                {page}
                            </div>
                        </li>
                    ))
                }
                <li>
                    <div onClick = {handleClickNext} className="cursor-pointer w-8 h-8 rounded-full hover:bg-slate-200 flex flex-col justify-center">
                        <HeroIcon name="ChevronRightIcon" className="m-auto h-4 text-slate-500"/>
                    </div>
                </li>
            </ul>
        </nav>
    )
}