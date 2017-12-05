import { StackNavigator } from 'react-navigation'
import LoginScreen from '../Containers/LoginScreen'
import LaunchScreen from '../Containers/LaunchScreen'
import HomeScreen from '../Containers/HomeScreen'
import SignUpScreen from '../Containers/SignUpScreen'
import styles from './Styles/NavigationStyles'

// Manifest of possible screens
const PrimaryNav = StackNavigator({
  LoginScreen: { screen: LoginScreen },
  LaunchScreen: { screen: LaunchScreen },
  HomeScreen: { screen: HomeScreen },
  SignUpScreen: { screen: SignUpScreen }
}, {
    // Default config for all screens
    headerMode: 'none',
    initialRouteName: 'LaunchScreen',
    navigationOptions: {
      headerStyle: styles.header
    }
  })

export default PrimaryNav
