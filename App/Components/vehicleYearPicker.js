import React, { Component } from "react";
import { Platform } from "react-native";
import Spinner from '../Components/Spinner'
import { Container, Header, Title, Content, Button, Icon, Text, Right, Body, Left, Picker, Form, View, H3, Item as FormItem } from "native-base";
const Item = Picker.Item;

export default class VehicleYearPicker extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selected1: "key1",
            years: [],
        };
        this.renderNumberItems = this.renderNumberItems.bind(this)
    }
    componentDidMount() {
        console.log('YEARPICKERDID MOUNT', this.props.years)
    }


    onValueChange(value: string) {
        this.setState({
            selected1: value
        });
    }

    renderNumberItems() {
        {
            this.props.years.map((ele) => {

                <Item key={ele} label={ele.toString()} value={ele} />
                console.log(ele)
            })
        }
    }

    render() {


        return (
            <Container>

                <Content>
                    <Form>
                        {this.props.years ?
                            <Picker
                                renderHeader={backAction =>
                                    <Header style={{ backgroundColor: "#f44242" }}>
                                        <Left>
                                            <Button transparent onPress={backAction}>
                                                <Icon name="arrow-back" style={{ color: "#fff" }} />
                                            </Button>
                                        </Left>
                                        <Body style={{ flex: 3 }}>
                                            <Title style={{ color: "#fff" }}>Vehicle Year</Title>
                                        </Body>
                                        <Right />
                                    </Header>}
                                mode="dropdown"
                                style={{ width: Platform.OS === "ios" ? undefined : 200 }}
                                selectedValue={this.state.selected1}
                                onValueChange={this.onValueChange.bind(this)}
                            >


                                <Item label="Wallet" value="key0" />
                                <Item label="ATM Card" value="key1" />
                                <Item label="Debit Card" value="key2" />
                                <Item label="Credit Card" value="key3" />
                                <Item label="Net Banking" value="key4" />
                                {this.renderNumberItems()}

                            </Picker>
                            : <Spinner />}
                    </Form>
                </Content>
            </Container>
        );
    }
}