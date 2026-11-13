/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        // Legacy static docs (formerly public/mathe-app-docs) moved to docs.schlau.app.
        source: '/mathe-app-docs/:path*',
        destination: 'https://docs.schlau.app/',
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
