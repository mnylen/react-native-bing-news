const React        = require('react-native'),
      NavigationBar = require('./NavigationBar'),
      commonStyles  = require('./commonStyles'),
      ArticleListView = require('./ArticleListView')

const {
  Text,
  View
} = React

module.exports = React.createClass({
  render() {
    const {results} = this.props.state.homeSearch

    return (
      <View style={commonStyles.container}>
        <NavigationBar content={<NavigationBar.TitleText title="Home" />} />
        <ArticleListView style={commonStyles.belowNavBar} articles={results} />
      </View>
    )
  }
})
