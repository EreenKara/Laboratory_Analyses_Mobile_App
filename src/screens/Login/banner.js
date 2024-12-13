import { View, Text, Image, StyleSheet } from "react-native";
import React from "react";
const welcome_image = "../../../assets/Login/welcome.jpg";

const BannerComponent = ({ pStyle }) => {
   return (
      <View style={pStyle}>
         <Image style={style.imageStyle} source={require(welcome_image)} />
         <Text>BannerComponent</Text>
      </View>
   );
};

export default BannerComponent;

const style = StyleSheet.create({
   imageStyle: {
      resizeMode: "contain",
      width: 400,
      height: 350,
   },
});
