import React, { Component } from 'react';
import { View, Text, StyleSheet, } from 'react-native';

import { colors, constants, } from '../config';
import fonts from '../assets/index';
import { Header } from '../components';
import { Loader } from '../components/Loader';

import StepIndicator from 'react-native-step-indicator';
import r from '../api/request';
import { customStyles } from '../config/constants';

// const labels = ["Order Received", "On The Way", "Completed", "Invoiced"];

class TrackOrder extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            currentPosition: 0,
            orderTrackPositionDetail: [],
            orderNumber: "",
            totalItems: 0,
            orderDate: "",
            orderAmount: "",
        };
    }

    componentDidMount = () => {
        this.getTrackOrderDetails();
    }

    getTrackOrderDetails = async () => {
        let orderId = this.props.route.params.orderId;
        this.setState({ loading: true })
        const response = await r.get(`${constants.apiVersion}/order/track?order_id=${orderId}`);
        this.setState({ loading: false })
        if (response && response.data && response.data.history) {
            this.setState({
                orderTrackPositionDetail: response.data.history || [],
                orderNumber: response.data.incremented_id,
                orderDate: response.data.created_at,
                totalItems: response.data.items_count,
                orderAmount: response.data.grand_total
            })

            if (response.data.history && response.data.history.length && response.data.history.length == 4) {
                let trackArray = response.data.history;
                if (trackArray[0].value == "true" && trackArray[1].value == "true" && trackArray[2].value == "true" && trackArray[3].value == "true") {
                    this.setState({ currentPosition: 3 });
                    return true;
                }
                else if (trackArray[0].value == "true" && trackArray[1].value == "true" && trackArray[2].value == "true") {
                    this.setState({ currentPosition: 2 })
                    return true;
                }
                else if (trackArray[0].value == "true" && trackArray[1].value == "true") {
                    this.setState({ currentPosition: 1 })
                    return true;
                }
                else if (trackArray[0].value == "true") {
                    this.setState({ currentPosition: 0 })
                    return true;
                }
                else {
                    this.setState({ currentPosition: 0 })
                    return true;
                }
            }
        }
    }

    render() {
        return (
            <View style={styles.container}>

                <Header
                    backButton
                    middleText={'Track Order'} />
                <View style={styles.mainView}>
                    <View style={styles.firstView}>
                        <View style={styles.itemContainer}>
                            <View style={styles.dateOrderNumberView}>
                                <Text style={styles.orderNumber}>{this.state.orderNumber || ""}</Text>
                                <Text style={styles.date}>{this.state.orderDate}</Text>
                            </View>
                            {this.state.totalItems ? <View style={styles.flexDirectionStyle}>
                                <Text style={styles.items}>Items </Text>
                                <Text style={styles.dotStyle}>:</Text>
                                <Text style={[styles.dotStyle, { color: colors.Orange, fontSize: 16, marginLeft: 10, fontFamily: fonts.MuliSemiBold }]}>{this.state.totalItems}</Text>
                            </View> : null}
                            {this.state.orderAmount ? <View style={styles.flexDirectionStyle}>
                                <Text style={styles.items}>Paid</Text>
                                <Text style={styles.dotStyle}>:</Text>
                                <Text style={[styles.dotStyle, { color: colors.Orange, fontSize: 16, marginLeft: 10, fontFamily: fonts.MuliSemiBold }]}>{this.state.orderAmount}</Text>
                            </View> : null}
                        </View>
                    </View>
                    <View style={styles.stepsStyleView}>
                        {this.state.orderTrackPositionDetail && this.state.orderTrackPositionDetail.length ? <StepIndicator
                            customStyles={customStyles}
                            currentPosition={this.state.currentPosition}
                            labels={this.state.orderTrackPositionDetail}
                            direction="vertical"
                            stepCount={4}
                            renderLabel={(position) => {
                                return (
                                    <View>
                                        {position.position == 0 && <Text style={[{}, styles.StepLabelStyle]}>{position.label.label}</Text>}
                                        {position.position == 1 && <Text style={[{}, styles.StepLabelStyle]}>{position.label.label}</Text>}
                                        {position.position == 2 && <Text style={[{}, styles.StepLabelStyle]}>{position.label.label}</Text>}
                                        {position.position == 3 && <Text style={[{}, styles.StepLabelStyle]}>{position.label.label}</Text>}
                                    </View>
                                )
                            }}
                        /> : null}
                    </View>
                </View>
                {/* {this.state.loading ? <Loader /> : null} */}
            </View>
        );
    }


}

export default TrackOrder;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.backgroundColor,
    },
    contentContainerStyle: {
        flexGrow: 1,
    },
    mainView: {
        marginHorizontal: 20,
        marginTop: 20,
        shadowColor: colors.shadow,
        shadowOpacity: 1,
        elevation: 3,
        shadowRadius: 6,
        shadowOffset: {
            height: 2,
            width: -0.79,
        },
        borderRadius: 12,
        backgroundColor: colors.white,
    },
    firstView: {
        marginTop: 30,
        marginHorizontal: 10,
        borderBottomColor: colors.shadowColor,
        borderBottomWidth: 1,
    },
    itemContainer: {
        marginHorizontal: 20,
        paddingVertical: 15,
    },
    flexDirectionStyle: {
        flexDirection: 'row'
    },
    bottomView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 10,
        padding: 10,
        alignItems: 'center'
    },
    orderNumber: {
        color: colors.textColor,
        fontFamily: fonts.MuliBold,
        fontSize: 18
    },
    date: {
        color: colors.placeholderColor,
        fontSize: 12,
        fontFamily: fonts.Muli
    },
    items: {
        paddingTop: 6,
        color: colors.textColor,
        fontFamily: fonts.Muli,
        fontSize: 14,
        width: 50,
    },
    dotStyle: {
        justifyContent: 'flex-end',
        paddingTop: 6,
        color: colors.textColor,
        fontFamily: fonts.Muli,
        fontSize: 14,
    },
    dateOrderNumberView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    stepsStyleView: {
        paddingHorizontal: 20,
        height: constants.screenHeight / 2
    },
    StepLabelStyle: {
        fontSize: 16,
        fontFamily: fonts.Muli,
        color: colors.textColor,
        marginLeft: 10
    }
});
