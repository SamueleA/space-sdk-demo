const {alias} = require('react-app-rewire-alias')

module.exports = function override(config) {
  alias({
    '@shared': 'src/shared',
    '@config': 'src/config',
  })(config)

  return config
}