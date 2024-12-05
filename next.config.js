/** @type {import('next').NextConfig} */
const nextConfig = {
  // Add any specific API route configurations if needed
  async headers() {
    return [
      {
        source: '/api/zoho',
        headers: [
          { key: 'Access-Control-Allow-Methods', value: 'POST' },
        ],
      },
    ];
  },
};

module.exports = nextConfig;