/** @type {import('next').NextConfig} */
const KEY = process.env.KEY;

const nextConfig = {
  reactStrictMode: true,
  env: {
    KEY: KEY,
  },
};

module.exports = nextConfig;
