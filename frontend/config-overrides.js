const { override, addWebpackAlias } = require('customize-cra')
const path = require('path')

module.exports = override(
  addWebpackAlias({
    '@src': path.resolve(__dirname, 'src'),
    '@i18n': path.resolve(__dirname, 'src/app/i18n'),
    '@pages': path.resolve(__dirname, 'src/app/pages'),
    '@assets': path.resolve(__dirname, 'src/assets'),
    '@shared': path.resolve(__dirname, 'src/app/shared'),
    '@css': path.resolve(__dirname, 'src/assets/css'),
    '@js': path.resolve(__dirname, 'src/assets/js'),
    '@utils': path.resolve(__dirname, 'src/utils'),
    '@configs': path.resolve(__dirname, 'src/configs'),
    '@sass': path.resolve(__dirname, 'src/assets/sass'),
    '@svg': path.resolve(__dirname, 'src/assets/images/svg'),
    '@images': path.resolve(__dirname, 'src/assets/images'),
    '@layouts': path.resolve(__dirname, 'src/app/shared/layouts'),
    '@variables': path.resolve(__dirname, 'src/app/shared/variables'),
    '@components': path.resolve(__dirname, 'src/app/shared/components'),
    '@constants': path.resolve(__dirname, 'src/app/shared/constants'),
    '@contexts': path.resolve(__dirname, 'src/app/shared/contexts'),
    '@services': path.resolve(__dirname, 'src/app/shared/services')
  })
)