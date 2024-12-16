import {
   SafeAreaView,
   StyleSheet,
   Text,
   View,
   Button,
   TextInput,
} from "react-native";
import React from "react";
import BannerComponent from "./banner.js";
import FormComponent from "./form.js";
import FooterComponent from "./footer.js";

const RegisterScreen = ({ navigation }) => {
   return (
      <SafeAreaView style={style.container}>
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

const style = StyleSheet.create({
   container: {
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
      flex: 2,
   },
   form: {
      flex: 4,
   },
   footer: { flex: 1 },
});

export default RegisterScreen;
