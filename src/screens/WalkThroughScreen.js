import { Text, StyleSheet, View, TouchableOpacity, Image, FlatList, Dimensions } from 'react-native'
import React, { Component } from 'react'
import { Input, CustomButton, Header } from '../components';
import Images from '../assets/images'
import { colors, staticText, constants } from '../config'
import fonts from '../assets'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export default class WalkThroughScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedIndex: 0,
            MedicalImagedata: [
                {
                    id: 1,
                    WalkTrough: Images.Mobile,
                    text: "Order Anytime",
                    smalltext: "Now ordering is at your fingertips. Place\norders whenever you want."
                },
                {
                    id: 2,
                    WalkTrough: Images.Vaccine,
                    text: "Digital Visual Aid",
                    smalltext: "Now access digital visual aid for your\nproducts with ease."
                },
                {
                    id: 3,
                    WalkTrough: Images.Group,
                    text: "Customer Dashboard",
                    smalltext: "Find all information regarding your Past\nOrders, Allocated Divisions, Ledger\nBalance, Incentives and More directly\nfrom your dashboard."
                },
                {
                    id: 4,
                    WalkTrough: Images.MedicalStore,
                    text: "Offers",
                    smalltext: "Find offers on latest products",
                }
            ]
        }
    }
    renderListItem = ({ item, index }) => {
        return (
            <View style={{ flex: 1, width: '100%', }}>
                <View style={{ height: Dimensions.get('window').height / 1.9, justifyContent: 'flex-end', alignItems: 'center', width: Dimensions.get('window').width }}>
                    <Image source={item.WalkTrough} />
                </View>
                <View style={{ marginTop: 86 }}>
                    <Text style={{ marginVertical: 15, fontSize: 22, alignSelf: 'center', color: colors.fontBlack, fontFamily: fonts.HelveBold }}>{item.text}</Text>
                    <Text style={{ fontSize: 16, color: colors.smallFont, alignItems: 'center', fontFamily: fonts.Helvetica, alignSelf: 'center', textAlign: 'center' }}>{item.smalltext}</Text>
                </View>
            </View>
        )
    }
   
    onPressLogin = ({ }) => {

    }

    render() {
        return (
            <View style={styles.Topcontainer}>
                <KeyboardAwareScrollView
                    bounces={false}
                    showsVerticalScrollIndicator={false}
                    keyboardShouldPersistTaps='handled'
                    contentContainerStyle={styles.contentContainerStyle}
                >
                    <View style={{}} >
                        <View style={{}}>
                            <Image
                                resizeMode='stretch'
                                style={{ position: 'absolute', width: '100%', height: constants.screenHeight, }}                            //for Andriod
                                source={Images.IntroScreenbg}></Image>
                        </View>

                        <View style={{}}>
                            <FlatList
                                data={this.state.MedicalImagedata}
                                horizontal
                                showsHorizontalScrollIndicator={false}
                                renderItem={this.renderListItem}
                                pagingEnabled
                                contentContainerStyle={{ flexGrow: 1, }}
                                onScroll={(event) => {
                                    // setselectedIndex(Math.round(event.nativeEvent.contentOffset.x / deviceWidth));
                                    this.setState({
                                        selectedIndex: Math.round(event.nativeEvent.contentOffset.x / Dimensions.get('window').width)
                                    })
                                }}
                                keyExtractor={(item, index) => index.toString()}
                            />

                            <View style={{ justifyContent: 'center', alignItems: 'center', }}>
                                <View style={{ flexDirection: 'row', marginTop: 30 }}>
                                    {this.state.MedicalImagedata && this.state.MedicalImagedata.map((itemObj, index) => {
                                        return (<View style={{
                                            marginLeft: 10,
                                            height: 10,
                                            width: 10,
                                            borderRadius: 10 / 2,
                                            opacity: this.state.selectedIndex == index ? 1 : 0.5,
                                            backgroundColor: this.state.selectedIndex == index ? colors.dotColor : colors.greyDot
                                        }} />)
                                    })}
                                </View>
                                {this.state.selectedIndex == 3 ?

                                    <CustomButton
                                        mainStyle={styles.customSignUpButtonOneStyle}
                                        title={staticText.Login}
                                        onPress={() => this.props.navigation.navigate('Signin')}
                                    // disabled={this.state.loading ? true : false}
                                    />
                                    :
                                    null
                                }

                            </View>
                        </View>

                    </View>

                </KeyboardAwareScrollView>

            </View>
        )
    }
}

const styles = StyleSheet.create({
    Topcontainer: {
        flex: 1,
        // backgroundColor: 'red',
        // justifyContent: 'center',
        // alignItems: 'center',
        // backgroundColor: 'red'
        backgroundColor:colors.backgroundColor1,
    },
    // Bottomcontainer: {
    //     backgroundColor: '#F8F8F8',
    //     width: '100%',
    //     height: '60%',
    // },
    customSignUpButtonOneStyle: {
        marginTop: 30

    }

})