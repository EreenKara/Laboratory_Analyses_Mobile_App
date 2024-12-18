import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { FlatList } from "react-native-gesture-handler";
import * as SQLite from "expo-sqlite";
const DenemeScreen = () => {
   const [isOpen, setIsOpen] = useState(false); // Dropdown'un açık/kapalı durumu
   const [selectedLanguage, setSelectedLanguage] = useState("Türkçe"); // Varsayılan dil

   const languages = ["Türkçe", "English", "Español", "Deutsch", "Français"];

   const toggleDropdown = () => setIsOpen(!isOpen);

   const selectLanguage = (language) => {
      setSelectedLanguage(language); // Seçilen dili kaydet
      setIsOpen(false); // Dropdown'u kapat
   };
   const firstRow = SQLite.openDatabaseSync("mydatabase.db").getFirstSync(
      "SELECT * FROM users"
   );

   return (
      <View style={styles.container}>
         {/* Navbar */}
         <View style={styles.navbar}>
            <Text style={styles.navTitle}>Dil Seçimi</Text>
            <TouchableOpacity
               onPress={toggleDropdown}
               style={styles.dropdownButton}
            >
               <Text style={styles.dropdownButtonText}>{selectedLanguage}</Text>
            </TouchableOpacity>
         </View>

         {/* Dropdown Panel */}
         {isOpen && (
            <View style={styles.dropdown}>
               <FlatList
                  data={languages}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={({ item }) => (
                     <TouchableOpacity
                        style={styles.dropdownItem}
                        onPress={() => selectLanguage(item)}
                     >
                        <Text style={styles.dropdownItemText}>{item}</Text>
                     </TouchableOpacity>
                  )}
               />
            </View>
         )}
         <Text>{JSON.stringify(firstRow, null, 2)}</Text>
      </View>
   );
};

export default DenemeScreen;
const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: "#8f8f8",
   },
   navbar: {
      height: 60,
      backgroundColor: "#6200ee",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingHorizontal: 15,
   },
   navTitle: {
      color: "#fff",
      fontSize: 18,
      fontWeight: "bold",
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
      backgroundColor: "#fff",
      position: "absolute",
      top: 60, // Navbar'ın altına yerleştir
      right: 15,
      width: 150,
      borderRadius: 5,
      shadowColor: "#000",
      shadowOpacity: 0.1,
      shadowRadius: 5,
      elevation: 5, // Android gölgesi
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
