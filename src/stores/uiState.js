const {createStore} = require('ffux'),
      Bacon         = require('baconjs')

module.exports = createStore({
  actions: ["selectTab"],

  state(_, {selectTab, selectBookmark}) {
    const initialState = {
      activeTab: 'home'
    }

    return Bacon.update(initialState,
      [selectTab],      (state, nextTab)  => ({...state, activeTab: nextTab })
    )
  }
})
