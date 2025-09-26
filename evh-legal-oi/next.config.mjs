/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  experimental: {
    serverComponentsExternalPackages: ['@microsoft/mgt-react'],
  },
  // Ensure trailing slash consistency
  trailingSlash: false,
  // Enable standalone output for Docker
  output: 'standalone',
}

export default nextConfig
