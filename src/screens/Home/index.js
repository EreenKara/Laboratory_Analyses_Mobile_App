import { Button } from "@react-navigation/elements";
import * as React from "react";
import { View, Text, StyleSheet } from "react-native";
import BoxList from "./box_list";
import { SECRET_KEY } from "@env";

function HomeScreen({ navigation }) {
   return (
      <View>
         <BoxList />
         <Text>.env deneme Secret Key: {SECRET_KEY}</Text>
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
