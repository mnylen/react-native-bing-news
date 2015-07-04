const React        = require('react-native'),
      commonStyles = require('./commonStyles')

const {
  TouchableHighlight,
  Text,
  View,
  ListView,
  StyleSheet
} = React

module.exports = React.createClass({
  _renderBookmark(bookmark) {
    const rowStyle = this.props.bookmarks.indexOf(bookmark) % 2 === 0 ? null : styles.oddListItem

    return (
      <TouchableHighlight underlayColor="#eee" onPress={() => this.props.selectBookmark(bookmark)}>
        <View style={[styles.listItem, rowStyle]}>
          <Text style={styles.listItemText}>{bookmark}</Text>
        </View>
      </TouchableHighlight>
    )
  },

  render() {
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
    return (
      <ListView
        style={[commonStyles.container, this.props.style]}
        renderRow={this._renderBookmark}
        dataSource={ds.cloneWithRows(this.props.bookmarks)}
        automaticallyAdjustContentInsets={false}
      />
    )
  }
})

const styles = StyleSheet.create({
  listItem: {
    padding: 18,
    borderBottomWidth: 1,
    borderColor: '#ddd'
  },
  oddListItem: {
    backgroundColor: '#fafafa'
  },
  listItemText: {
    fontSize: 18
  }
})
