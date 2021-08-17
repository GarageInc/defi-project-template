const withPWA = require('next-pwa')
const runtimeCaching = require('next-pwa/cache')

const linguiConfig = require('./lingui.config.js')

const { locales, sourceLocale } = linguiConfig

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

module.exports = withBundleAnalyzer(
  withPWA({
    webpack: (config) => {
      config.module.rules = [
        ...config.module.rules,
        {
          resourceQuery: /raw-lingui/,
          type: 'javascript/auto',
        },
      ]

      return config
    },
    experimental: { esmExternals: true },
    pwa: {
      dest: 'public',
      runtimeCaching,
      disable: process.env.NODE_ENV === 'development',
    },
    images: {
      domains: ['res.cloudinary.com', 'raw.githubusercontent.com', 'logos.covalenthq.com'],
    },
    reactStrictMode: true,
    async redirects() {
      return [

      ]
    },
    async rewrites() {
      return [

      ]
    },
    i18n: {
      localeDetection: true,
      locales,
      defaultLocale: sourceLocale,
    },
  })
)

// Don't delete this console log, useful to see the config in Vercel deployments
console.log('next.config.js', JSON.stringify(module.exports, null, 2))
