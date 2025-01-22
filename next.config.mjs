/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.module.rules.push({
      test: /\.(frag|vert|glsl)$/,
      type: 'asset/source',
    });
    return config;
  },
  images: {
    domains: ['images.prismic.io'],
    // If you need more control over image optimization:
    // remotePatterns: [
    //   {
    //     protocol: 'https',
    //     hostname: 'images.prismic.io',
    //     pathname: '/konomi/**',
    //   },
    // ],
  },
};

export default nextConfig;
