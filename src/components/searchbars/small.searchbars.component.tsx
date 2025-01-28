import {
    ChangeEventHandler,
    Dispatch,
    MouseEventHandler,
    SetStateAction,
} from 'react';

import CustomInput, { InputStyleType } from '../customInput.component';
import LeftArrowIcon from '../svgs/leftArrowIcon.svg.component';

export default function SmallSearchBar({
    onArrowClick,
    value,
    onChange,
}: {
    onArrowClick: MouseEventHandler<SVGSVGElement>;
    value: string | undefined;
    onChange: ChangeEventHandler<HTMLInputElement>;
}) {
    return (
        <div className="flex gap-2 w-screen">
            <LeftArrowIcon
                onClick={onArrowClick}
                className="w-8 h-8 select-none cursor-pointer"
            />
            <CustomInput
                onChange={onChange}
                value={value}
                styleType={InputStyleType.HEADER_SEARCH_SMALL}
                inputType="search"
            />
        </div>
    );
}
