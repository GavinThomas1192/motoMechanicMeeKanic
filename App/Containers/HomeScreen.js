import React, { Component } from 'react'
import { ScrollView, Text, KeyboardAvoidingView, View, TextInput, StatusBar, Image } from 'react-native'
import { connect } from 'react-redux'
import { Container, Header, Content, Item, Left, Body, Right, Button, Icon, Title, Drawer } from 'native-base';
import Spinner from '../Components/Spinner'
import firebase from 'firebase'
import SideBar from '../Components/SideBar';





import styles from './Styles/HomeScreenStyle'

class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.openDrawer = this.openDrawer.bind(this);
  }
  state = {
    loggedIn: false, email: '', password: '', error: '', loading: false
  }

  componentDidUpdate() {
    console.log('login screen did update', this.props)
  }

  closeDrawer = () => {
    this.drawer._root.close()
  };
  openDrawer = () => {
    console.log('openopen')
    this.drawer._root.open()
  };

  render() {
    return (
      <Drawer
        ref={(ref) => { this.drawer = ref; }}
        content={<SideBar />}
        onClose={() => this.closeDrawer()} >
        <Header>
          <Left>
            <Button transparent onPress={() => this.openDrawer()}>
              <Icon name='menu' />
            </Button>
          </Left>
          <Body>
            <Title>In Home</Title>
          </Body>
          <Right>
            <Button transparent onPress={() => this.closeDrawer()}>
              <Icon name='settings' />
            </Button>
          </Right>
        </Header>
      </Drawer>

    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    loginRequest: (user) => dispatch(loginRequest(user)),

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)
