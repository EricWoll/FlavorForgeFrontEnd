import { ChangeEventHandler, ReactNode } from 'react';

export function FormInput({
    label,
    type,
    placeholder,
    value,
    onChange,
    svgIcon,
    disabled = false,
}: {
    label: string;
    type: string;
    placeholder?: string;
    value: string;
    onChange: ChangeEventHandler<HTMLInputElement>;
    svgIcon?: ReactNode;
    disabled?: boolean;
}): ReactNode {
    return (
        <div className="mb-4 mt-2">
            <label className="mb-1 block text-base font-medium text-dark">
                {label}
            </label>
            <div className="relative">
                <input
                    disabled={disabled}
                    type={type}
                    placeholder={placeholder ? placeholder : ''}
                    onChange={onChange}
                    value={value}
                    className={`w-full bg-transparent rounded-md border border-stroke py-[10px] pr-3 ${
                        svgIcon ? `pl-12` : `pl-3`
                    } text-dark-6 outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-gray-2`}
                />
                {svgIcon && (
                    <span className="absolute top-1/2 left-4 -translate-y-1/2">
                        {svgIcon}
                    </span>
                )}
            </div>
        </div>
    );
}
