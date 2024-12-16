import { Image, StyleSheet, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
// import Icon from "@expo/vector-icons/Ionicons";

const NavBarLang = () => {
   let language = "tr";

   let iconName = language === "tr" ? "ios-home" : "md-home";
   iconName = "language-outline";
   return (
      <TouchableOpacity>
         <Icon name={iconName} size={30} color="#000" />
      </TouchableOpacity>
   );
};

const style = StyleSheet.create({
   imagestyle: {
      height: 40,
      width: 40,
      resizeMode: "contain",
   },
});

export default NavBarLang;
