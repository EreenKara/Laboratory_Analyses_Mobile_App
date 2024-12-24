import { Button } from "@react-navigation/elements";
import * as React from "react";
import { View, Text, StyleSheet } from "react-native";
import TahlilComponent from "./tahlil";

function AnalysisScreen({ navigation }) {
   return (
      <View style={styles.container}>
         <Text>Analysis</Text>
         <View style={styles.tahliller}>{/* <TahlilComponent /> */}</View>
      </View>
   );
}

export default AnalysisScreen;

const styles = StyleSheet.create({
   container: {
      flex: 1,
   },
   tahliller: {
      flex: 1,
      flexDirection: "column",
      alignItems: "center",
   },
});
