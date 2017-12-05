import { StyleSheet } from 'react-native'
import { Metrics, ApplicationStyles } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  container: {
    paddingBottom: Metrics.baseMargin
  },
  logo: {
    width: Metrics.images.logo,
    height: Metrics.images.logo,
    justifyContent: 'center',
    alignItems: 'center',
    resizeMode: 'contain',
  },

  logoText: {
    fontSize: 60,
    color: 'white',
    marginTop: Metrics.doubleSection,
    fontWeight: "bold",
    textAlign: 'center',
  },

  centered: {
    textAlign: 'center',
    color: 'white',
  },


  catchPhrase: {
    textAlign: 'center',

    marginTop: 40,
    color: 'white',
    fontWeight: 'bold',
    fontSize: 30,
  },
  textInput: {
    backgroundColor: 'rgba(255, 255, 255, .75)',
  }

})
