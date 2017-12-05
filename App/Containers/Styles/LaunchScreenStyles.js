import { StyleSheet } from 'react-native'
import { Metrics, ApplicationStyles } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  container: {
    paddingBottom: Metrics.baseMargin
  },
  logo: {
    marginTop: -60,
    width: 400,
    height: 400,
    position: 'absolute',
    resizeMode: 'contain',
  },

  logoText: {
    fontSize: 60,
    color: 'black',
    marginTop: 10,
    fontWeight: "bold",
    textAlign: 'center',
  },

  centered: {
    fontWeight: "bold",
    textAlign: 'center',
    color: 'black',
    fontSize: 15,
    marginTop: 5,
  },



  catchPhrase: {
    textAlign: 'center',
    marginTop: 200,
    marginBottom: 160,
    color: 'black',
    fontWeight: 'bold',
    fontSize: 30,
  },
  textInput: {
    backgroundColor: 'rgba(255, 255, 255, .75)',
  }

})
