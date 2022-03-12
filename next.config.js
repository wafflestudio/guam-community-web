/** @type {import('next').NextConfig} */
const KEY = process.env.KEY;

const nextConfig = {
  reactStrictMode: true,
  env: {
    KEY: KEY,
  },

  async rewrites() {
    if (process.env.NODE_ENV !== "production") {
      return [
        {
          source: process.env.SOURCE_PATH,
          destination: process.env.DESTINATION_URL,
        },
      ];
    }
  },

  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      issuer: /\.[jt]sx?$/,
      use: ["@svgr/webpack"],
    });

    return config;
  },
};

module.exports = nextConfig;
