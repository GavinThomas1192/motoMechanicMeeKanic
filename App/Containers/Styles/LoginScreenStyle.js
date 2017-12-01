import { StyleSheet } from 'react-native'
import { ApplicationStyles, Metrics } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,

  container: {
    paddingBottom: Metrics.baseMargin,
    backgroundColor: 'black',
  },
  logo: {
    marginTop: Metrics.doubleSection,
    height: Metrics.images.logo,
    width: Metrics.images.logo,
    resizeMode: 'contain'
  },
  centered: {
    alignItems: 'center'
  },
  catchPhrase: {
    marginTop: 40,
    color: 'white',
    fontWeight: 'bold',
    fontSize: 30,
  },
  textInput: {
    backgroundColor: 'rgba(255, 255, 255, .75)',
  }
})
