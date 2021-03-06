const React             = require('react-native'),
      NavigationBar     = require('./NavigationBar'),
      commonStyles      = require('./commonStyles'),
      BookmarksListView = require('./BookmarksListView'),
      ArticleListView   = require('./ArticleListView'),
      Icon              = require('react-native-icons').FAKIconImage


const {
  Text,
  View,
  Navigator,
  TouchableOpacity,
  StyleSheet
} = React

module.exports = React.createClass({
  _renderScene(route) {
    if (route.bookmark) {
      return <ArticleListView style={commonStyles.belowNavBar} articles={this.props.state.bookmarks.selectedResults.results} />
    } else {
      return <BookmarksListView style={commonStyles.belowNavBar} bookmarks={this.props.state.bookmarks.bookmarks} selectBookmark={this.props.actions.bookmarks.selectBookmark} />
    }
  },

  _renderNavigationBar() {
    const {selected: selectedBookmark} = this.props.state.bookmarks

    var navigationBarContent
    if (selectedBookmark) {
      navigationBarContent = (
        <View style={[commonStyles.horizontalContainer]}>
          <View style={styles.navBarLeft}>
            <TouchableOpacity opacity={0.5} onPress={this.props.actions.bookmarks.closeBookmark}>
              <Icon
                name='ion|ios-arrow-back'
                size={26}
                color='#444'
                style={commonStyles.icon} />
            </TouchableOpacity>
          </View>

          <NavigationBar.TitleText title={selectedBookmark} />

          <View style={styles.navBarRight} />
        </View>
      )
    } else {
      navigationBarContent = <NavigationBar.TitleText title="Bookmarks" />
    }

    return <NavigationBar content={navigationBarContent} />
  },

  componentWillReceiveProps(newProps) {
    const {selected: selectedBookmark} = newProps.state.bookmarks
    const {selected: previouslySelectedBookmark} = this.props.state.bookmarks

    if (selectedBookmark && !previouslySelectedBookmark) {
      // user has selected a bookmark
      this.refs.navigator.push({ bookmark: selectedBookmark })
    } else if (previouslySelectedBookmark && !selectedBookmark) {
      // user has closed a bookmark
      this.refs.navigator.pop()
    }
  },

  componentDidMount() {
    const {selected: selectedBookmark} = this.props.state.bookmarks
    if (selectedBookmark) {
      this.refs.navigator.push({ bookmark: selectedBookmark })
    }
  },

  render() {
    return (
      <Navigator
        ref="navigator"
        style={commonStyles.container}
        navigationBar={this._renderNavigationBar()}
        initialRoute={{ title: 'Bookmarks' }}
        renderScene={this._renderScene}
      />
    )
  }
})

const styles = StyleSheet.create({
  navBarLeft: {
    marginLeft: 10,
    width: 24,
    alignItems: 'flex-start'
  },
  navBarRight: {
    width: 34,
    alignItems: 'flex-end'
  }
})
