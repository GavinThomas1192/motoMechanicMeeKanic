import React, { Component } from 'react'
import axios from 'axios'
import { ScrollView, Text, KeyboardAvoidingView, View, TextInput, StatusBar, Image, TouchableHighlight, WebView } from 'react-native'
import { connect } from 'react-redux'
import { Container, Header, Content, Form, Item, Input, Left, Body, Right, Button, Icon, Title, Toast, Card, CardItem, Thumbnail } from 'native-base';
import Spinner from '../Components/Spinner'
// import Search from 'youtube-search'
import YTSearch from 'youtube-api-search';
import YouTube, { YouTubeStandaloneIOS, YouTubeStandaloneAndroid } from 'react-native-youtube';
import firebase from 'firebase'
import { userVehicleCreateRequest, userVehiclePhotoUploadRequest } from '../Actions/vehicle-actions';
import { Images } from '../Themes'






// import styles from './Styles/VehicleCreateScreenStyle'

class RepairScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            vehicle: '', repairRequest: '', youtubeVideoResults: [], isReady: '', status: '', quality: '', error: '', videoId: '',
        }
        this.searchYoutube = this.searchYoutube.bind(this)
        this.showYoutubeVideo = this.showYoutubeVideo.bind(this)

    }

    componentDidUpdate() {
        console.log(this.state)


    }


    componentDidMount() {
        console.log('Repair Screen mounted', this.props.navigation.state.params.vehicle)
        this.setState({ vehicle: this.props.navigation.state.params.vehicle }, function () {
            console.log('Repair screen state after setting state', this.state)
        })
    }

    searchYoutube() {


        YTSearch({ key: 'AIzaSyD356pL-yUmg00fr43Geu-_fIUZUF8X1Cc', term: this.state.repairRequest }, result => {
            this.setState({ youtubeVideoResults: result }, function () {

                console.log(this.state);
            })
        });

    }

    showYoutubeVideo(videoId) {
        this.setState({ videoId: videoId }, function () {
            console.log('updated chosen video', this.state)
        })

    }



    render() {

        return (
            <ScrollView>
                {this.state.vehicle.photosReference ?
                    <Card style={{ flex: 0 }}>
                        <CardItem>
                            <Left>

                                <Thumbnail source={{ uri: this.state.vehicle.photosReference.referenceToUploadedPhotos[0] }} />
                                <Body>
                                    <Text>{this.state.vehicle.model_year + ' ' + this.state.vehicle.make_display + ' ' + this.state.vehicle.model_name}</Text>
                                    <Text note>{this.state.vehicle.model_trim}</Text>
                                </Body>
                            </Left>
                        </CardItem>
                        <CardItem cardBody>
                            {/* <Image source={{ uri: this.state.vehicle.photosReference.referenceToUploadedPhotos[0] }} style={{ height: 200, width: null, flex: 1 }} /> */}
                        </CardItem>

                        <CardItem>
                            <Body>
                                {/* //I have no idea why transmission is white/why this works.. but it does... */}
                                <Text>

                                    Transmission:   {this.state.vehicle.model_transmission_type === undefined ? 'Automatic' : this.state.vehicle.model_transmission_type}
                                </Text>
                                <Text>
                                    {`Horsepower: ` + this.state.vehicle.model_engine_power_hp}
                                </Text>

                            </Body>
                        </CardItem>
                        <CardItem>
                            <Text>Alright, lets fix this thing. Here's some common repairs.</Text>
                        </CardItem>
                        <CardItem>
                            <Button transparent textStyle={{ color: '#87838B' }}>
                                <Icon name="build" />
                                <Text>Oil Change</Text>
                            </Button>
                        </CardItem>
                        <CardItem>
                            <Button transparent textStyle={{ color: '#87838B' }}>
                                <Icon name="build" />
                                <Text>Brakes</Text>
                            </Button>
                        </CardItem>
                        <CardItem>
                            <Button transparent textStyle={{ color: '#87838B' }}>
                                <Icon name="build" />
                                <Text>Radiator Flush</Text>
                            </Button>
                        </CardItem>
                        <CardItem>
                            <Text>Don't see what you need to do? Tell me what you want to fix below.</Text>

                        </CardItem>
                        <CardItem>
                            <Text>Ex. "CV Boot Replacement"</Text>
                        </CardItem>
                        <CardItem>
                            <Item rounded>
                                <Input placeholder='Rounded Textbox' onChangeText={repairRequest => this.setState({ repairRequest })} />
                                <Button onPress={this.searchYoutube}>

                                    <Text>Search</Text>
                                </Button>
                            </Item>
                        </CardItem>



                        {this.state.youtubeVideoResults.map(ele => {

                            return <Content>
                                <CardItem>
                                    <Text>{ele.snippet.title}</Text>
                                </CardItem>
                                <CardItem>
                                    <WebView
                                        source={{ uri: `https://www.youtube.com/embed/${this.state.videoId}` }}
                                        style={{ marginBottom: 20, height: 200, width: null, flex: 1 }}
                                    />
                                </CardItem>
                            </Content>
                        })}

                    </Card>
                    : undefined
                }




            </ScrollView>


        )
    }
}
//Merry Christmas Github
const mapStateToProps = (state) => {
    return {
        user: state.user,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RepairScreen)

