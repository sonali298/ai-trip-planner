/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.pexels.com', // Yeh pehle se tha
      },
      {
        protocol: 'https',
        hostname: 'videos.pexels.com', // Yeh bhi pehle se tha
      },
      {
        protocol: 'https',
        hostname: 'images.weserv.nl', // Bas yeh nayi line add karni hai
      },
    ],
  },
};

export default nextConfig;