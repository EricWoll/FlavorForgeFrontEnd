import { ChangeEventHandler } from 'react';

export const InputStyleType = {
    HEADER_SEARCH_LARGE:
        'w-full px-2 outline-none placeholder:text-tinted_gray_500 text-tinted_gray_300 bg-transparent',
    HEADER_SEARCH_SMALL:
        'w-full px-2 placeholder:text-tinted_gray_500 text-tinted_gray_300 bg-tinted_gray_700 outline outline-2 outline-tinted_gray_500 focus:outline-tinted_gray_100 rounded-md',
};

export default function CustomInput({
    onChange,
    placeholder,
    value,
    styleType,
    inputType,
}: {
    onChange: ChangeEventHandler<HTMLInputElement>;
    placeholder?: string | undefined;
    value: string | number | readonly string[] | undefined;
    styleType: string;
    inputType?: string;
}) {
    return (
        <input
            className={styleType}
            onChange={onChange}
            placeholder={placeholder}
            value={value}
            type={inputType}
        />
    );
}
