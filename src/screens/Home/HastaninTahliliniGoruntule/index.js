import { ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import PerAnalysisComponet from "./per_analysis";

const HastaninTahlininiGoruntuleScreen = () => {
   const data = [
      { id: 1, title: "Item 1", content: "This is the content for item 1." },
      { id: 2, title: "Item 2", content: "This is the content for item 2." },
      { id: 3, title: "Item 3", content: "This is the content for item 3." },
   ];
   return (
      <View style={styles.container}>
         <View style={styles.hastaBilgileri}>
            <View>
               <Text style={styles.header}>Hasta Bilgileri</Text>
            </View>
            <View
               style={{
                  backgroundColor: "#f0f0f0",
                  borderRadius: 5,
                  padding: 10,
                  marginTop: 10,
                  flex: 1,
               }}
            >
               <Text style={styles.content}>Hasta Adı: Ali</Text>
               <Text style={styles.content}>Hasta Soyadı: Veli</Text>
            </View>
         </View>
         <ScrollView>
            {data.map((item) => (
               <PerAnalysisComponet
                  key={item.id}
                  title={item.title}
                  content={item.content}
               />
            ))}
         </ScrollView>
      </View>
   );
};

export default HastaninTahlininiGoruntuleScreen;

const styles = StyleSheet.create({
   container: {
      padding: 10,
   },
   componentContainer: {
      marginBottom: 10,
      backgroundColor: "#f0f0f0",
      borderRadius: 5,
      overflow: "hidden",
   },
   header: {
      padding: 15,
      backgroundColor: "#6200ee",
   },
   title: {
      color: "#fff",
      fontSize: 16,
   },
   content: {
      fontSize: 14,
      color: "#333",
   },
   hastaBilgileri: {
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
   },
   header: {
      color: "#fff",
      fontSize: 18,
      textAlign: "center",
   },
});
