const {createStore} = require('ffux'),
      Bacon         = require('baconjs'),
      bing          = require('../lib/bing')

module.exports = createStore({
  actions: ["search"],

  state(initialQuery, {search}) {
    const query   = search.toProperty(initialQuery).map('.trim').skipDuplicates()
    const results = query.debounce(200).flatMapLatest(bing.search)
    const await   = query.awaiting(results)

    return Bacon.combineTemplate({ query, results, awaitingResults: await })
  }
})
