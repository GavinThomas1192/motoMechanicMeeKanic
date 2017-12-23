import React, { Component } from "react";
import { Platform, ScrollView, View, Picker } from "react-native";
import Spinner from '../Components/Spinner'
import { Button, Text } from "native-base";
// const Item = Picker.Item;
import SmartPicker from 'react-native-smart-picker'
import axios from 'axios'

export default class VehicleModelPicker extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedModel: '',
            models: '',
            expanded: false
        };
    }
    componentDidMount() {
        let allModels;
        let allModelsNames = [];


        axios.get(`https://www.carqueryapi.com/api/0.3/?callback=?&cmd=getModels&make=` + `${this.props.homeState.vehicleMake.toLowerCase()}` + `&year=` + `${this.props.homeState.vehicleYear}` + `&sold_in_us=1`)
            .then((response) => {
                allModels = JSON.parse(response.data.slice(2, (response.data.length - 2)))

                Promise.all(allModels.Models.map(ele => {
                    allModelsNames.push(ele.model_name)
                })).then(() => {
                    this.setState({ models: allModelsNames, selectedModel: allModelsNames[0] }, () => {
                        // do something with new state
                        console.log('STATE AFTER API CALL FOR MAKE AND YEAR', this.state)
                    })

                })

            })
            .catch(function (error) {
                console.log(error);
            });


    }


    componentDidUpdate() {


    }


    handleChange(value: string) {
        this.setState({
            selectedModel: value
        });
    }



    render() {
        return (
            <ScrollView >
                <View style={{ flex: 1, marginTop: 20 }}>
                    {this.state.models.length > 0 ?
                        <ScrollView >
                            <SmartPicker

                                expanded={this.state.expanded}
                                selectedValue={this.state.selectedModel}
                                label='Select Model'
                                onValueChange={this.handleChange.bind(this)}
                            >
                                {
                                    this.state.models.map((ele) => {
                                        return (<Picker.Item label={ele} value={ele} />)
                                    })
                                }
                            </SmartPicker>
                            <Button block onPress={() => this.props.vehicleModel(this.state.selectedModel)}>
                                <Text>Done</Text>
                            </Button>
                        </ScrollView>
                        : <Spinner />}

                </View>

            </ScrollView>
        );
    }
}
{/* <Picker.Item label='Select Model' value='4Runner' /> */ }