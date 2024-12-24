import {
   View,
   Text,
   StyleSheet,
   TouchableOpacity,
   Dimensions,
} from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import styles from "myutility/styles";

const BoxComponent = ({ color, name, toNavigate }) => {
   const navigation = useNavigation();
   return (
      <TouchableOpacity
         onPress={toNavigate}
         style={[
            { backgroundColor: color, borderRightWidth: 2 },
            style.container,
         ]}
      >
         <Text style={styles.text.plain}>{name}</Text>
      </TouchableOpacity>
   );
};

const style = StyleSheet.create({
   container: {
      borderColor: "black",
      borderWidth: 2,
      width: Dimensions.get("window").width / 2,
      height: Dimensions.get("window").width / 2 - 20,
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
   },
   innerBox: {},
});

export default BoxComponent;
