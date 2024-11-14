import { FormInput } from './input.Form.Component';

export function FormUsernameInput({
    value,
    onChange,
}: {
    value: string;
    onChange: Function;
}) {
    const handleInputChange = (e: any) => {
        e.preventDefault();
        onChange(e.target.value);
    };

    return (
        <FormInput
            label="Username"
            type="text"
            placeholder="JohnDevin"
            onChange={handleInputChange}
            value={value}
            svgIcon={
                <svg
                    width={20}
                    height={20}
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M3.72 12.886a4.167 4.167 0 0 1 2.947-1.22h6.666a4.167 4.167 0 0 1 4.167 4.167v1.666a.833.833 0 1 1-1.667 0v-1.666a2.5 2.5 0 0 0-2.5-2.5H6.667a2.5 2.5 0 0 0-2.5 2.5v1.666a.833.833 0 1 1-1.667 0v-1.666a4.17 4.17 0 0 1 1.22-2.947ZM10 3.333a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5Zm-4.166 2.5a4.167 4.167 0 1 1 8.333 0 4.167 4.167 0 0 1-8.333 0Z"
                        opacity={0.8}
                        fillRule="evenodd"
                        clipRule="evenodd"
                        fill="#9CA3AF"
                    />
                </svg>
            }
        />
    );
}
