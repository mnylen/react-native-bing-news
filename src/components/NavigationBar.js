const React = require('react-native')

const {
  View,
  Text,
  StyleSheet
} = require('react-native')

const TitleText = React.createClass({
  render() {
    return <Text style={styles.navBarText}>{this.props.title}</Text>
  }
})

module.exports = React.createClass({
  statics: { TitleText },

  render() {
    return (
      <View style={styles.navBar}>
        <View style={styles.navBarContent}>
          {this.props.content}
        </View>
      </View>
    )
  }
})

const styles = StyleSheet.create({
  navBar: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 55,
    paddingTop: 24,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderColor: '#ddd',
    flex: 1,
  },
  navBarText: {
    color: '#000',
    fontSize: 16,
    flex: 1,
    textAlign: 'center'
  },
  navBarContent: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    paddingTop: 24
  }
})
