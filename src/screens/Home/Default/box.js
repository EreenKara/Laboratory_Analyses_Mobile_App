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

const BoxComponent = ({ order, color, name, toNavigate }) => {
   const navigation = useNavigation();
   const bWidth = (order %= 2 == 0 ? 1 : 2);
   return (
      <TouchableOpacity
         onPress={toNavigate}
         style={[
            { backgroundColor: color, borderRightWidth: bWidth },
            style.container,
         ]}
      >
         <Text style={styles.text.plain}>Bu bir {name} box'tur</Text>
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
