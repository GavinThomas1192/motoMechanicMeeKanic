import React, { Component } from 'react'
import { ScrollView, Text, KeyboardAvoidingView, View, TextInput, StatusBar, Image } from 'react-native'
import { connect } from 'react-redux'
import { Container, Header, Content, Item, Left, Body, Right, Button, Icon, Title, Drawer, Footer, FooterTab, Card, CardItem } from 'native-base';
import Spinner from '../Components/Spinner'
import firebase from 'firebase'
import SideBar from '../Components/SideBar';
import { Dropdown } from 'react-native-material-dropdown';
import Menu, { MenuItem, MenuDivider } from 'react-native-material-menu';
import HomeOverview from '../Components/HomeOverview'

const backgroundImage = require("../Images/vw.jpg");





import styles from './Styles/HomeScreenStyle'

class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true, historyActive: false, NewEventActive: false, OverviewActive: false, headerTitle: 'My Overview', user: {}
    }
    this.openDrawer = this.openDrawer.bind(this);
  }

  componentDidUpdate() {
    const { navigate } = this.props.navigation
  }

  componentDidMount() {
    this.setState({ OverviewActive: true })
    // this.state.user.length === 0 ? this.state.loading === true : this.state.loading === false
  }
  componentWillReceiveProps(nextProps) {
    this.state.user.length === 0 ? this.setState({ user: nextProps.user, loading: true }) : undefined

  }



  closeDrawer = () => {
    this.drawer._root.close()
  };
  openDrawer = () => {
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


  // *************** These the the three bottons on the bottom nav.
  onHistoryPress() {
    this.setState({ historyActive: true, OverviewActive: false, NewEventActive: false, headerTitle: 'History' }, function () {
      // do something with new state
    });
    // this.setState = ({ historyActive: true })
  }

  onNewEventPress() {
    this.setState({ historyActive: false, OverviewActive: false, NewEventActive: true, headerTitle: 'New Entry' }, function () {
      // do something with new state
    });
  }

  onOverviewPress() {
    this.setState({ historyActive: false, OverviewActive: true, NewEventActive: false, headerTitle: 'My Overview' }, function () {
      // do something with new state
    });

  }

  onVehicleCreatePress(props) {
    props.navigate('VehicleCreateScreen')
    this.menu.hide();
  }

  onLogoutPress(props) {
    // ******** Sign user out of Firebase Auth ********
    firebase.auth().signOut().then(function () {
      console.log('Signed User out')
    }).catch(function (error) {
      console.log('Something went wrong');
    });
    // ******** Navigate to splash Login page ********
    props.navigate('LoginScreen')
    this.menu.hide();
  }
  render() {


    return (
      // ******** This is the left Drawer component ********
      // ******** For some reason it MUST wrap everything in this homescreen ********
      // ******** The HEADER holds some words and left/right icons to open drawer and Menu ********
      // ******** The Drawer will show garage, maintence logs, repair lookup info ********
      // ******** The menu will hold settings, profile, and logout ********
      <View style={{ flex: 1 }}>
        <Drawer
          ref={(ref) => { this.drawer = ref; }}
          content={<SideBar navigation={this.props.navigation} close={this.closeDrawer} />}
          onClose={() => this.closeDrawer()}
          onOpen={() => this.openDrawer()} >
          <Header>
            <Left>
              <Button transparent onPress={this.openDrawer}>
                <Icon name='menu' />
              </Button>
            </Left>
            <Body>
              <Title>{this.state.headerTitle}</Title>
            </Body>
            <Right>
              <Button transparent onPress={this.showMenu}>
                <Icon name='settings' />
              </Button>
              <Menu
                ref={this.setMenuRef}
                style={{ alignSelf: 'flex-end' }}
              >
                {<MenuItem onPress={() => this.onVehicleCreatePress(this.props.navigation)}>Add New Vehicle</MenuItem>}
                <MenuItem onPress={() => this.props.navigation.navigate('SettingsScreen')} >Settings</MenuItem>
                <MenuDivider />
                <MenuItem onPress={() => this.onLogoutPress(this.props.navigation)}>Logout</MenuItem>
              </Menu>
            </Right>
          </Header>

          {this.state.OverviewActive ? <HomeOverview navigation={this.props.navigation} props={this.props.user} /> : <Spinner />}

        </Drawer>
        <Footer>
          <FooterTab>
            <Button vertical onPress={() => this.onHistoryPress()} active={this.state.historyActive}>
              <Icon name="apps" />
              <Text>Maintence History</Text>
            </Button>
            <Button vertical onPress={() => this.onOverviewPress()} active={this.state.OverviewActive}>
              <Icon name="camera" />
              <Text>Overview</Text>
            </Button>
            <Button vertical onPress={() => this.onNewEventPress()} active={this.state.NewEventActive}>
              <Icon active name="navigate" />
              <Text>New Event</Text>
            </Button>
          </FooterTab>
        </Footer>
      </View>
    )
  }
}


const mapStateToProps = (state) => {
  if (state.user.account) {
    return {
      user: state.user
    }
  } else {
    return {}
  }

}

const mapDispatchToProps = (dispatch) => {
  return {
    loginRequest: (user) => dispatch(loginRequest(user)),

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)
//hello