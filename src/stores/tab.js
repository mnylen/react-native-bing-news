const {createStore} = require('ffux')

module.exports = createStore({
  actions: ["switchTab"],

  state(initialTab, { switchTab }, { bookmarks }) {
    const switchOnBookmarkSelect =
      bookmarks
        .changes()
        .map('.selected')
        .skipDuplicates()
        .map(_ => 'bookmarks')

    return switchTab.merge(switchOnBookmarkSelect).toProperty(initialTab)
  }
})
