import { ChangeEventHandler, ReactNode } from 'react';
import { FormInput } from './input.Form.Component';

export function FormEmailInput({
    value,
    onChange,
}: {
    value: string;
    onChange: ChangeEventHandler<HTMLInputElement>;
}): ReactNode {
    return (
        <FormInput
            label="Email"
            type="email"
            placeholder="JohnDevin@yourmail.com"
            onChange={onChange}
            value={value}
            svgIcon={
                <svg
                    width={20}
                    height={20}
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <g
                        opacity={0.8}
                        fillRule="evenodd"
                        clipRule="evenodd"
                        fill="#9CA3AF"
                    >
                        <path d="M3.334 4.167A.838.838 0 0 0 2.501 5v10c0 .456.377.833.833.833h13.333a.838.838 0 0 0 .834-.833V5a.838.838 0 0 0-.834-.833H3.334ZM.834 5c0-1.377 1.123-2.5 2.5-2.5h13.333c1.377 0 2.5 1.123 2.5 2.5v10c0 1.377-1.123 2.5-2.5 2.5H3.334a2.505 2.505 0 0 1-2.5-2.5V5Z" />
                        <path d="M.985 4.522a.833.833 0 0 1 1.16-.205l7.856 5.499 7.855-5.5a.833.833 0 1 1 .956 1.366l-8.333 5.833a.833.833 0 0 1-.956 0L1.19 5.682a.833.833 0 0 1-.205-1.16Z" />
                    </g>
                </svg>
            }
        />
    );
}
