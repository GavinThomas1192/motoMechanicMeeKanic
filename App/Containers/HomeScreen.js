import React, { Component } from 'react'
import { ScrollView, Text, KeyboardAvoidingView, View, TextInput, StatusBar, Image } from 'react-native'
import { connect } from 'react-redux'
import { Container, Header, Content, Item, Left, Body, Right, Button, Icon, Title, Drawer } from 'native-base';
import Spinner from '../Components/Spinner'
import firebase from 'firebase'
import SideBar from '../Components/SideBar';
import { Dropdown } from 'react-native-material-dropdown';
import Menu, { MenuItem, MenuDivider } from 'react-native-material-menu';



import styles from './Styles/HomeScreenStyle'

class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.openDrawer = this.openDrawer.bind(this);
    // this.openDropDown = this.openDropDown.bind(this);
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

  setMenuRef = ref => {
    this.menu = ref;
  };

  menu = null;

  hideMenu = () => {
    this.menu.hide();
  };

  showMenu = () => {
    this.menu.show();
  };

  // openDropDown = () => {
  //   return (
  //     <Dropdown
  //       label='Favorite Fruit'
  //       data={data}
  //     />
  //   );
  // }

  //TODO: Make settings button have its own drawer that can log user out.
  onLogoutPress() {
    firebase.auth().signOut().then(function () {
      console.log('Signed User out')
    }).catch(function (error) {
      console.log('Something went wrong');
    });
  }

  render() {

    return (
      <Drawer
        ref={(ref) => { this.drawer = ref; }}
        content={<SideBar navigation={this.props.navigation} close={this.closeDrawer} />}
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
            <Button transparent onPress={this.showMenu}>
              <Icon name='settings' />
            </Button>
            <Menu
              ref={this.setMenuRef}
              style={{ alignSelf: 'flex-end' }}
            >
              <MenuItem onPress={this.hideMenu}>Test 1</MenuItem>
              <MenuItem onPress={this.hideMenu}>Test 2</MenuItem>
              <MenuItem onPress={this.hideMenu} disabled>
                Test 3
              </MenuItem>
              <MenuDivider />
              <MenuItem onPress={this.hideMenu}>Test 4</MenuItem>
            </Menu>
          </Right>
        </Header>
      </Drawer>


    )
  }
}
{/* <Dropdown
  label='Favorite Fruit'
  data={data}
/> */}

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
