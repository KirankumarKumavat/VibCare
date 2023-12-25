import { Text, StyleSheet, View, Keyboard, SafeAreaView } from 'react-native'
import React, { Component } from 'react'
import { colors, staticText, constants } from '../config'
import { CustomButton, Header, Input } from '../components';

export default class AddDivision extends Component {

    constructor(props) {
        super(props);
        this.state = {

            division: '',

        };
    }

    onPressSubmit = () => {
        this.props.navigation.navigate('MyAccount')
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <Header
                    onBackButtonPress={() => this.props.navigation.navigate('MyAccount')}
                    backButton
                    middleText={staticText.ptrptscalculator}
                />
                <View style={{ flex: 1, backgroundColor: colors.backgroundColor, paddingVertical: 20 }}>
                    <Input
                        autoCapitalize='characters'
                        placeholder={staticText.divisons}
                        returnKeyType="done"
                        value={this.state.division}
                        onSubmitEditing={() => Keyboard.dismiss()}
                        maxLength={15}
                        onChangeText={(division) => this.setState({ division: division.replace(/ +/g, '') })}
                        blurOnSubmit={false}
                    />
                </View>
                <View style={styles.buttonStyle}>
                    <CustomButton
                        onPress={this.onPressSubmit}
                        title='Submit'
                        mainStyle={{ marginTop: 40, }} />
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
    buttonStyle: {
        bottom: 15,
        backgroundColor: colors.backgroundColor
        // top:0
    }
})