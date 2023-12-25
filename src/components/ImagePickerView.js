import React, { useState } from 'react';
import ImagePicker from 'react-native-image-crop-picker';
import { colors, staticText, constants } from '../config';
import { StyleSheet, View, Text, TouchableWithoutFeedback, Modal, Image } from 'react-native';
import fonts from '../assets/index';
import Images from '../assets/images'

export default function ImagePickerView(props) {
   const [Uri, setUri] = useState('');
   const chooseImage = () => {
      console.log('callledggggg');
      ImagePicker.openPicker({
         width: 300,
         height: 400,
         cropping: true,
      })
         .then(image => {
            setUri(image.path);
            console.log('imageimage', image);
            props.CloseModal
            props.onGetURI?.(image);
         })
   };

   const openCamera = () => {
      console.log('callled');
      ImagePicker.openCamera({
         width: 300,
         height: 400,
         cropping: true,
      })
         .then(image => {
            setUri(image);
            props.CloseModal
            props.onGetURI?.(image);
         })

   };
   return (
      <Modal
         animationType={'slide'}
         animated={true}
         visible={props.visible != null ? props.visible : false}
         transparent={props.transparent != null ? props.transparent : false}
         onRequestClose={() => props.CloseModal}
      >
         <TouchableWithoutFeedback onPress={props.CloseModal}>
            <View style={[styles.styles, props.style]}>
               <TouchableWithoutFeedback onPress={null}>

                  <View style={[styles.containerstyle, props.containerstyle]} >
                     {/* {
                  props.components
               } */}
                     <View style={[{ height: '50%', flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center', width: '100%', backgroundColor: colors.backgroundColor, borderRadius: 10 }, props.galleryStyle]}>
                        <TouchableWithoutFeedback onPress={chooseImage} >
                           <View style={[styles.InnerBoxStyle, props.galleryStyle]}>
                              <Image source={Images.imageicon} ></Image>
                              <Text style={[{ marginTop: 14, fontSize: 14, fontFamily: fonts.Helvetica, color: colors.placeholderColor }, props.galleryText]}>{staticText.openGallery}</Text>
                           </View>
                        </TouchableWithoutFeedback>

                        <TouchableWithoutFeedback onPress={openCamera}>
                           <View style={[styles.InnerBoxStyle, props.cameraStyle]}>
                              <Image source={Images.cameraicon} ></Image>
                              <Text style={[{ marginTop: 14, fontSize: 14, fontFamily: fonts.Helvetica, color: colors.placeholderColor }, props.cameraText]}>{staticText.openCamera}</Text>
                           </View>
                        </TouchableWithoutFeedback>

                     </View>
                     {/* <TouchableWithoutFeedback onPress={props.CloseModal}>
                        <View style={[{
                           width: '100%', marginTop: 10, alignItems: 'center', justifyContent: 'center', backgroundColor: 'white', height: 48, borderRadius: 10,
                        }, props.cameraStyle]}>
                           <Text style={[{ fontSize: 16, fontFamily: fonts.Muli, color: colors.black }, props.cancelText]}>{staticText.Cancel}</Text>
                        </View>
                     </TouchableWithoutFeedback> */}
                  </View>
               </TouchableWithoutFeedback>
            </View>
         </TouchableWithoutFeedback>

      </Modal>

   );
}
const styles = StyleSheet.create({
   styles: {
      flex: 1,
      justifyContent: 'flex-end',
      alignItems: 'center',
      backgroundColor: colors.transparent,
   },
   containerstyle: {
      alignItems: 'center',
      justifyContent: 'flex-end',
      width: constants.screenWidth,
      borderRadius: 20,
      // height:constants.screenHeight,
      // backgroundColor:colors.white
      // height: '45%'      
      // width: constants.screenWidth - 30
   },
   InnerBoxStyle: {
      justifyContent: 'center',
      alignItems: 'center',
      height: 120,
      width: 154,
      //   paddingHorizontal: 10,
      //   paddingLeft: 17,
      //   marginBottom: 16,
      borderRadius: 6,
      backgroundColor: colors.white,
      borderWidth: 1,
      borderColor: colors.white,
      // marginHorizontal: 28,

      shadowColor: colors.shadowColor,
      shadowOpacity: 1,
      elevation: 3,
      shadowRadius: 6,
      shadowOffset: {
         height: 2,
         width: -0.79,
      },
   }
});



