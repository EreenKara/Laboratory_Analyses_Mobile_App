import { StyleSheet, Text, View } from "react-native";
import React from "react";

const backgroundColor1 = "#f0f0f0";
const backgroundColor2 = "#f0f0f0";

const AnalysisElementsComponent = () => {
   return (
      <View style={styles.container}>
         <View style={styles.headers}>
            <Text
               style={[styles.perColumn, { backgroundColor: backgroundColor1 }]}
            >
               {" "}
               Tetkik Adı
            </Text>
            <Text style={styles.perColumn}> Sonuc</Text>
            <Text style={styles.perColumn}> Referans Aralığı</Text>
            <Text style={[styles.perColumn, { width: "40%" }]}>
               Onceki Sonuclar
            </Text>
         </View>
      </View>
   );
};

export default AnalysisElementsComponent;

const styles = StyleSheet.create({
   container: {
      flexDirection: "row",
      flexWrap: "wrap",
   },
   headers: {
      flexDirection: "row",
      flexWrap: "wrap",
      backgroundColor: "#f0f0f0",
   },
   perColumn: {
      width: "20%",
      textAlign: "center",
   },
});
