import React, { useState, useRef } from "react";
import {
   Animated,
   TouchableOpacity,
   Text,
   View,
   StyleSheet,
   ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import AnalysisElementsComponent from "./analysis_element_comp";
const PerAnalysisComponet = () => {
   const [isExpanded, setIsExpanded] = useState(false);
   const animationValue = useRef(new Animated.Value(0)).current;

   const toggleExpand = () => {
      setIsExpanded(!isExpanded);
      Animated.timing(animationValue, {
         toValue: isExpanded ? 0 : 1, // Açıkken 1, kapalıyken 0
         duration: 300, // Animasyon süresi (ms)
         useNativeDriver: false,
      }).start();
   };

   const heightInterpolation = animationValue.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 300], // Kapalı halde 0, açık halde 100 piksel
   });
   return (
      <ScrollView style={styles.container}>
         {/* Tıklanabilir Başlık */}
         <TouchableOpacity onPress={toggleExpand} style={styles.compNavBar}>
            <View>
               <Text style={styles.headerText}>
                  {isExpanded ? "Close" : "Expand"}
               </Text>
            </View>
            <View>
               <Ionicons name="chevron-down-outline" size={24} color="black" />
            </View>
         </TouchableOpacity>

         {/* Genişleyen İçerik */}
         <Animated.View
            style={[styles.content, { height: heightInterpolation }]}
         >
            <AnalysisElementsComponent />
         </Animated.View>
      </ScrollView>
   );
};

export default PerAnalysisComponet;

const styles = StyleSheet.create({
   container: {
      margin: 10,
      borderWidth: 1,
      borderColor: "#ccc",
      borderRadius: 8,
      overflow: "hidden",
   },
   compNavBar: {
      flexDirection: "row",
      justifyContent: "space-evenly",
      backgroundColor: "#9AA6B2",
      padding: 10,
   },
   headerText: {
      color: "#fff",
      fontSize: 16,
      textAlign: "center",
      width: "%80",
      flex: 1,
   },
   content: {
      backgroundColor: "#f9f9f9",
      overflow: "hidden",
   },
   contentText: {
      padding: 10,
      fontSize: 14,
      color: "#333",
   },
});
