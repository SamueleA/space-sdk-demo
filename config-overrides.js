const {alias} = require('react-app-rewire-alias')

module.exports = function override(config) {
  alias({
    '@shared': 'src/shared',
    '@config': 'src/config',
    '@clients': 'src/clients',
    '@utils': 'src/shared/utils',
    '@assets': 'src/assets',
  })(config)

  return config
}