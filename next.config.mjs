/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        // keep defaults
    },
    images: {
        remotePatterns: [
            {protocol: "https", hostname: "**"}
        ],
    },
};

export default nextConfig;
