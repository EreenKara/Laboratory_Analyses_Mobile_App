import { Button } from "@react-navigation/elements";
import * as React from "react";
import { View, Text, StyleSheet } from "react-native";

function AnalysisScreen({ navigation }) {
   return (
      <View>
         <Text>Analysiss Page'e HosGeldiniz.</Text>
         <Button title="Tikla" onPress={() => navigation.navigate("Home")} />
      </View>
   );
}

export default AnalysisScreen;

const styles = StyleSheet.create({
   view_style: {
      backgroundColor: "black",
      flex: 1,
   },
});
