const ffux   = require('ffux'),
      Tab    = require('./tab'),
      Search = require('./search')

module.exports = () => {
  const homeSearch = Search('')

  return ffux({
    tab: Tab('home'),
    homeSearch: homeSearch
  }, { flatActions: true })
}
