import {
    ChangeEventHandler,
    Dispatch,
    MouseEventHandler,
    SetStateAction,
} from 'react';

import CustomInput, {
    InputStyleType,
} from '../../../lib/my_custom_components/inputs/components/customInput.component';
import LeftArrowIcon from '../../../components/svg/leftArrowIcon.svg.component';
import { Button } from '@/lib/my_custom_components/buttons/button.component';

interface SmallSearchBarProps {
    onArrowClick: MouseEventHandler<HTMLButtonElement>;
    value: string | undefined;
    onChange: ChangeEventHandler<HTMLInputElement>;
}

export default function SmallSearchBar(props: SmallSearchBarProps) {
    return (
        <div className="flex gap-2 w-screen">
            <Button.Hover onClick={props.onArrowClick} className="p-0">
                <LeftArrowIcon className="w-8 h-8" />
            </Button.Hover>
            <CustomInput
                onChange={props.onChange}
                value={props.value}
                styleType={InputStyleType.HEADER_SEARCH_SMALL}
                inputType="search"
            />
        </div>
    );
}
