const React           = require('react-native'),
      NavigationBar   = require('./NavigationBar'),
      commonStyles    = require('./commonStyles'),
      Icon            = require('react-native-icons').FAKIconImage,
      ArticleListView = require('./ArticleListView')

const {
  TextInput,
  View,
  TouchableOpacity,
  StyleSheet
} = React

const SearchBar = React.createClass({
  getInitialState() {
    return { editing: true }
  },

  _startEditing() {
    this.refs.textInput.focus()
    this.setState({ editing: true })
  },

  _endEditing() {
    this.refs.textInput.blur()
    this.setState({ editing: false })
  },

  render() {
    const bookmarkButton = !this.state.editing ?
      (<View style={styles.bookmarkButton}>
        <TouchableOpacity opacity={0.5} onPress={() => this.props.actions.bookmark(this.props.input) }>
          <Icon
            name='ion|pin'
            size={26}
            color='#444'
            style={[commonStyles.icon, commonStyles.rotate45]} />
        </TouchableOpacity>
      </View>) : null

    return (
      <View style={[styles.searchBar, this.props.style]}>
        <TextInput
          ref="textInput"
          style={styles.input}
          placeholder="Type 2 characters or more to search"
          placeholderTextColor="#ddd"
          autoFocus={this.state.editing}
          selectTextOnFocus={true}
          onFocus={this._startEditing}
          onBlur={this._endEditing}
          returnKeyType="search"
          onChangeText={this.props.actions.setQuery} />
        {bookmarkButton}
      </View>
    )
  }
})

module.exports = React.createClass({
  render() {
    const {results, query} = this.props.state.search
    const setQuery         = this.props.actions.search.search
    const bookmark         = this.props.actions.bookmarks.addBookmark

    return (
      <View style={commonStyles.container}>
        <NavigationBar content={<NavigationBar.TitleText title="Search" />} />
        <SearchBar input={query} style={commonStyles.belowNavBar} actions={{ bookmark, setQuery }} />
        <ArticleListView articles={results} />
      </View>
    )
  }
})

const styles = StyleSheet.create({
  searchBar: {
    flexDirection: 'row',
    marginTop: 55,
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#ddd'
  },
  input: {
    flex: 1,
    height: 40,
    paddingLeft: 15,
    paddingRight: 15,
    backgroundColor: '#fff',
    borderColor: '#eee',
    borderWidth: 1,
    color: '#000',
    fontSize: 16
  },
})
