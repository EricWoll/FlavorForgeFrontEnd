'use client';

import FormButton from '@/components/FormElements/button.Form.component';
import { FormColumn } from '@/components/FormElements/column.Form.component';
import FormContainer from '@/components/FormElements/container.Form.component';
import { FormEmailInput } from '@/components/FormElements/emailInput.Form.component';
import { FormUsernameInput } from '@/components/FormElements/usernameInput.Form.component';
import { useState } from 'react';

export default function Page() {
    const [emailInput, setEmailInput] = useState('');
    const [userameInput, setUserameInput] = useState('');

    const handleButtonClick = () => {};

    return (
        <div className="grow flex flex-col justify-center items-center min-w-80">
            <div className="">
                <form className="flex gap-3 text-center">
                    <section>
                        <p>Sign In</p>
                        <input type="radio" name="authSelector" />
                    </section>
                    <section>
                        <p>Register </p>
                        <input type="radio" name="authSelector" />
                    </section>
                </form>
            </div>
            <FormContainer>
                <FormColumn>
                    <FormEmailInput
                        value={emailInput}
                        onChange={setEmailInput}
                    />
                    <FormUsernameInput
                        value={userameInput}
                        onChange={setUserameInput}
                    />
                    <FormButton
                        buttonText="Submit"
                        onClick={handleButtonClick}
                    />
                </FormColumn>
            </FormContainer>
        </div>
    );
}
