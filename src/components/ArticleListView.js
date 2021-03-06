const React        = require('react-native'),
      commonStyles = require('./commonStyles'),
       SafariView  = require('react-native-safari-view')


const {
  Text,
  View,
  StyleSheet,
  ListView,
  TouchableHighlight,
  Image,
  LinkingIOS
} = React

module.exports = React.createClass({
  _openArticle(article) {
    SafariView.isAvailable()
      .then(() => SafariView.show({ url: article.url, readerMode: true }))
      .catch(() => LinkingIOS.openURL(article.url))
  },

  _renderArticle(article) {
    const {title, image, description} = article

    const articleInfo = (
      <View style={styles.articleInfo}>
        <Text numberOfLines={4} style={styles.title}>{title}</Text>
      </View>
    )

    const extraStyle = image ? null : styles.articleNoImage
    const imageView  = image ? <Image source={{ uri: image }} style={styles.image} /> : null

    return (
      <TouchableHighlight underlayColor="#eee" onPress={() => this._openArticle(article)}>
        <View style={[commonStyles.container, styles.article, extraStyle]}>
          {articleInfo}
          {imageView}
        </View>
      </TouchableHighlight>
    )
  },

  render() {
    const {articles, style} = this.props
    var ds = (new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })).cloneWithRows(articles)

    return (
      <ListView
        style={[commonStyles.container, style]}
        pageSize={20}
        initialListSize={20}
        dataSource={ds}
        renderRow={this._renderArticle}
        automaticallyAdjustContentInsets={false}
      />
    )
  }
})

var styles = StyleSheet.create({
  article: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd'
  },
  articleNoImage: {
    paddingTop: 20,
    paddingBottom: 20
  },
  articleInfo: {
    flex: 1,
    paddingLeft: 20,
    paddingRight: 20
  },
  image: {
    width: 120,
    height: 120
  },
  title: {
    fontSize: 18
  }
})
