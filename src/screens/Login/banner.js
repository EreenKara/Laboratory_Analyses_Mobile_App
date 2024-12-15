import { View, Text, Image, StyleSheet, Dimensions } from "react-native";
import React from "react";
import welcome_image from "assets/Login/welcome.jpg";

// bu değişecek türkçe inglizce AYRICA BUNU SUAN E_NABIZ UYGULAMASI İÇİN YPATIM KOALYCA ENTEGRE AETCEM BİZİMKİNE
// SAMEDDEN MOBİLİ BEKLİYORUM
//
// BU BPROFİL EKTARNINDA Kullanıcalar sadece kendierine verilmiş roldekileri görcek
// yetkililer de izinli oldukalrını görcek yani şöyle
const BannerComponent = () => {
   return (
      <View syle={style.viewstyle}>
         <Image style={style.imageStyle} source={welcome_image} />
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
      width: Dimensions.get("window").width,
      resizeMode: "contain",
   },
});
