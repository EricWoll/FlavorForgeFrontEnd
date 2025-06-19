/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        NEXTAUTH_URL: process.env.NEXTAUTH_URL,
        NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
        NEXT_PUBLIC_ORIGIN_URL: process.env.NEXT_PUBLIC_ORIGIN_URL,
    },
    async headers() {
        return [
            {
                source: '/api/(.*)',
                headers: [
                    {
                        key: 'Access-Control-Allow-Origin',
                        value: process.env.NEXT_PUBLIC_ORIGIN_URL || '*',
                    },
                    {
                        key: 'Access-Control-Allow-Methods',
                        value: 'GET, POST, OPTIONS',
                    },
                    {
                        key: 'Access-Control-Allow-Headers',
                        value: 'Authorization, Content-Type',
                    },
                ],
            },
        ];
    },
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'img.clerk.com',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'flavorforge-bucket.s3.amazonaws.com',
                pathname: '/**',
            },
        ],
    },
};

export default nextConfig;
