import { Text, StyleSheet, View, TouchableOpacity, Image } from 'react-native'
import React, { Component } from 'react'
import { Input, CustomButton, Header } from '../components';
import Images from '../assets/images'
import { colors, staticText } from '../config'
import fonts from '../assets'
import { DrawerActions } from '@react-navigation/native';
import ImagePickerView from "../components/ImagePickerView";

export default class RequestProduct extends Component {

    constructor(props) {
        super(props);
        this.state = {
            productName: '',
            productDesc: '',
            ImageUri: '',
            isImagePickerVisible: false,
        }
    }

    onGetURI = (image) => {
        this.setState({ isImagePickerVisible: false, ImageUri: image })
    };

    onPressUploadImage = () => {
        console.log("onPressUpload image");
    }

    render() {
        return (
            <View style={styles.container}>
                <Header
                    // onBackButtonPress={() => this.props.navigation.goBack()}
                    // backButton /* rightIcon */
                    onBackButtonPress={() => this.props.navigation.dispatch(DrawerActions.openDrawer())} backIcon={Images.list} backButton /* rightIcon */
                    middleText={staticText.requestProduct} />

                <View style={styles.subView}>
                    <Text style={styles.requestBulkText}>Request a new Product</Text>
                    <TouchableOpacity onPress={() => this.setState({ isImagePickerVisible: true })}>

                        <View style={styles.imageView}>
                            {this.state.ImageUri ?
                                <Image
                                    source={{
                                        uri: Platform.OS == 'ios' ? "file://" + this.state.ImageUri.path
                                            : this.state.ImageUri.path
                                    }} style={{ width: 330, height: 200, borderRadius: 10, }}
                                >
                                </Image>
                                :
                                <View style={{ position: 'absolute', justifyContent: 'center', alignItems: 'center' }}>
                                    <Image source={Images.gallary}></Image>
                                    <Text style={styles.uploadText}>Upload Image*</Text>
                                </View>
                            }
                        </View>

                    </TouchableOpacity>
                    <ImagePickerView
                        visible={this.state.isImagePickerVisible}
                        transparent={true}
                        CloseModal={() => this.setState({ isImagePickerVisible: false })}
                        onGetURI={this.onGetURI}
                    />

                    <View style={styles.buttonStyle}>
                        <CustomButton
                            onPress={this.onPressSubmit}
                            title='Submit'
                            mainStyle={{ marginTop: 40, }} />
                    </View>

                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.backgroundColor
    },
    subView: {
        flex: 1,
        marginHorizontal: 30,
        marginVertical: 20
    },
    requestBulkText: {
        fontSize: 18,
        fontFamily: fonts.MuliSemiBold,
        color: colors.black
    },
    imageView: {
        height: 200,
        borderWidth: 1,
        backgroundColor: colors.white,
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: colors.borderDark,
        borderRadius: 10,
        marginVertical: 20
    },
    uploadText: {
        fontSize: 16,
        fontFamily: fonts.MuliSemiBold,
        color: colors.placeholderColor,
        marginTop: 20
    },
    deleteTextStle: {
        color: colors.Orange,
        fontSize: 20,
        fontFamily: fonts.Muli,
        alignSelf: 'center',
    },
    buttonStyle: {
        position: 'absolute',
        bottom: 15,
        // top:0
    }
})