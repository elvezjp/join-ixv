/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  basePath: process.env.NODE_ENV === 'production' ? '/join-ixv' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/join-ixv' : '',
  distDir: 'out'
}

module.exports = nextConfig