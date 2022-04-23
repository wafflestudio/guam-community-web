/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  env: {
    KEY: process.env.KEY,
    BUCKET_URL: process.env.BUCKET_URLL,
    REST_API_KEY: process.env.REST_API_KEY,
    CLIENT_SECRET: process.env.CLIENT_SECRET,
  },

  eslint: {
    ignoreDuringBuilds: true,
  },

  async rewrites() {
    return [
      {
        source: process.env.SOURCE_PATH,
        destination: process.env.DESTINATION_URL,
      },
      {
        source: "/relyingparty/:path*",
        destination: `${process.env.GOOGLE_API}?key=${process.env.KEY}`,
      },
      {
        source: "/oauth/authorize",
        destination: `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.REST_API_KEY}&redirect_uri=http://localhost:3000/oauth/kakao/callback&response_type=code`,
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
