import {
   View,
   Text,
   TouchableOpacity,
   StyleSheet,
   Dimensions,
} from "react-native";
import React from "react";
import styles from "myutility/styles";

import Ionicons from "react-native-vector-icons/Ionicons";

const height = Dimensions.get("window").height / 15;

const OptionComponent = ({ text, navigate, iconName }) => {
   return (
      <View>
         <TouchableOpacity
            style={style.button}
            onPress={() => {
               navigate();
            }}
         >
            <Ionicons
               style={style.icon}
               name={iconName}
               size={25}
               color="#F5EFE7"
            />
            <Text style={style.text}>{text}</Text>
            <Ionicons
               style={style.rightArrow}
               name="chevron-forward-outline"
               size={25}
               color="#F5EFE7"
            />
         </TouchableOpacity>
      </View>
   );
};

const style = StyleSheet.create({
   button: {
      backgroundColor: "#3E5879",
      height: height,
      flexDirection: "row",
   },
   text: {
      ...styles.text.plain,
      flex: 0.8,
      marginLeft: 10,
      textAlign: "left",
      textAlignVertical: "center",
      color: "#F5EFE7",
   },
   icon: {
      flex: 0.1,
      marginLeft: 10,
      textAlign: "left",
      textAlignVertical: "center",
   },
   rightArrow: {
      flex: 0.1,
      marginRight: 10,
      textAlign: "right",
      textAlignVertical: "center",
   },
});

export default OptionComponent;
