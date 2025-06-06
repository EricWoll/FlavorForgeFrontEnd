export async function apiGet<T>(
    url: string,
    requestContent?: string,
    authToken?: string | null,
    cache: 'default' | 'no-store' = 'default',
    responseType: 'json' | 'blob' | 'arrayBuffer' = 'json'
): Promise<T> {
    const headers: Record<string, string> = {};

    // Only add Content-Type if expecting JSON
    if (responseType === 'json') {
        headers['Content-Type'] = 'application/json';
    }

    if (authToken) {
        headers['Authorization'] = `Bearer ${authToken}`;
    }

    const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/${url}${
            requestContent ? '?' + requestContent : ''
        }`,
        {
            method: 'GET',
            headers,
            cache,
        }
    );

    if (!response.ok) {
        const error = await response.text();
        throw new Error(`API Error ${response.status}: ${error}`);
    }

    switch (responseType) {
        case 'blob':
            return (await response.blob()) as T;
        case 'arrayBuffer':
            return (await response.arrayBuffer()) as T;
        default:
            return (await response.json()) as T;
    }
}

export async function apiPost<T>(
    url: string,
    bodyContent: any,
    authToken?: string
): Promise<T> {
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

        return response.json(); // Return the response if successful
    } catch (error) {
        console.error('API Post Request Failed:', error);
        throw error; // Re-throw or return a custom error response
    }
}

export async function apiPut<T>(
    url: string,
    bodyContent: any,
    authToken?: string
): Promise<T> {
    const headers = { 'Content-Type': 'application/json' };

    if (authToken) {
        Object.assign(headers, { Authorization: `Bearer ${authToken}` });
    }

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${url}`, {
        method: 'PUT',
        body: JSON.stringify(bodyContent),
        headers: headers,
    });

    if (!response.ok) {
        const error = await response.text();
        throw new Error(`API Error ${response.status}: ${error}`);
    }

    return response.json();
}

export async function apiDelete<T>(
    url: string,
    authToken: string | undefined,
    requestContent?: string
): Promise<T | null> {
    // note: can return null for 204 No Content
    const headers = { 'Content-Type': 'application/json' };

    if (authToken) {
        Object.assign(headers, { Authorization: `Bearer ${authToken}` });
    }

    const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/${url}${
            requestContent ? '?' + requestContent : ''
        }`,
        {
            method: 'DELETE',
            headers: headers,
        }
    );

    if (response.status === 204) return null; // no content, no json to parse

    if (!response.ok) {
        const error = await response.text();
        throw new Error(`API Error ${response.status}: ${error}`);
    }

    return response.json();
}
