const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  mode: 'production',
  skipWaiting: true,
  include: ['production'],
  disable: process.env.NODE_ENV === 'development',
});

module.exports = withPWA({
  reactStrictMode: true,
});
