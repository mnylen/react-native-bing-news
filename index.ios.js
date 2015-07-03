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
  View
} = React;

var BingNews = React.createClass({
  getInitialState() {
    return { model: null };
  },

  componentDidMount() {
    var dispatcher = appState()
    dispatcher.listen((model) => this.setState({ model }))
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
