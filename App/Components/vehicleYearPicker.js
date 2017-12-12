import React, { Component } from "react";
import { Platform, ScrollView, View, Picker } from "react-native";
import Spinner from '../Components/Spinner'
// import { Container, Header, Title, Content, Button, Icon, Text, Right, Body, Left, Picker, Form, View, H3, Item as FormItem } from "native-base";
// const Item = Picker.Item;
import SmartPicker from 'react-native-smart-picker'

export default class VehicleYearPicker extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selected1: "key1",
            years: [],
        };
    }
    componentDidMount() {
        console.log('YEARPICKERDID MOUNT', this.props.years)
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
                          {year: (1941 + i) }
                        )
                    }
        return (
            <ScrollView >
            <View style={{flex: 1, marginTop: 20}}>
                <ScrollView >
                    {data.length > 0 ?
                <SmartPicker
                    selectedValue={this.state.selected1}
                    label='Vehicle Year'
                    onValueChange={this.handleChange.bind(this)}
                >
                {
                    data.map((ele)=> {
                    return (<Picker.Item label={ele.year.toString()} value={ele.year} />)
                }) 
            }
                    <Picker.Item label='Select Year' value='1941' />
                    
                </SmartPicker>
                    : <Spinner /> }
                </ScrollView>

            </View>
            </ScrollView>
        );
    }
}