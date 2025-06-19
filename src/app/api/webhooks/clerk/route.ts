// app/api/webhooks/clerk/route.ts

import { Webhook } from 'svix';
import { headers } from 'next/headers';
import { NextResponse } from 'next/server';
import { apiPost } from '@/utils/fetch/apiBase.fetch';

import { createClerkClient } from '@clerk/backend';

const publishableKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;
const secretKey = process.env.CLERK_SECRET_KEY;

const clerk = createClerkClient({
    publishableKey: publishableKey,
    secretKey: secretKey,
});

export async function POST(req: Request) {
    try {
        // Extract Svix webhook headers
        const headerPayload = await headers();
        const svix_id = headerPayload.get('svix-id');
        const svix_timestamp = headerPayload.get('svix-timestamp');
        const svix_signature = headerPayload.get('svix-signature');

        if (!svix_id || !svix_timestamp || !svix_signature) {
            console.error('Missing svix headers');
            return new Response('Missing headers', { status: 400 });
        }

        // Get raw body as text
        const body = await req.text();

        if (!process.env.CLERK_WEBHOOK_SECRET) {
            console.error('CLERK_WEBHOOK_SECRET not set');
            return new Response('Server configuration error', { status: 500 });
        }

        const webhook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);
        let evt: any;

        try {
            evt = webhook.verify(body, {
                'svix-id': svix_id,
                'svix-timestamp': svix_timestamp,
                'svix-signature': svix_signature,
            });
        } catch (err) {
            console.error('Error verifying webhook:', err);
            return new Response('Webhook verification failed', { status: 400 });
        }

        // Immediately acknowledge receipt
        const response = NextResponse.json({ message: 'Success' });

        // Process event asynchronously
        // For example using setTimeout to offload processing:
        setTimeout(() => {
            processWebhookEvent(evt, svix_id).catch((error) =>
                console.error('Webhook processing error:', error)
            );
        }, 0);

        return response;
    } catch (error) {
        console.error('Webhook handler error:', error);
        return new Response('Internal Server Error', { status: 500 });
    }
}

// Asynchronous event processing function
async function processWebhookEvent(event: any, svixId: string) {
    if (event.data && event.type === 'user.created') {
        const userPayload = {
            userId: event.data.id,
            username: event.data.username,
            email: event.data.email,
            imageId: event.data.imageUrl || event.data.image_url,
        };

        try {
            await clerk.users.updateUserMetadata(event.data.id, {
                privateMetadata: {
                    role: 'FREE',
                },
            });

            await apiPost('auth/signup', userPayload, undefined, {
                'svix-id': svixId,
            });
        } catch (error) {
            console.error('Error in user creation:', error);
        }
    }
}
