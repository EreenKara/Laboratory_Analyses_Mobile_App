import React, { useState } from "react";
import {
   Image,
   StyleSheet,
   TouchableOpacity,
   View,
   FlatList,
   Text,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
// import Icon from "@expo/vector-icons/Ionicons";

const NavBarLang = () => {
   const [language, setLanguage] = useState("tr");
   const [isOpen, setIsOpen] = useState(false);
   const languages = ["tr", "en"];
   const toggleDropdown = () => {
      setIsOpen(!isOpen);
      console.log(isOpen);
   };
   const selectLanguage = (language) => {
      setLanguage(language); // Seçilen dili kaydet
      setIsOpen(false); // Dropdown'u kapat
   };
   let iconName = "language-outline";
   return (
      <View style={style.container}>
         <TouchableOpacity onPress={toggleDropdown}>
            <Icon name={iconName} size={30} color="#000" />
         </TouchableOpacity>
         {isOpen && (
            <View style={style.dropdown}>
               <FlatList
                  data={languages}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={({ item }) => (
                     <TouchableOpacity
                        style={style.dropdownItem}
                        onPress={() => selectLanguage(item)}
                     >
                        <Text style={style.dropdownItemText}>{item}</Text>
                     </TouchableOpacity>
                  )}
               />
            </View>
         )}
      </View>
   );
};

const style = StyleSheet.create({
   container: {
      zIndex: 1, // Navbar'ın zIndex değeri
      overflow: "visible",
   },
   imagestyle: {
      height: 40,
      width: 40,
      resizeMode: "contain",
   },
   dropdownButton: {
      padding: 10,
      backgroundColor: "#fff",
      borderRadius: 5,
   },
   dropdownButtonText: {
      fontSize: 16,
      color: "#333",
   },
   dropdown: {
      backgroundColor: "black",
      position: "absolute",
      top: 20,
      right: 20,
      width: 150,
      height: 100,
      borderRadius: 5,
      shadowColor: "#000",
      shadowOpacity: 0.1,
      shadowRadius: 5,
      elevation: 5, // Android gölgesi
      zIndex: 2, // dropdown'ın zIndex değeri
   },
   dropdownItem: {
      padding: 10,
      borderBottomWidth: 1,
      borderBottomColor: "#ccc",
   },
   dropdownItemText: {
      fontSize: 16,
      color: "#333",
   },
});

export default NavBarLang;
