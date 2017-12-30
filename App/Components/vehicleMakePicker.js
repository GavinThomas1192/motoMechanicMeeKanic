import React, { Component } from "react";
import { Platform, ScrollView, View, Picker } from "react-native";
import Spinner from '../Components/Spinner'
import { Button, Text } from "native-base";
// const Item = Picker.Item;
import SmartPicker from 'react-native-smart-picker'
import axios from 'axios'

export default class VehicleMakePicker extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedMake: '',
            selectedMakeId: '',
            makes: '',
            expanded: false
        };
    }
    componentDidMount() {
        let allMakes;
        let allMakesNames = [];

        axios.get(`https://www.carqueryapi.com/api/0.3/?callback=?&cmd=getMakes&year=` + `${this.props.pickedYear}` + `&sold_in_us=1`)
            .then((response) => {
                allMakes = JSON.parse(response.data.slice(2, (response.data.length - 2)))

                Promise.all(allMakes.Makes.map(ele => {
                    allMakesNames.push(ele)
                })).then(() => {

                    this.setState({ makes: allMakesNames, selectedMake: allMakesNames[0].make_display }, () => {
                        // do something with new state
                    })
                })
                //Here we have to set selectedMake to the first item in the response list
                //If the user doesn't move the scroll wheel, even though it starts on the first one
                //The value won't change, because they never moved the scroll wheel. 
            })
            .catch(function (error) {
                console.log(error);
            });

    }

    componentDidUpdate() {


    }


    handleChange(value) {
        this.setState({
            selectedMake: value
        });
    }



    render() {
        return (
            <ScrollView >
                <View style={{ flex: 1, marginTop: 20 }}>
                    {this.state.makes.length > 1 ?
                        <ScrollView >
                            <SmartPicker

                                expanded={this.state.expanded}
                                selectedValue={this.state.selectedMake}
                                label='Select Make'
                                onValueChange={this.handleChange.bind(this)}
                            >
                                {
                                    this.state.makes.map((ele) => {
                                        return (<Picker.Item label={ele.make_display} value={ele.make_display} />)
                                    })
                                }
                            </SmartPicker>
                            <Button block onPress={() => this.props.vehicleMake(this.state.selectedMake)}>
                                <Text>Done</Text>
                            </Button>
                        </ScrollView>
                        : <Spinner />}

                </View>

            </ScrollView>
        );
    }
}
{/* <Picker.Item label='Select Make' value='Toyota' /> */ }