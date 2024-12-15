import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import React from "react";

const LoadingComponent = () => {
   return (
      <View style={style.container}>
         <ActivityIndicator size="large" color="#0000ff" />
         <Text>Şuan burada bir tane Loading animasyonu olacak</Text>
      </View>
   );
};

const style = StyleSheet.create({
   container: {
      textTransform: "uppercase",
   },
});

export default LoadingComponent;
