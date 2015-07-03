const React         = require('react-native'),
      Icon          = require('react-native-icons').FAKIconImage,
      HomeView      = require('./HomeView'),
      BookmarksView = require('./BookmarksView'),
      SearchView    = require('./SearchView')

const {
  View,
  StyleSheet,
  TouchableOpacity
} = React

module.exports = React.createClass({
  _renderTabContent() {
      const {activeTab} = this.props.state.uiState

      switch (activeTab) {
        case 'home': return <HomeView {...this.props} />
        case 'search': return <SearchView {...this.props} />
        case 'bookmarks': return <BookmarksView {...this.props} />
      }
  },

  _selectTab(name) {
    this.props.actions.selectTab(name)
  },

  render() {
    const {activeTab} = this.props.state.uiState

    return (
      <View style={styles.container}>
        <View style={styles.tabContent}>
          {this._renderTabContent()}
        </View>

        <View style={styles.tabBar}>
          <TabBarIcon onPress={this._selectTab} name="home" icon="ion|home" selectedTabName={activeTab} />
          <TabBarIcon onPress={this._selectTab} name="bookmarks" icon="ion|pin" style={styles.rotate45} selectedTabName={activeTab} />
          <TabBarIcon onPress={this._selectTab} name="search" icon="ion|search" selectedTabName={activeTab} />
        </View>
      </View>
    )
  }
})

const TabBarIcon = React.createClass({
  render() {
    const {style, name, icon, selectedTabName, onPress} = this.props
    const active = selectedTabName === name
    const color = active ? '#444' : '#cecdcd'

    return (
      <View style={styles.tabBarIcon}>
        <TouchableOpacity onPress={() => onPress(name)}>
          <View style={{ alignItems: 'center' }}>
            <Icon
              style={[styles.icon, style]}
              name={icon}
              size={26}
              color={color} />
            { active ? <View style={styles.activeTabIndicator}></View> : null }
          </View>
        </TouchableOpacity>
      </View>
    )
  }
})

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  tabContent: {
    flex: 1
  },
  tabBar: {
    height: 40,
    flexDirection: 'row',
    backgroundColor: '#fff',
    alignItems: 'center',
    borderTopWidth: 1,
    borderColor: '#ddd'
  },
  tabBarIcon: {
    flex: 1,
    width: 24,
    height: 24,
    alignItems: 'center'
  },
  icon: {
    width: 24,
    height: 24
  },
  rotate45: {
    transform: [
      { rotate: '45 deg' }
    ]
  },
  activeTabIndicator: {
    marginTop: 3,
    width: 30,
    height: 2,
    backgroundColor: '#2074dd'
  }
})
