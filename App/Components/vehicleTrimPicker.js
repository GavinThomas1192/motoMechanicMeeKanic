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
            selectedTrim: '',
            trims: '',
            expanded: false
        };
    }
    componentDidMount() {
        let name;
        let id;
        let allTrims;
        let allTrimsNames = [];
        // https://www.carqueryapi.com/api/0.3/?callback=?&cmd=getTrims&year=2005&model=4runner

        fetch(`https://www.carqueryapi.com/api/0.3/?callback=?&cmd=getTrims&year=` + `${this.props.homeState.vehicleYear}` + `&model=` + `${this.props.homeState.vehicleModel}` + `&sold_in_us=1`)
            .then((response) => {
                allTrims = JSON.parse(response._bodyText.slice(2, (response._bodyText.length - 2)))
                console.log(allTrims, 'ALL RESULTS FROM MAKE, MODEL, YEAR')
                allTrims.Trims.map(ele => {


                    allTrimsNames.push({ name: ele.model_trim, id: ele.model_id })
                })

                this.setState({ trims: allTrimsNames, selectedTrim: allTrimsNames[0] }, () => {
                    // do something with new state
                    console.log('VEHICLETRIMPICKER STATE AFTER GRABBING ALL TRIMS', this.state)
                })
            })
            .catch(err => console.log(err))

    }


    componentDidUpdate() {


    }


    handleChange(value) {
        this.setState({
            selectedTrim: value
        });
    }



    render() {
        return (
            <ScrollView >
                <View style={{ flex: 1, marginTop: 20 }}>
                    {this.state.trims.length > 1 ?
                        <ScrollView >
                            <SmartPicker

                                expanded={this.state.expanded}
                                selectedValue={this.state.selectedTrim.name}
                                label='Select Trim'
                                onValueChange={this.handleChange.bind(this)}
                            >
                                {
                                    this.state.trims.map((ele) => {
                                        return (<Picker.Item label={ele.name} value={ele} />)
                                    })
                                }
                            </SmartPicker>
                            <Button block onPress={() => this.props.vehicleTrim(this.state.selectedTrim)}>
                                <Text>Done</Text>
                            </Button>
                        </ScrollView>
                        : <Button block onPress={() => this.props.vehicleTrim('No Possible Trims')}>
                            <Text>That one!</Text>
                        </Button>}

                </View>

            </ScrollView>
        );
    }
}
{/* <Picker.Item label='Select Trim' value='S' /> */ }