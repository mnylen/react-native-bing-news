const ffux      = require('ffux'),
      Tab       = require('./tab'),
      Search    = require('./search'),
      Bookmarks = require('./bookmarksData')

module.exports = (storedBookmarks) => {
  const homeData      = Search(''),
        searchData    = Search(''),
        bookmarksData = Bookmarks(storedBookmarks)

  return ffux({
    tab: Tab('home', { bookmarks: bookmarksData }),
    home: homeData,
    bookmarks: bookmarksData,
    search: searchData
  })
}
