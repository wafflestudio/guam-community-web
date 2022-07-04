/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  env: {
    KEY: process.env.KEY,
    BUCKET_URL: process.env.BUCKET_URL,
    REST_API_KEY: process.env.REST_API_KEY,
    CLIENT_SECRET: process.env.CLIENT_SECRET,
    FIREBASE_API_KEY: process.env.FIREBASE_API_KEY,
    FIREBASE_AUTH_DOMAIN: process.env.FIREBASE_AUTH_DOMAIN,
    FIREBASE_PROJECT_ID: process.env.FIREBASE_PROJECT_ID,
    FIREBASE_STORAGE_BUCKET: process.env.FIREBASE_STORAGE_BUCKET,
    FIREBASE_MESSAGING_SENDER_ID: process.env.FIREBASE_MESSAGING_SENDER_ID,
    FIREBASE_APP_ID: process.env.FIREBASE_APP_ID,
    FIREBASE_MEASUREMENT_ID: process.env.FIREBASE_MEASUREMENT_ID,
    KAKAO_REDIRECT_URI: process.env.KAKAO_REDIRECT_URI,
    KAKAO_REDIRECT_URI_PRODUCTION: process.env.KAKAO_REDIRECT_URI_PRODUCTION,
  },

  eslint: {
    ignoreDuringBuilds: true,
  },

  async rewrites() {
    return [
      {
        source: "/guam-immigration/:path*",
        destination: process.env.IMMIGRATION_SERVER,
      },
      {
        source: "/api/:path*",
        destination: process.env.DESTINATION_URL,
      },
      {
        source: "/relyingparty/:path*",
        destination: `${process.env.GOOGLE_API}?key=${process.env.KEY}`,
      },
      {
        source: "/oauth/authorize/kakao",
        destination: `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.REST_API_KEY}&redirect_uri=${process.env.KAKAO_REDIRECT_URI}&response_type=code`,
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
