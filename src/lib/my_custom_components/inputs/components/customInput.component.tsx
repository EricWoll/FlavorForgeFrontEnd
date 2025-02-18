import { ChangeEventHandler } from 'react';

export const InputStyleType = {
    HEADER_SEARCH_LARGE:
        'w-full px-2 outline-none placeholder:text-tinted_gray_500 text-tinted_gray_300 bg-transparent',
    HEADER_SEARCH_SMALL:
        'w-full px-2 placeholder:text-tinted_gray_500 text-tinted_gray_300 bg-tinted_gray_700 outline outline-2 outline-tinted_gray_500 focus:outline-tinted_gray_100 rounded-md',
};

interface CustomInputProps {
    onChange: ChangeEventHandler<HTMLInputElement>;
    placeholder?: string | undefined;
    value: string | number | readonly string[] | undefined;
    styleType: string;
    inputType?: string;
    onEnter?: () => void;
}

export default function CustomInput(props: CustomInputProps) {
    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            props.onEnter?.();
        }
    };

    return (
        <input
            className={props.styleType}
            onChange={props.onChange}
            placeholder={props.placeholder}
            value={props.value}
            type={props.inputType}
            onKeyDown={handleKeyDown}
        />
    );
}
