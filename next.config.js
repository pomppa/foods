const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  mode: 'production',
  skipWaiting: true,
  include: ['production'],
});

module.exports = withPWA({
  reactStrictMode: true,
});
