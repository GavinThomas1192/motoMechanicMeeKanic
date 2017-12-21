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
            trimWithId: '',
            trims: '',
            expanded: false
        };
        this.handleTrimPick = this.handleTrimPick.bind(this);
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

                this.setState({ trims: allTrimsNames, selectedTrim: allTrimsNames[0].name }, () => {
                    // do something with new state
                    console.log('VEHICLETRIMPICKER STATE AFTER GRABBING ALL TRIMS', this.state)
                })
            })
            .catch(err => console.log(err))

    }


    componentDidUpdate() {


    }

    //we need to do this extra step unlike the other components because we need both the name AND id.
    //Our Picker doesn't support entire objects as values. 
    handleTrimPick(value) {
        this.state.trims.filter(ele => {
            ele.name === value ? this.setState({ trimWithId: ele }, () => {
                console.log('bouts to call some redux')
                this.props.vehicleTrim(this.state.trimWithId)
            }) : console.log('no match you suck')
        })

    }

    handleChange(value) {
        console.log('VALUE', value)
        this.setState({
            selectedTrim: value,
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
                                selectedValue={this.state.selectedTrim}
                                label='Select Trim'
                                onValueChange={this.handleChange.bind(this)}
                            >
                                {
                                    this.state.trims.map((ele) => {
                                        return (<Picker.Item label={ele.name} value={ele.name} />)
                                    })
                                }
                            </SmartPicker>
                            <Button block onPress={() => this.handleTrimPick(this.state.selectedTrim)}>
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