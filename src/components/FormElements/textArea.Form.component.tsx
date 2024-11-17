import { ChangeEventHandler, ReactNode } from 'react';

export default function FormTextArea({
    label,
    placeholder,
    value,
    onChange,
    disabled = false,
}: {
    label: string;
    placeholder?: string;
    value: string;
    onChange: ChangeEventHandler<HTMLTextAreaElement>;
    disabled?: boolean;
}): ReactNode {
    return (
        <div className="mb-4 mt-2">
            <label className="mb-1 block text-base font-medium text-dark">
                {label}
            </label>
            <textarea
                disabled={disabled}
                placeholder={placeholder}
                onChange={onChange}
                value={value}
                className={`min-h-24 w-full bg-transparent rounded-md border border-stroke py-[10px] pr-3 pl-3 text-dark-6 outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-gray-2`}
            />
        </div>
    );
}
