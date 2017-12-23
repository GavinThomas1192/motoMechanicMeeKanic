import React, { Component } from 'react';
import Spinner from './Spinner'
import { Image, ScrollView } from 'react-native';
import VehiclePhotoPicker from './vehiclePhotoPicker'
import { Container, Header, Content, Card, CardItem, Text, Icon, Right, Left, Button, Thumbnail, Body } from 'native-base';
import { Images } from '../Themes'
const backgroundImage = require("../Images/vw.jpg");


export default class HomeOverview extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            user: {},
        }
    }

    componentDidMount() {
        // ********** This will always be undefined the first time this component mounts. 
        // However the Second time, props will already be loaded from the store **********
        {
            this.props.props ? this.setState({ user: this.props.props, loading: false }, function () {
            }) : undefined
        }
    }


    componentWillReceiveProps(nextProps) {
        // ******* When this component mounts the first time the firebase actions aren't complete and there isn't any user info
        // ******* When Firebase returns promise we will assign the database user to this.state.user
        // ******* We have to render everything in this component from this.state.user to avoid async errors

        this.setState({ user: nextProps.props, loading: false }, function () {
            console.log(this.state, "*********************")
        });
    }

    render() {
        console.log(this.state, this.props, '**************')
        return (
            // ******* The first if, renders loading spinner if firebase promise isn't returned yet.
            // ******* The second if, checks to make sure the user returned from firebase has vehicles.

            <ScrollView>
                <Container>

                    {this.state.loading ? <Spinner /> :
                        <Container>
                            < VehiclePhotoPicker />

                            {this.state.user.allVehicles ?

                                this.props.props.allVehicles.allVehiclesArray.map(ele => {
                                    return (
                                        <Card style={{ flex: 0 }}>
                                            <CardItem>
                                                <Left>
                                                    <Thumbnail source={Images.background} />
                                                    <Body>
                                                        <Text>{ele.model_year + ' ' + ele.make_display + ' ' + ele.model_name}</Text>
                                                        <Text note>{ele.model_trim}</Text>
                                                    </Body>
                                                </Left>
                                            </CardItem>
                                            <CardItem>
                                                <Body>
                                                    <Image source={require("../Images/vw.jpg")} style={{ height: 200, width: 200, flex: 1 }} />
                                                    {/* //I have no idea why transmission is white/why this works.. but it does... */}
                                                    <Text>

                                                        Transmission:   {ele.model_transmission_type === undefined ? 'Automatic' : ele.model_transmission_type}
                                                    </Text>
                                                    <Text>
                                                        {`Horsepower: ` + ele.model_engine_power_hp}
                                                    </Text>

                                                </Body>
                                            </CardItem>
                                            <CardItem>
                                                <Left>
                                                    <Button transparent textStyle={{ color: '#87838B' }}>
                                                        <Icon name="build" />
                                                        <Text>10 Maintaince Records</Text>
                                                    </Button>
                                                </Left>
                                            </CardItem>
                                        </Card>
                                    )
                                })
                                :
                                <Container>
                                    <Content>
                                        <Text>Opps it looks like you don't have any vehicles yet!</Text>
                                        <Button transparent onPress={() => this.props.navigation.navigate('VehicleCreateScreen')} >
                                            <Text>Go Make one!</Text>
                                        </Button>
                                    </Content>
                                </Container>
                            }
                        </Container>}
                </Container>
            </ScrollView>
        );
    }
}