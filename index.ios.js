/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var MainView = require('./src/components/MainView')
var appState = require('./src/stores/appState')

var {
  AppRegistry,
  View,
  AsyncStorage
} = React;

var BingNews = React.createClass({
  getInitialState() {
    return { model: null };
  },

  _modelWillChange(newModel) {
    var {model: oldModel} = this.state
    if (oldModel) {
      var oldBookmarks = oldModel.state.bookmarks.bookmarks
      var newBookmarks = newModel.state.bookmarks.bookmarks

      if (oldBookmarks !== newBookmarks) {
        console.log("Storing updated bookmarks")
        AsyncStorage.setItem('bookmarks', JSON.stringify(newBookmarks))
      }
    }

    this.setState({ model: newModel })
  },

  componentDidMount() {
    AsyncStorage.getItem('bookmarks', (err, data) => {
      var bookmarks = []
      if (data) {
        bookmarks = JSON.parse(data) || []
      }

      var dispatcher = appState(bookmarks)
      dispatcher.listen(this._modelWillChange)
    })
  },

  render: function() {
    var {model} = this.state;
    if (model) {
      return <MainView {...model} />;
    } else {
      // should be only a moment
      return <View />;
    }
  }
});

AppRegistry.registerComponent('BingNews', () => BingNews);
