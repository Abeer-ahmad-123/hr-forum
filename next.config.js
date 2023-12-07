/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'miro.medium.com',
      },
      {
        protocol: 'https',
        hostname: 'avatar.iran.liara.run',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'demos.creative-tim.com',
      },
      {
        protocol: 'https',
        hostname: 'img.freepik.com',
      },
    ],
  },
}

module.exports = nextConfig
