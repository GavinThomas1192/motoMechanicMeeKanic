import React, { Component } from "react";
import { Platform, ScrollView, View, Picker } from "react-native";
import Spinner from '../Components/Spinner'
import { Button, Text } from "native-base";
// const Item = Picker.Item;
import SmartPicker from 'react-native-smart-picker'

export default class VehicleYearPicker extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selected1: 2017,
            years: [],
            expanded: false
        };
    }
    componentDidMount() {
    }

    componentDidUpdate() {
    }


    handleChange(value) {
        this.setState({
            selected1: value
        });
    }





    render() {

        const data = [];
        for (let i = 0; i < (2017 - 1941); i++) {

            data.push(
                { year: (2017 - i) }
            )
        }
        return (
            <ScrollView >
                <View style={{ flex: 1, marginTop: 20 }}>
                    {data.length > 0 ?
                        <ScrollView >
                            <SmartPicker

                                expanded={this.state.expanded}
                                selectedValue={this.state.selected1}
                                label='Vehicle Year'
                                onValueChange={this.handleChange.bind(this)}
                            >
                                {
                                    data.map((ele) => {
                                        return (<Picker.Item label={ele.year.toString()} value={ele.year} />)
                                    })
                                }
                            </SmartPicker>
                            <Button block onPress={() => this.props.vehicleYear(this.state.selected1)}>
                                <Text>Done</Text>
                            </Button>
                        </ScrollView>
                        : <Spinner />}

                </View>

            </ScrollView>
        );
    }
}
