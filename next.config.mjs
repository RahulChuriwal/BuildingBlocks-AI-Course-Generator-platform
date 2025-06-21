/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['firebasestorage.googleapis.com', 'images.unsplash.com'],
  },
  experimental: {
    serverActions: true,
    requestAsyncStorage: true, // ✅ required for Clerk auth() in API routes
  },
};

export default nextConfig;
