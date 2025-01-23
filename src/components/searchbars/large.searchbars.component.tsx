'use client';

import useWindow, { WindowSizes } from '@/hooks/useWindow.hook';
import CustomInput, { InputStyleType } from '../customInput.component';
import {
    ChangeEvent,
    ChangeEventHandler,
    Dispatch,
    SetStateAction,
    useState,
} from 'react';

import SearchIcon from '@/svgs/icon-search.svg';

export default function LargeSearchBar({
    setSearchIsclicked,
    onChange,
    value,
}: {
    setSearchIsclicked: Dispatch<SetStateAction<boolean>>;
    onChange: ChangeEventHandler<HTMLInputElement>;
    value: string | number | readonly string[] | undefined;
}) {
    return (
        <div className="flex max-w-4xl rounded-md outline outline-2 outline-tinted_gray_500 focus:outline-tinted_gray_100">
            <CustomInput
                styleType={InputStyleType.HEADER_SEARCH_LARGE}
                onChange={onChange}
                value={value}
                placeholder="Search"
                inputType="search"
            />
            <div className="px-2 hover:bg-tinted_gray_500 rounded-sm">
                <SearchIcon className="w-6 h-6 rounded-sm select-none cursor-pointer" />
            </div>
        </div>
    );
}
