import * as HeroIcons from "@heroicons/react/24/outline";
import {FC} from 'react';

// import {} from '@heroicons/react/outline';
export const HeroIcon: FC<{name: string, className: string}>= (props) => {
    const {...icons} = HeroIcons;
    // @ts-ignore
    const TheIcon: JSX.Element = icons[props.name];
    return(
        <>
            {/* @ts-ignore */}
            <TheIcon className={`${props.className} stroke-2`}/>
        </>
    )
}