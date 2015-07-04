const ffux      = require('ffux'),
      Tab       = require('./tab'),
      Search    = require('./search'),
      Bookmarks = require('./bookmarksData')

module.exports = () => {
  const homeData      = Search(''),
        searchData    = Search(''),
        bookmarksData = Bookmarks(["fallout 4", "deus ex mankind divided", "ukraine war"])

  return ffux({
    tab: Tab('search', { bookmarks: bookmarksData }),
    home: homeData,
    bookmarks: bookmarksData,
    search: searchData
  })
}
