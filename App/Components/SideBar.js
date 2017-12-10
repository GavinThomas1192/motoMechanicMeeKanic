import React, { Component } from 'react';
import { Container, Content, List, ListItem, Icon, Text, Button, Left, Right, Badge } from 'native-base';
import { Image } from 'react-native'
import styles from './Styles/SideBarStyle';
// import backgroundImage from '../Images/vw.jpg'

const backgroundImage = require("../Images/vw.jpg");
const drawerImage = require("../Images/dirtyHandsDark.jpg");


export default class SideBar extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        // *********** HERE WE DECLARE AN ARRAY TO RENDER LISTS FROM. THIS COULD ALSO BE LIST OF BIKES FROM STORE.. ***********
        const datas = [
            {
                name: "Home",
                route: "HomeScreen",
                icon: "settings",
                bg: "#C5F442",
            },
            {
                name: "Repair",
                route: "HomeScreen",
                icon: "settings",
                bg: "#C5F442",
            },
            {
                name: "My Profile",
                route: "SettingsScreen",
                icon: "settings",
                bg: "#C5F442",
            },

        ];


        return (
            <Container>
                <Content bounces={false} style={{ flex: 1, backgroundColor: "#fff", top: -1 }}>
                    <Image source={backgroundImage} style={styles.drawerCover}>
                        <Image square style={styles.drawerImage} source={drawerImage} />
                    </Image>
                    <List
                        dataArray={datas}
                        renderRow={data =>
                            // *********** CREATE NEW LIST ITEM ON CLICK NAVIGATE TO APPROPRIATE LISTITEM.SCREEN ***********
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
                    />
                </Content>
            </Container>
        );
    }
}