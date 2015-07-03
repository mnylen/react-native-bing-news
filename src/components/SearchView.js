const React        = require('react-native'),
      NavigationBar = require('./NavigationBar'),
      commonStyles  = require('./commonStyles')

const {
  Text,
  View
} = React

module.exports = React.createClass({
  render() {
    return (
      <View style={commonStyles.container}>
        <NavigationBar content={<NavigationBar.TitleText title="Search" />} />
      </View>
    )
  }
})
