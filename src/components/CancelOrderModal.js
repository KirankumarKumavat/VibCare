import React, { Component } from 'react';
import { View, Text, StyleSheet, Modal, TouchableHighlight, FlatList, TouchableOpacity, Platform, InputAccessoryView, Button, Keyboard, TouchableNativeFeedback, Image } from 'react-native';
import { colors, constants, staticText } from '../config';
import fonts from '../assets/index';
import { isIphoneX, showSimpleAlert } from '../utilities';
import { Input } from '.';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import CustomButton from './Button';
import Images from '../assets/images';
import { Colors } from 'react-native/Libraries/NewAppScreen';

class CancelOrderModal extends Component {
   constructor(props) {
      super(props);
      this.state = {
         message: ""
      };
   }

   render() {
      const inputAccessoryViewID = "doneBtn";
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
                  onPress={this.props.onRequestClose}
                  style={styles.outerViewModalStyle}
               >
                  <KeyboardAwareScrollView
                     bounces={false}
                     showsVerticalScrollIndicator={false}
                     contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}
                  >
                     <View style={styles.modal}>
                        <TouchableOpacity activeOpacity={1} onPress={() => null}>
                           <TouchableOpacity style={{ alignSelf: "flex-end", right: 20 }} onPress={this.props.onRequestClose}>
                              <Image style={{ height: 20, width: 20, tintColor: colors.Orange }} source={Images.closeIcon} />
                           </TouchableOpacity>
                           <Text style={styles.title}>{"Reason for cancel order"}</Text>
                           <Input
                              multiline
                              style={{ height: 200, }}
                              placeholder={'Enter your reason here..'}
                              inputRef={(input) => { this.title = input; }}
                              mainStyle={{ height: 210, alignItems: 'flex-start', }}
                              value={this.state.message}
                              onChangeText={(message) => this.setState({ message })}
                              blurOnSubmit={false}
                              inputAccessoryViewID={inputAccessoryViewID}
                           />
                           {
                              Platform.OS === "ios" &&
                              <InputAccessoryView nativeID={inputAccessoryViewID}>
                                 <View style={styles.inputAccessory}>
                                    <Button onPress={Keyboard.dismiss} title={"Done"} />
                                 </View>
                              </InputAccessoryView>
                           }
                           <CustomButton
                              title={staticText.Submit}
                              onPress={this.onPressSubmit}
                           />
                        </TouchableOpacity>
                     </View>
                  </KeyboardAwareScrollView>
               </TouchableHighlight>
            </Modal>
         </View>
      );
   }
   onPressSubmit = () => {
      if (this.state.message.trim() == "") {
         showSimpleAlert("Please write the something reason for cancel order request.")
      }
      else {
         this.props.onPressSubmit(this.state.message.trim())
      }
   }
}

export default CancelOrderModal;

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
      backgroundColor: colors.backgroundColor,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      paddingBottom: isIphoneX() ? 30 : 10,
      borderRadius: 20,
      paddingVertical: 30,
      marginHorizontal: 15
   },
   itemDivider: {
      backgroundColor: colors.modalSeparatorItem,
      height: 1
   },
   outerViewModalStyle: {
      flex: 1,
      backgroundColor: colors.modalBackground,
      justifyContent: 'center',

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
   inputAccessory: {
      backgroundColor: colors.inputAccessoryBg,
      alignItems: "flex-end",
      paddingHorizontal: 5,
      height: 35,
   },
   title: {
      fontSize: 20,
      fontFamily: fonts.MuliBold,
      color: colors.Orange,
      margin: 10,
      alignSelf: "center"
   }
})                       