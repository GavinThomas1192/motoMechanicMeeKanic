import React, { Component } from 'react'
import axios from 'axios'
import { ScrollView, Text, KeyboardAvoidingView, View, TextInput, StatusBar, Image } from 'react-native'
import { connect } from 'react-redux'
import { Container, Header, Content, Form, Item, Input, Left, Body, Right, Button, Icon, Title, Toast } from 'native-base';
import Spinner from '../Components/Spinner'
import VehicleYearPicker from '../Components/vehicleYearPicker'
import VehicleMakePicker from '../Components/vehicleMakePicker'
import VehicleModelPicker from '../Components/vehicleModelPicker'
import VehicleTrimPicker from '../Components/vehicleTrimPicker'
import firebase from 'firebase'
import { userVehicleCreateRequest } from '../Actions/vehicle-actions';
import { Images } from '../Themes'





import styles from './Styles/VehicleCreateScreenStyle'

class VehicleCreateScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            vehicleYear: '', vehicleMake: '', vehicleModel: '', vehicleTrim: '',
        }
        this.yearPicked = this.yearPicked.bind(this);
        this.makePicked = this.makePicked.bind(this);
        this.modelPicked = this.modelPicked.bind(this);
        this.trimPicked = this.trimPicked.bind(this);
        this.submitVehicleInformation = this.submitVehicleInformation.bind(this);
    }

    componentDidUpdate() {
        console.log('VehicleCreateScreen did update', this.state)
    }
    componentDidMount() {
        console.log('vehicleCreateScreen', this.state)
    }

    // Updates this containers/screens state from the static component user input
    // We allow the user to quickly click a stat on their vehicle to edit in case they mispressed. 
    // So we need to reset all choices after, just in case. 
    yearPicked(year) {
        this.setState({ vehicleYear: year, vehicleMake: '', vehicleModel: '', vehicleTrim: '', }, function () {
            console.log(this.state, 'Updated year')
        });

    }

    // Updates this containers/screens state from the static component user input
    // We allow the user to quickly click a stat on their vehicle to edit in case they mispressed. 
    // So we need to reset all choices after, just in case. 
    makePicked(make) {
        this.setState({ vehicleMake: make, vehicleModel: '', vehicleTrim: '', }, function () {
            console.log(this.state, 'Updated Make')
        });
    }

    // Updates this containers/screens state from the static component user input
    // We allow the user to quickly click a stat on their vehicle to edit in case they mispressed. 
    // So we need to reset all choices after, just in case. 
    modelPicked(model) {
        this.setState({ vehicleModel: model, vehicleTrim: '' }, function () {
            console.log(this.state, 'Updated Model')
        });
    }

    // Updates this containers/screens state from the static component user input
    // We allow the user to quickly click a stat on their vehicle to edit in case they mispressed. 
    // So we need to reset all choices after, just in case. 
    trimPicked(trim) {
        this.setState({ vehicleTrim: trim }, function () {
            console.log(this.state, 'Updated Trim')
        });
    }

    submitVehicleInformation() {
        let finalChoice;


        //Here we fetch one last call with the selected trim.id to get an exact model. 
        fetch(`https://www.carqueryapi.com/api/0.3/?callback=?&cmd=getModel&model=` + `${this.state.vehicleTrim.id}` + `&sold_in_us=1`)
            .then((response) => {
                console.log(response)
                finalChoice = JSON.parse(response._bodyText.slice(2, (response._bodyText.length - 2)))
                console.log(finalChoice, 'FINAL CHOICCCEEEE')
            })
            .catch(err => console.log(err))




        Toast.show({
            text: 'We stored your ' + this.state.vehicleYear + ' ' + this.state.vehicleModel + '! You can edit this later.',
            position: 'bottom',
            buttonText: 'Sounds Good',
            duration: 3000,
        })

        this.props.userVehicleCreateRequest(finalChoice)
        //store vehicle to firebase through actions..
    }

    handleChange(text) {
        console.log(text)
    }

    renderButton() {
        if (this.state.loading) {
            return <Spinner size="small" />;
        }

        return (
            <Button style={{ backgroundColor: '#757575', margin: 5 }} block onPress={this.onButtonPress.bind(this)}>
                <Text>Log In</Text>
            </Button>
        );
    }
    render() {
        // Here we dynamically render each option for vehicle values after they have chosen
        // So first is YEAR > then we hide year and show MAKE > then we hide make and show MODEL, etc
        // All based on component did mount's API calls from the respective component
        return (
            <View>
                <ScrollView>
                    <Header style={{ shadowOpacity: 0, backgroundColor: 'transparent' }} >
                        <Left>
                            <Button transparent onPress={() => this.props.navigation.navigate('HomeScreen')}>
                                <Icon name='arrow-back' />
                            </Button>
                        </Left>
                        <Body>
                            <Title><Text></Text></Title>
                        </Body>
                    </Header>
                    <Container style={styles.Container}>

                        <Content>
                            <Text>Vehicle Stats:</Text>
                            <Text onPress={() => this.yearPicked('')} >Year: {this.state.vehicleYear}</Text>
                            <Text onPress={() => this.makePicked('')}>Make: {this.state.vehicleMake}</Text>
                            <Text onPress={() => this.modelPicked('')}>Model: {this.state.vehicleModel}</Text>
                            <Text onPress={() => this.trimPicked('')}>Trim: {this.state.vehicleTrim.name}</Text>


                            {/* These next conditionals dynamically show based on completion of full vehicle information  */}
                            {this.state.vehicleYear === '' ? <VehicleYearPicker vehicleYear={this.yearPicked} /> : undefined}

                            {this.state.vehicleYear !== '' && this.state.vehicleMake === '' ? <VehicleMakePicker pickedYear={this.state.vehicleYear} vehicleMake={this.makePicked} /> : undefined}

                            {this.state.vehicleModel === '' && this.state.vehicleMake !== '' ? <VehicleModelPicker homeState={this.state} vehicleModel={this.modelPicked} /> : undefined}

                            {this.state.vehicleModel !== '' && this.state.vehicleMake !== '' && this.state.vehicleTrim === '' ? <VehicleTrimPicker homeState={this.state} vehicleTrim={this.trimPicked} /> : undefined}

                            {this.state.vehicleMake !== '' && this.state.vehicleYear !== '' && this.state.vehicleModel !== '' && this.state.vehicleTrim !== '' ? <Button block onPress={this.submitVehicleInformation}>
                                <Text>Store Vehicle</Text>
                            </Button> : undefined}









                        </Content>
                    </Container>
                </ScrollView>
            </View >

        )
    }
}
//To get single car.
// https://www.carqueryapi.com/api/0.3/?callback=?&cmd=getTrims&year=2005&model=4runner&drive=4wd&keyword=sport&max_cylinders=6
const mapStateToProps = (state) => {
    return {
        user: state.user,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        userVehicleCreateRequest: (vehicle) => dispatch(userVehicleCreateRequest(vehicle)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(VehicleCreateScreen)

