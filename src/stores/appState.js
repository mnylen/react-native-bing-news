const ffux   = require('ffux'),
      Tab    = require('./tab')

module.exports = () => {
  return ffux({ tab: Tab('home') }, { flatActions: true })
}
