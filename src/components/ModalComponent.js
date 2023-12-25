import React, { Component } from 'react';
import { View, Text, StyleSheet, Modal, TouchableHighlight, FlatList, TouchableOpacity, Platform } from 'react-native';
import { colors, constants, staticText } from '../config';
import fonts from '../assets/index';
import { isIphoneX } from '../utilities';

class ModalComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }

    /**
    * Compoenent Rendring 
    */
    render() {
        return (
            <View>

                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={this.props.modalVisible}
                    statusBarTranslucent
                    onRequestClose={this.props.onRequestClose}
                >
                    <TouchableHighlight
                        underlayColor={"transparent"}
                        onPress={this.props.closeModal}
                        style={styles.outerViewModalStyle}
                    >
                        <View style={styles.modal}>

                            <FlatList
                                style={{ marginTop: 10, }}
                                data={this.props.data}
                                renderItem={(item, index) => this.props.renderItem(item, index)}
                                keyExtractor={item => item.id}
                                bounces={false}
                                showsVerticalScrollIndicator={false}
                                extraData={this.state}
                                ItemSeparatorComponent={() => this.ItemSeparatorComponent()}
                                ListHeaderComponent={() => this.modalHeader(this.props.headerTitle)}
                            />

                        </View>
                    </TouchableHighlight>
                </Modal>

            </View>
        )
    }
    ItemSeparatorComponent = () => {
        return (
            <View style={styles.itemDivider} />

        )
    }
    modalHeader = (title) => {
        return (
            <View style={styles.modalHeaderView}>
                <Text style={styles.modalHeaderText}>{title ? title : 'Sort By'} </Text>
            </View>
        )
    }

}
export default ModalComponent;

/**
* Compoenent styles
*/
const styles = StyleSheet.create({
    safearea: {
        flex: 1,
        backgroundColor: colors.backgroundColor,
    },
    container: {
        flexGrow: 1,
        backgroundColor: colors.backgroundColor,
        justifyContent: 'space-between'

    },
    modal: {
        backgroundColor: colors.white,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        paddingBottom: isIphoneX() ? 30 : 10
    },
    itemDivider: {
        backgroundColor: colors.modalSeparatorItem,
        height: 1
    },
    outerViewModalStyle: {
        flex: 1,
        backgroundColor: colors.modalBackground,
        justifyContent: 'flex-end',

    },
    modalHeaderView: {
        height: 40,
        marginTop: 3,
        paddingLeft: 20,
        borderBottomColor: colors.modalSeparatorItem,
        borderBottomWidth: 1,
    },
    modalHeaderText: {
        fontFamily: fonts.MuliBold,
        fontSize: 20,
        color: colors.Orange,
    },
    confirmButtonView: {
        marginTop: 10,
        alignItems: 'flex-end',
        marginRight: 10,
    },
    confirmText: {
        color: colors.textColor,
        fontSize: 18
    },
})                       