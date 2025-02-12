import {
    ChangeEventHandler,
    Dispatch,
    MouseEventHandler,
    SetStateAction,
} from 'react';

import CustomInput, { InputStyleType } from '../customInput.component';
import LeftArrowIcon from '../svg/leftArrowIcon.svg.component';

interface SmallSearchBarProps {
    onArrowClick: MouseEventHandler<SVGSVGElement>;
    value: string | undefined;
    onChange: ChangeEventHandler<HTMLInputElement>;
}

export default function SmallSearchBar(props: SmallSearchBarProps) {
    return (
        <div className="flex gap-2 w-screen">
            <LeftArrowIcon
                onClick={props.onArrowClick}
                className="w-8 h-8 select-none cursor-pointer"
            />
            <CustomInput
                onChange={props.onChange}
                value={props.value}
                styleType={InputStyleType.HEADER_SEARCH_SMALL}
                inputType="search"
            />
        </div>
    );
}
