import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    domains: ['images.unsplash.com'],
  },
  pageExtensions: ['ts', 'tsx', 'md', 'mdx'], // keep this if you ever load MDX directly
};

export default nextConfig;
