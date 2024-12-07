import { apiPost } from '../handlerHelpers';

export async function Register(
    email: string,
    username: string,
    password: string
) {
    apiPost('auth/register', {
        email: email,
        username: username,
        password: password,
    });
}
