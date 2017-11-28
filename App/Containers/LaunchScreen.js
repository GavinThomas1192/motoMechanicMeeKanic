import React, { Component } from 'react'
import { ScrollView, Text, Image, View } from 'react-native'
import { Images } from '../Themes'
import FullButton from '../Components/FullButton'
import RootContainer from './RootContainer'
import App from './Styles/App'

// Styles
import styles from './Styles/LaunchScreenStyles'

export default class LaunchScreen extends Component {
  render() {
    const { navigate } = this.props.navigation
    return (
      <View style={styles.mainContainer}>
        <Image source={Images.background} style={styles.backgroundImage} resizeMode='stretch' />
        <ScrollView style={styles.container}>
          <View style={styles.centered}>
            <Image source={Images.launch} style={styles.logo} />
          </View>

          <View style={styles.section} >
            <Image source={Images.ready} />
            <Text style={styles.sectionText}>
              Hi Shaun Hi Isaac!
            </Text>
            <FullButton text={'Hello World'} onPress={() => navigate('LoginScreen')} />
          </View>

        </ScrollView>
      </View>
    )
  }
}
