export async function apiGet(
    url: string,
    bodyContent?: string,
    authToken?: string,
    cache: 'default' | 'no-store' = 'default'
): Promise<Response> {
    const headers = { 'Content-Type': 'application/json' };

    if (authToken) {
        Object.assign(headers, { Authorization: `Bearer ${authToken}` });
    }

    return await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/${url}${
            bodyContent ? '?' + bodyContent : ''
        }`,
        {
            method: 'GET',
            headers: headers,
            cache: cache,
        }
    );
}

export async function apiPost(
    url: string,
    bodyContent: any,
    authToken?: string
): Promise<Response> {
    const headers: { [key: string]: string } = {
        'Content-Type': 'application/json',
    };

    if (authToken) {
        headers['Authorization'] = `Bearer ${authToken}`;
    }

    try {
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/${url}`,
            {
                method: 'POST',
                body: JSON.stringify(bodyContent),
                headers: headers,
            }
        );

        // Check if the response is successful (status code in range 200-299)
        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(
                `HTTP error! status: ${response.status} - ${errorText}`
            );
        }

        return response; // Return the response if successful
    } catch (error) {
        console.error('API Post Request Failed:', error);
        throw error; // Re-throw or return a custom error response
    }
}

export async function apiPostParams(
    url: string,
    bodyContent: any,
    authToken?: string
): Promise<Response> {
    const headers: { [key: string]: string } = {
        'Content-Type': 'application/json',
    };

    if (authToken) {
        headers['Authorization'] = `Bearer ${authToken}`;
    }

    try {
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/${url}${
                bodyContent ? '?' + bodyContent : ''
            }`,
            {
                method: 'POST',
                headers: headers,
            }
        );

        // Check if the response is successful (status code in range 200-299)
        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(
                `HTTP error! status: ${response.status} - ${errorText}`
            );
        }

        return response; // Return the response if successful
    } catch (error) {
        console.error('API Post Request Failed:', error);
        throw error; // Re-throw or return a custom error response
    }
}

export async function apiPostForImage(
    url: string,
    file: File,
    objectKey: string,
    newObjectKey: string,
    updateFile: boolean,
    authToken?: string
): Promise<Response> {
    const formData = new FormData();
    formData.append('image', file);
    formData.append('objectKey', objectKey);
    formData.append('newObjectKey', newObjectKey);
    formData.append('updateFile', String(updateFile));

    const headers: { [key: string]: string } = {};

    if (authToken) {
        headers['Authorization'] = `Bearer ${authToken}`;
    }

    try {
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/${url}`,
            {
                method: 'POST',
                body: formData,
                headers: headers,
            }
        );

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(
                `HTTP error! status: ${response.status} - ${errorText}`
            );
        }

        return response;
    } catch (error) {
        console.error('API Post Request Failed:', error);
        throw error;
    }
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
    return await apiPost('auth/refresh', '', refreshToken);
}

export async function apiDelete(
    url: string,
    authToken: string | undefined,
    bodyContent?: string
): Promise<Response> {
    const headers = { 'Content-Type': 'application/json' };

    if (authToken) {
        Object.assign(headers, { Authorization: `Bearer ${authToken}` });
    }

    return await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/${url}${
            bodyContent ? '?' + bodyContent : ''
        }`,
        {
            method: 'DELETE',
            headers: headers,
        }
    );
}
