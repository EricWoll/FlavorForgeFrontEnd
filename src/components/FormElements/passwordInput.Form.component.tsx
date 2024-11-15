import { ReactNode } from 'react';
import { FormInput } from './input.Form.Component';

export default function FormPassword({
    value,
    onChange,
}: {
    value: string;
    onChange: Function;
}): ReactNode {
    const handleInputChange = (e: any) => {
        e.preventDefault();
        onChange(e.target.value);
    };

    return (
        <FormInput
            label="Password"
            type="password"
            placeholder="*********"
            onChange={handleInputChange}
            value={value}
        />
    );
}
