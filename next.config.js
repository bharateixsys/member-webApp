/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
        return [
            {
                source: "/api/:path*",
                destination: "https://ride-sen-qa-lx-e0ageve6gmf3gtdj.canadacentral-01.azurewebsites.net/api/:path*", // Backend
            },
        ];
    },
    images: {
        unoptimized: true,
    },
};

module.exports = nextConfig;