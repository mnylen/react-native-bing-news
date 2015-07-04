const {createStore} = require('ffux'),
      bing          = require('../lib/bing'),
      Bacon         = require('baconjs')

const EMPTY_RESULTS = { query: null, results: [], awaitingResults: false }

module.exports = createStore({
  actions: ["addBookmark", "selectBookmark", "closeBookmark"],

  state(initialBookmarks, { addBookmark, selectBookmark, closeBookmark }) {
    const selectedChanges = addBookmark.merge(selectBookmark).merge(closeBookmark.map(() => null))
    const resultsChanges  = resultsForBookmark(selectedChanges).changes()

    const initialState = {
      selected: null,
      selectedResults: EMPTY_RESULTS,
      bookmarks: initialBookmarks
    }

    return Bacon.update(initialState,
      [addBookmark],    (state, bm) => ({...state, bookmarks: [...state.bookmarks, bm], selected: bm }),
      [selectBookmark], (state, bm) => ({...state, selected: bm, selectedResults: EMPTY_RESULTS }),
      [closeBookmark],  (state, _)  => ({...state, selected: null, selectedResults: EMPTY_RESULTS }),
      [resultsChanges], (state, rs) => {
        console.log("got rs:", rs)
        return {...state, selectedResults: rs }
      }
    )
  }
})

const resultsForBookmark = (query) => {
  const trimQ   = query.map('.trim').skipDuplicates()
  const results = trimQ.flatMapLatest(bing.search)

  return Bacon.update(EMPTY_RESULTS,
    [trimQ],   (state, q)  => ({...state, query: q, results: [], awaitingResults: true }),
    [results], (state, rs) => ({...state, results: rs, awaitingResults: false })
  )
}
