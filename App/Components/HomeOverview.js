import React, { Component } from 'react';
import Spinner from './Spinner'
import { Container, Header, Content, Card, CardItem, Text, Icon, Right, Button } from 'native-base';
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
        });
    }

    render() {
        return (
            // ******* The first if, renders loading spinner if firebase promise isn't returned yet.
            // ******* The second if, checks to make sure the user returned from firebase has vehicles.

            <Container>

                {this.state.loading ? <Spinner /> :
                    <Container>
                        {this.state.user.allVehicles ?
                            <Content>
                                <Card>
                                    <CardItem>
                                        <Icon active name="logo-googleplus" />
                                        <Text>{this.state.user ? this.state.user.allVehicles[0].name : 'didnt work'}</Text>
                                        <Right>
                                            <Icon name="arrow-forward" />
                                        </Right>
                                    </CardItem>
                                </Card>
                            </Content>
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
        );
    }
}