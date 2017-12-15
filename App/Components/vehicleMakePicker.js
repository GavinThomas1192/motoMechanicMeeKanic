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
            selected1: "key1",
            makes: [],
            expanded: false
        };
    }
    componentDidMount() {
        let year;
        let url = `https://www.carqueryapi.com/api/0.3/?callback=?&cmd=getMakes&year=` + this.props.pickedYear + `&sold_in_us=1`
        { this.props.pickedYear ? year = this.props.pickedYear : undefined }
        console.log('BEFORE API CALL YEAR', year, url)
        fetch(`https://www.carqueryapi.com/api/0.3/?callback=?&cmd=getMakes&year=` + `${this.props.pickedYear}` + `&sold_in_us=1`)
            .then(function (response) {
                console.log('RETURNED FROM API', JSON.parse(response._bodyText.slice(2, (response._bodyText.length - 2))))
                //this.setstate responses into makes
            })
            .catch(err => console.log(err))

    }

    componentDidUpdate() {
        let year;
        let url = `https://www.carqueryapi.com/api/0.3/?callback=?&cmd=getMakes&year=` + this.props.pickedYear + `&sold_in_us=1`
        { this.props.pickedYear ? year = this.props.pickedYear : undefined }
        console.log('BEFORE API CALL YEAR', year, url)
        fetch(`https://www.carqueryapi.com/api/0.3/?callback=?&cmd=getMakes&year=` + this.props.pickedYear + `&sold_in_us=1`)
            .then(function (response) {
                console.log('RETURNED FROM API', response.json())
            })

    }


    handleChange(value: string) {
        this.setState({
            selected1: value
        });
    }



    render() {

        const data = [];
        for (let i = 0; i < (2017 - 1941); i++) {

            data.push(
                { year: (1941 + i) }
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
                                <Picker.Item label='Select Year' value='1941' />
                            </SmartPicker>
                            <Button block onPress={() => this.props.vehicleMake(this.state.selected1)}>
                                <Text>Done</Text>
                            </Button>
                        </ScrollView>
                        : <Spinner />}

                </View>

            </ScrollView>
        );
    }
}