import { Button } from "@react-navigation/elements";
import * as React from "react";
import { View, Text, StyleSheet } from "react-native";

function HomeScreen({ navigation }) {
  return (
    <View>
      <Text>Home Page'e HosGeldiniz.</Text>
    </View>
  );
}

export default HomeScreen;

const styles = StyleSheet.create({
  view_style: {
    backgroundColor: "black",
    flex: 1,
  },
});
