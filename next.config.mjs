/** @type {import('next').NextConfig} */
const nextConfig = {
    trailingSlash: false,
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
