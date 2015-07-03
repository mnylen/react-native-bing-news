const {createStore} = require('ffux')

module.exports = createStore({
  actions: ["switchTab"],

  state(tab, {switchTab}) {
    return switchTab.toProperty(tab)
  }
})
