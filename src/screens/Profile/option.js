import {
   View,
   Text,
   TouchableOpacity,
   StyleSheet,
   Dimensions,
} from "react-native";
import React from "react";

import Ionicons from "react-native-vector-icons/Ionicons";

let height = Dimensions.get("window").height / 15;

const OptionComponent = () => {
   return (
      <View>
         <TouchableOpacity style={style.button}>
            <Text style={style.text}>Selam</Text>
            <Ionicons
               style={style.icon}
               name="chevron-forward-outline"
               size={30}
               color="black"
            />
         </TouchableOpacity>
      </View>
   );
};

const style = StyleSheet.create({
   button: {
      backgroundColor: "#E8E3D6",
      height: height,
      flexDirection: "row",
   },
   text: {
      flex: 0.8,
      marginLeft: 10,
      textAlign: "left",
      textAlignVertical: "center",
      fontSize: 20,
   },
   icon: {
      flex: 0.2,
      marginRight: 10,
      textAlign: "right",
      textAlignVertical: "center",
   },
});

export default OptionComponent;
