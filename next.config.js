// Use the SentryWebpack plugin to upload the source maps during build step
const SentryWebpackPlugin = require('@sentry/webpack-plugin')

const withImages = require('next-images')
module.exports = withImages()

const { i18n } = require('./next-i18next.config')

const {
  PHASE_DEVELOPMENT_SERVER,
  PHASE_PRODUCTION_SERVER,
  PHASE_PRODUCTION_BUILD,
} = require('next/constants')

module.exports = phase => {
  // This uses phases as outlined here: https://nextjs.org/docs/#custom-configuration
  // when started in development mode `next dev` or `npm run dev` regardless of the value of STAGING environmental variable
  const isDev = phase === PHASE_DEVELOPMENT_SERVER
  const isProd =
    (phase === PHASE_PRODUCTION_BUILD || phase === PHASE_PRODUCTION_SERVER) &&
    process.env.STAGING !== 'true'
  const isStaging =
    (phase === PHASE_PRODUCTION_BUILD || phase === PHASE_PRODUCTION_SERVER) &&
    process.env.STAGING === 'true'

  const env = {
    API_URL: (() => {
      if (isDev) return 'http://localhost:1337'
      if (isStaging) return 'https://stg-api.waytoogood.com'
      if (isProd) return 'https://portal.waytoogood.com'
      return 'API_URL:not (isDev,isProd && !isStaging,isProd && isStaging)'
    })(),
    APP_URL: (() => {
      if (isDev) return 'http://localhost:3000'
      if (isStaging) return 'https://stg.waytoogood.com'
      if (isProd) return 'https://waytoogood.com'
      return 'APP_URL:not (isDev,isProd && !isStaging,isProd && isStaging)'
    })(),
    STRIPE_KEY: process.env.STRIPE_KEY,
    SENTRY_DSN: process.env.SENTRY_DSN,
  }
  console.info(
    '----------------------------------------------' +
      `\n` +
      `Phase: ${phase}` +
      `\n` +
      `isDev: ${isDev},  isProd: ${isProd},  isStaging: ${isStaging}` +
      `\n` +
      'API_URL= ' +
      env.API_URL +
      `\n` +
      '----------------------------------------------'
  )

  return {
    env,
    i18n: {
      locales: ['en', 'fr'],
      defaultLocale: 'en',
      localeDetection: false,
    },
    images: {
      domains: ['s3.ca-central-1.amazonaws.com'],
    },
    productionBrowserSourceMaps: true,
    webpack: (config, options) => {
      if (!options.isServer) {
        config.resolve.alias['@sentry/node'] = '@sentry/browser'
      }
      config.plugins.push(
        new options.webpack.DefinePlugin({
          'process.env.NEXT_IS_SERVER': JSON.stringify(options.isServer.toString()),
        })
      )

      if (!isDev) {
        config.plugins.push(
          new SentryWebpackPlugin({
            include: '.next',
            ignore: ['node_modules'],
            urlPrefix: '~/_next',
            release: 'waytoogood@1.0.1',
            org: 'way-too-good',
            project: 'waytoogood-frontend',
            authToken: process.env.SENTRY_AUTH_TOKEN,
          })
        )
      }

      return config
    },
  }
}
