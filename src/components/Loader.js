import React from 'react';
import { View, ActivityIndicator } from 'react-native';

import colors from '../config/colors';

const Loader = ({ size, backgroundColor, containerStyle }) => {
    return (
        <View style={[{
            position: 'absolute',
            alignSelf: 'center',
            alignItems: 'center',
            top: size ? '30%' : '45%',
            backgroundColor: backgroundColor || "transparent",
            padding: 7,
            borderRadius: 10,
            zIndex: 1,
            height: 70,
            width: 70,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: colors.white,
            shadowColor: colors.shadow,
            shadowOpacity: 1,
            elevation: 4,
            shadowRadius: 5.15,
            shadowOffset: {
                height: 4.2,
                width: -0.79,
            },
        }, containerStyle]}>
            <ActivityIndicator
                size={size || "large"}
                color={colors.Orange}
                animating={true}
            />
        </View>
    );
}

export { Loader } 