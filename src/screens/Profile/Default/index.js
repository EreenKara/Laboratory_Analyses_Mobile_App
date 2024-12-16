import { SafeAreaView, View, Text, StyleSheet } from "react-native";
import React, { useState } from "react";
import YetkiliComponent from "./yetkili";
import OptionComponent from "./option";

const ProfileScreen = ({ navigation }) => {
   return (
      <SafeAreaView>
         <View style={style.option}>
            <OptionComponent
               text={"Kullanici Ayarlari"}
               iconName={"settings-sharp"}
               navigate={() => {
                  navigation.navigate("Settings");
               }}
            />
         </View>
         <View style={style.option}>
            <OptionComponent navigation={navigation} />
         </View>
         <View style={style.option}>
            <OptionComponent navigation={navigation} />
         </View>
      </SafeAreaView>
   );
};

const style = StyleSheet.create({
   option: {
      marginBottom: 10,
   },
});

export default ProfileScreen;
