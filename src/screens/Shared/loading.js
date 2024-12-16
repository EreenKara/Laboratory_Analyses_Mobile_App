import {
   SafeAreaView,
   View,
   Text,
   StyleSheet,
   ActivityIndicator,
} from "react-native";
import React from "react";

const LoadingComponent = () => {
   return (
      <View style={style.container}>
         <ActivityIndicator size="large" color="#0000ff" />
         <Text style={style.text}>
            Dönen şey ile ilgili iyileştirmeler yapilabilir.
         </Text>
      </View>
   );
};

const style = StyleSheet.create({
   container: {
      flex: 1,
      textTransform: "uppercase",
      justifyContent: "center",
      alignItems: "center",
   },
   text: {
      textAlign: "center",
   },
});

export default LoadingComponent;
