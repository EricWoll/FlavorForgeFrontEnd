import { apiPost } from './apiBase.fetch';

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

export async function apiRefreshToken<T>(refreshToken: string): Promise<T> {
    return await apiPost<T>('auth/refresh', '', refreshToken);
}
