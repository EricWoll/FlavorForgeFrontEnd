import { ChangeEventHandler, ReactNode } from 'react';
import { FormInput } from './input.Form.Component';

export default function FormPassword({
    value,
    onChange,
}: {
    value: string;
    onChange: ChangeEventHandler<HTMLInputElement>;
}): ReactNode {
    return (
        <FormInput
            label="Password"
            type="password"
            placeholder="*********"
            onChange={onChange}
            value={value}
        />
    );
}
