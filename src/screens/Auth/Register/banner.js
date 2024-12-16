import { View, Text, Image, StyleSheet, Dimensions } from "react-native";
import React from "react";
import welcome_image from "myassets/screens/Auth/Login/welcome.jpg";
import hosgeldiniz_image from "myassets/screens/Auth/Login/hosgeldiniz.jpg";

const BannerComponent = () => {
   return (
      <View syle={style.viewstyle}>
         <Image style={style.imageStyle} source={hosgeldiniz_image} />
      </View>
   );
};

export default BannerComponent;

const style = StyleSheet.create({
   viewstyle: {
      alignItems: "center",
      justifyContent: "center",
      flex: 1,
   },
   imageStyle: {
      flex: 1,
      top: 50,
      width: Dimensions.get("window").width,
      resizeMode: "contain",
   },
});
