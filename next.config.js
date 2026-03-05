// For GitHub Pages deployment, we need to set the basePath to the repository name
// This can be set via environment variable or defaults to /helper for this project
const isProduction = process.env.NODE_ENV === 'production';
const basePath = isProduction ? '/helper' : '';


/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  basePath: basePath,
  assetPrefix: basePath,
}

module.exports = nextConfig
