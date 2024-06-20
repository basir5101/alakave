import createNextIntlPlugin from "next-intl/plugin";
const withNextIntl = createNextIntlPlugin();
/**
 * @type {import('next').NextConfig}
 */

const nextConfig = {
  experimental: {
    reactRoot: true,
  },
  images: {
    remotePatterns: [
      { hostname: "alakave.com" },
      { hostname: "firebasestorage.googleapis.com" },
      { hostname: "storage.googleapis.com" },
    ],
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        tls: false,
        net: false,
        request: false,
      };
    }
    return config;
  },
};

export default withNextIntl(nextConfig);
