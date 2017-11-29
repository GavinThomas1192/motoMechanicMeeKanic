import React, { Component } from 'react'
import { ScrollView, Text, KeyboardAvoidingView } from 'react-native'
import { connect } from 'react-redux'
import LoginForm from '../Components/LoginForm'
import { Header} from '../Components/Header';
import { Spinner } from '../Components/Spinner';
import { FullButton} from '../Components/FullButton';
import { Card} from '../Components/Card';
import { CardSection } from '../Components/CardSection';
import { Input } from '../Components/Input';






// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/LoginScreenStyle'

class LoginScreen extends Component {
  state = {
    loggedIn: false
  }
  renderContent() {
    switch (this.state.loggedIn) {
      case true:
        return (
          <FullButton onPress={() => firebase.auth().signOut()}>
            Log Out
          </FullButton>
        );
      case false:
        return <LoginForm />;
      default:
        return <Spinner size="large" />;
    }
  }
  render() {
    return (
      <ScrollView style={styles.container}>
        <KeyboardAvoidingView behavior='position'>
          <Text>Hello from the login Screen!</Text>
        </KeyboardAvoidingView>
      </ScrollView>
    )
  }
}

const mapStateToProps = (state) => {
  return {
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen)
