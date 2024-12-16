import { SafeAreaView, View, Text } from "react-native";
import React, { useState } from "react";
import YetkiliComponent from "./yetkili";
import OptionComponent from "./option";

const ProfileScreen = () => {
   return (
      <SafeAreaView>
         <Text>Profile ekrani</Text>
         <OptionComponent />
      </SafeAreaView>
   );
};

export default ProfileScreen;
