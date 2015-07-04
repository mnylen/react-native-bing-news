const {StyleSheet} = require('react-native')

module.exports = StyleSheet.create({
  container: {
    flex: 1
  },
  horizontalContainer: {
    flex: 1,
    flexDirection: 'row'
  },
  belowNavBar: {
    marginTop: 55
  },
  icon: {
    width: 24,
    height: 24
  },
  rotate45: {
    transform: [
      { rotate: '45 deg' }
    ]
  }
})
