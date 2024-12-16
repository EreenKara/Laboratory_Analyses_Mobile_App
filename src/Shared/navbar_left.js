import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import Icon from "react-native-vector-icons/Ionicons"; // React-native
// import Icon from "@expo/vector-icons/Ionicons";

const NavBarLeft = ({ navigation }) => {
   return (
      <TouchableOpacity onPress={({}) => navigation.toggleDrawer()}>
         <Icon name="menu" size={20} color="black" />
      </TouchableOpacity>
   );
};

export default NavBarLeft;
