import React, { Component } from 'react';
import Spinner from './Spinner'
import { Container, Header, Content, Card, CardItem, Text, Icon, Right } from 'native-base';
export default class HomeOverview extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            user: {},
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
                                        <Text>{this.state.user ? this.state.user.account.username : 'didnt work'}</Text>
                                        <Right>
                                            <Icon name="arrow-forward" />
                                        </Right>
                                    </CardItem>
                                </Card>
                            </Content>
                            : <Text>Opps it looks like you don't have any vehicles yet!</Text>}
                    </Container>}
            </Container>
        );
    }
}