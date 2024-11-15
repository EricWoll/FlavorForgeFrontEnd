export async function apiGet(
    url: string,
    bodyContent: string,
    authToken?: string
): Promise<Response> {
    const headers = { 'Content-Type': 'application/json' };

    if (authToken) {
        Object.assign(headers, { Authorization: `Bearer ${authToken}` });
    }

    return await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/${url}?${bodyContent}`,
        {
            method: 'GET',
            headers: headers,
        }
    );
}

export async function apiPost(
    url: string,
    bodyContent: any,
    authToken?: string
): Promise<Response> {
    const headers = {
        'Content-Type': 'application/json',
    };

    if (authToken) {
        Object.assign(headers, { Authorization: `Bearer ${authToken}` });
    }

    return await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${url}`, {
        method: 'POST',
        body: JSON.stringify(bodyContent),
        headers: headers,
    });
}

export async function apiPut(
    url: string,
    bodyContent: any,
    authToken?: string
): Promise<Response> {
    const headers = { 'Content-Type': 'application/json' };

    if (authToken) {
        Object.assign(headers, { Authorization: `Bearer ${authToken}` });
    }

    return await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${url}`, {
        method: 'PUT',
        body: JSON.stringify(bodyContent),
        headers: headers,
    });
}

export async function apiRefreshToken(refreshToken: string) {
    return await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/refresh`, {
        headers: {
            Authorization: `Bearer ${refreshToken}`,
        },
    });
}
