import * as React from "react";
import { View, Text, StyleSheet } from "react-native";

function DenemeScreen() {
  return (
    <View>
      <Text>Home Page'e HosGeldiniz.</Text>
    </View>
  );
}

export default DenemeScreen;

const styles = StyleSheet.create({
  view_style: {
    backgroundColor: "black",
    flex: 1,
  },
});
