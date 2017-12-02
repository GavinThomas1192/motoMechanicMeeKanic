import React, { Component } from 'react';
import { Container, Content, List, ListItem, Icon, Text, Image } from 'native-base';
import styles from './Styles/SideBarStyle';
import { Images } from '../Themes'



export default class SideBar extends Component {
    render() {
        const datas = [
            {
                name: "Home",
                route: "HomeScreen",
                icon: "phone-portrait",
                bg: "#C5F442",
            },

        ];


        return (
            <Container>
                <Content >

                </Content>
            </Container>
        );
    }
}
{/* <List
    dataArray={datas}
    renderRow={data =>
        <ListItem button noBorder onPress={() => this.props.navigation.navigate(data.route)}>
            <Left>
                <Icon active name={data.icon} style={{ color: "#777", fontSize: 26, width: 30 }} />
                <Text style={styles.text}>
                    {data.name}
                </Text>
            </Left>
            {data.types &&
                <Right style={{ flex: 1 }}>
                    <Badge
                        style={{
                            borderRadius: 3,
                            height: 25,
                            width: 72,
                            backgroundColor: data.bg,
                        }}
                    >
                        <Text style={styles.badgeText}>{`${data.types} Types`}</Text>
                    </Badge>
                </Right>}
        </ListItem>}
/> */}