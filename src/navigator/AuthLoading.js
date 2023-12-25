import React, { Component } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { StorageService, moderateScale } from '../utilities';
import { colors } from '../config';

class AuthLoading extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    componentDidMount() {
        //    setTimeout(() => {
        //       SplashScreen.hide();
        //   }, 1000);
        this.checkAuth();
    }
    checkAuth = async () => {
        let dataStore = await StorageService.getItem(StorageService.KEYS.USER_DETAILS);
        console.log('dataStoredataStore', dataStore);
        if (dataStore) {
        this.props.navigation.navigate('App');
        }
        else {
            this.props.navigation.navigate('Auth');
        }
    }
    render() {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <ActivityIndicator color={colors.Orange} size={"large"} />
            </View>
        );
    }
}

export default AuthLoading;
