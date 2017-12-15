import React, { Component } from "react";
import { Platform, ScrollView, View, Picker } from "react-native";
import Spinner from '../Components/Spinner'
import { Button, Text } from "native-base";
// const Item = Picker.Item;
import SmartPicker from 'react-native-smart-picker'

export default class VehicleMakePicker extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedMake: "key1",
            makes: '',
            expanded: false
        };
    }
    componentDidMount() {
        let allMakes;
        let allMakesNames = [];
        fetch(`https://www.carqueryapi.com/api/0.3/?callback=?&cmd=getMakes&year=` + `${this.props.pickedYear}` + `&sold_in_us=1`)
            .then((response) => {
                allMakes = JSON.parse(response._bodyText.slice(2, (response._bodyText.length - 2)))
                console.log('ALLMAKES', allMakes)
                allMakes.Makes.map(ele => {
                    allMakesNames.push(ele.make_display)
                })

                this.setState({ makes: allMakesNames }, () => {
                    // do something with new state
                    console.log('STATE AFTER API CALL', this.state)
                })
            })
            .catch(err => console.log(err))

    }

    componentDidUpdate() {


    }


    handleChange(value: string) {
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
                                        return (<Picker.Item label={ele} value={ele} />)
                                    })
                                }
                                <Picker.Item label='Select Make' value='Toyota' />
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