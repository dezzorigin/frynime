import type { NextConfig } from 'next';

// Static export: the whole app is client-side (the browser fetches the
// Jikan API directly, see lib/api.ts). There is no server at deploy time,
// so dynamic [slug] routes were replaced by query params (?id=, ?e=, ?g=)
// and images are served unoptimized — next/image optimization needs a
// server, which Cloudflare Pages static hosting does not provide.
const nextConfig: NextConfig = {
  reactStrictMode: true,
  output: 'export',
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: false,
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.myanimelist.net',
      },
      {
        protocol: 'https',
        hostname: '**',
      },
      {
        protocol: 'http',
        hostname: '**',
      },
    ],
  },
};

export default nextConfig;
