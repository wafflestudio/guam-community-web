/** @type {import('next').NextConfig} */
const KEY = process.env.KEY;
const BUCKET_URL = process.env.BUCKET_URL;

const nextConfig = {
  reactStrictMode: true,
  env: {
    KEY: KEY,
    BUCKET_URL: BUCKET_URL,
  },

  async rewrites() {
    return [
      {
        source: process.env.SOURCE_PATH,
        destination: process.env.DESTINATION_URL,
      },
    ];
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
