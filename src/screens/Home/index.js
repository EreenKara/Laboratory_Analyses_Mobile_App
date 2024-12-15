import { Button } from "@react-navigation/elements";
import * as React from "react";
import { View, Text, StyleSheet } from "react-native";
import BoxList from "./box_list";

function HomeScreen({ navigation }) {
   return (
      <View>
         <BoxList />
         <Button
            title="Tikla"
            onPress={() => navigation.navigate("Analysis")}
         />
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
