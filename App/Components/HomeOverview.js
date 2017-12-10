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
        console.log('HEYYAAAA GAVIN', this.props)
        {
            this.props.props ? this.setState({ user: this.props.props, loading: false }, function () {
            }) : undefined
        }
    }


    componentWillReceiveProps(nextProps) {
        this.setState({ user: nextProps.props, loading: false }, function () {
            console.log('HEREER@@@@@@@@@@', this.state, nextProps)
        });
    }

    render() {
        console.log('homeoverview', this.props)
        return (
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