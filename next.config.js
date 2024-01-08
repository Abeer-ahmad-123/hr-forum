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
      {
        protocol: 'https',
        hostname: 'i.pinimg.com',
      },
      {
        protocol: 'https',
        hostname: 'image.winudf.com',
      },
      {
        protocol: 'https',
        hostname: 'source.unsplash.com',
      },
      { protocol: 'https', hostname: 'h-forum.s3.us-east-2.amazonaws.com' },
      {
        protocol: 'https',
        hostname: 't4.ftcdn.net',
      },
    ],
  },
}

module.exports = nextConfig
