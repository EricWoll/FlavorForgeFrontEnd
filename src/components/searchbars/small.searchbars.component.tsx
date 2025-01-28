import { ChangeEventHandler, Dispatch, SetStateAction } from 'react';

import LeftArrowIcon from '@/svgs/icon-arrow-left.svg';
import CustomInput, { InputStyleType } from '../customInput.component';

export default function SmallSearchBar({
    onArrowClick,
    value,
    onChange,
}: {
    onArrowClick: Dispatch<SetStateAction<boolean>>;
    value: string | undefined;
    onChange: ChangeEventHandler<HTMLInputElement>;
}) {
    return (
        <div className="flex gap-2 w-screen">
            <LeftArrowIcon
                className="w-8 h-8 select-none cursor-pointer"
                onClick={onArrowClick}
                viewBox="0 0 40 40"
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
