/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true, 
  images: {
    domains: ['localhost'], 
  },
  experimental: {
    appDir: true, 
  },
};

export default nextConfig;
