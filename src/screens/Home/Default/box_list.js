import { View, Text, StyleSheet } from "react-native";
import React from "react";
import BoxComponent from "./box";
import { useNavigation } from "@react-navigation/native";

const BoxList = () => {
   // JSX dışında bir dizi oluştur
   const navigation = useNavigation();
   const boxes = [];
   const names = ["Analysis", "Home", "APIDeneme", "Deneme"];
   for (let index = 0; index < names.length; index++) {
      boxes.push(
         <BoxComponent
            key={index}
            order={index}
            name={names.at(index)}
            color="red"
            toNavigate={() => navigation.navigate(names.at(index))}
         />
      );
   }
   return <View style={styles.container}>{boxes}</View>;
};

const styles = StyleSheet.create({
   container: {
      flexDirection: "row",
      flexWrap: "wrap",
   },
});

export default BoxList;
