/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  // basePath と assetPrefix の設定を修正
  basePath: '',
  assetPrefix: '',
  distDir: 'out',
}

module.exports = nextConfig