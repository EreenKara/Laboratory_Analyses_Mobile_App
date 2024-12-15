import { View, Text, StyleSheet, Button, SafeAreaView } from "react-native";
import React from "react";
import BannerComponent from "./banner.js";
import FormComponent from "./form.js";
import FooterComponent from "./footer.js";

const LoginScreen = ({ navigation }) => {
   return (
      <SafeAreaView style={style.outerBox}>
         <View style={style.innerbox}>
            <View style={style.banner}>
               <BannerComponent />
            </View>
            <View style={style.form}>
               <FormComponent />
            </View>
            <View style={style.footer}>
               <FooterComponent />
            </View>
         </View>
      </SafeAreaView>
   );
};

export default LoginScreen;

const style = StyleSheet.create({
   outerBox: {
      flex: 1,
      justifyContent: "center",
      backgroundColor: "white",
   },
   innerbox: {
      flex: 1,
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
   },
   banner: {
      flex: 3,
   },
   form: {
      flex: 2,
   },
   footer: { flex: 1 },
});
