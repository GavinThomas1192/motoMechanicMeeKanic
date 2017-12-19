import React, { Component } from "react";
import { Platform, ScrollView, View, Picker } from "react-native";
import Spinner from '../Components/Spinner'
import { Button, Text } from "native-base";
// const Item = Picker.Item;
import SmartPicker from 'react-native-smart-picker'

export default class vehicleTrimPicker extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedModel: "key1",
            models: '',
            expanded: false
        };
    }
    componentDidMount() {
        let allModels;
        let allModelsNames = [];
        // https://www.carqueryapi.com/api/0.3/?callback=?&cmd=getTrims&year=2005&model=4runner&drive=4wd&keyword=sport&max_cylinders=6

        fetch(`https://www.carqueryapi.com/api/0.3/?callback=?&cmd=getModels&make=` + `${this.props.homeState.vehicleMake.toLowerCase()}` + `&year=` + `${this.props.homeState.vehicleYear}` + `&sold_in_us=1`)
            .then((response) => {
                allModels = JSON.parse(response._bodyText.slice(2, (response._bodyText.length - 2)))

                allModels.Models.map(ele => {
                    // RESPONSE = model_engine_valves_per_cyl
                    // NEED TO REQUEST = sold_in_us=1&min_cylinders=4&max_cylinders=4

                    //RESPONSE = model_drive
                    //NEED TO REQUEST = &drive=Front, Rear, AWD, 4WD
                    allModelsNames.push(ele.model_name)
                })

                this.setState({ models: allModelsNames }, () => {
                    // do something with new state
                    console.log('STATE AFTER API CALL FOR MAKE AND YEAR', this.state)
                })
            })
            .catch(err => console.log(err))

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
                                <Picker.Item label='Select Model' value='4Runner' />
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