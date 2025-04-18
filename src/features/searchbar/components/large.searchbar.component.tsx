'use client';

import useWindow, { WindowSizes } from '@/hooks/useWindow.hook';
import CustomInput, {
    InputStyleType,
} from '../../../lib/my_custom_components/inputs/components/customInput.component';
import {
    ChangeEvent,
    ChangeEventHandler,
    Dispatch,
    SetStateAction,
    useState,
} from 'react';
import SearchIcon from '../../../components/svg/searchIcon.svg.component';
import { Button } from '@/lib/my_custom_components/buttons/button.component';

interface LargeSearchBarProps {
    setSearchIsclicked: Dispatch<SetStateAction<boolean>>;
    onChange: ChangeEventHandler<HTMLInputElement>;
    value: string | number | readonly string[] | undefined;
}

export default function LargeSearchBar(props: LargeSearchBarProps) {
    return (
        <div className="flex max-w-4xl rounded-md outline outline-2 outline-tinted_gray_500 focus:outline-tinted_gray_100">
            <CustomInput
                styleType={InputStyleType.HEADER_SEARCH_LARGE}
                onChange={props.onChange}
                value={props.value}
                placeholder="Search"
                inputType="search"
            />
            <Button.Hover onClick={() => {}} className="p-0 px-1">
                <SearchIcon className="w-6 h-6" />
            </Button.Hover>
        </div>
    );
}
