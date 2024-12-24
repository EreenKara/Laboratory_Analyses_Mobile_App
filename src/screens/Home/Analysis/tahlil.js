import { FlatList, StyleSheet, Text, View } from "react-native";
import React from "react";

const TahlilComponent = () => {
   const renderItem = ({ item }) => {
      const isOutOfRange =
         item.value < item.referenceRange.min ||
         item.value > item.referenceRange.max;

      return (
         <View style={styles.resultContainer}>
            <Text style={styles.testName}>{item.testName}</Text>
            <Text
               style={[
                  styles.resultValue,
                  isOutOfRange && styles.outOfRangeValue,
               ]}
            >
               {item.value} {item.unit}
            </Text>
            <Text style={styles.referenceRange}>
               Referans Aralığı: {item.referenceRange.min} -{" "}
               {item.referenceRange.max} {item.unit}
            </Text>
         </View>
      );
   };

   return (
      <View style={styles.container}>
         <Text style={styles.header}>Tahlil Sonuçları</Text>
         <FlatList
            data={results}
            keyExtractor={(item, index) => index.toString()}
            renderItem={renderItem}
         />
      </View>
   );
   return (
      <View style={styles.tahlil}>
         <View style={styles.tahlilHeader}>
            <Text>TahlilHeader</Text>
         </View>
         <View style={styles.tahlilElement}>
            <Text>Tahlil her bir elemnt</Text>
         </View>
      </View>
   );
};

export default TahlilComponent;

const styles = StyleSheet.create({
   container: {
      flex: 1,
      padding: 20,
      backgroundColor: "#f7f7f7",
   },
   header: {
      fontSize: 22,
      fontWeight: "bold",
      marginBottom: 10,
      textAlign: "center",
      color: "#4b0082",
   },
   resultContainer: {
      backgroundColor: "#ffffff",
      padding: 15,
      borderRadius: 8,
      marginBottom: 10,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 4,
      elevation: 3,
   },
   testName: {
      fontSize: 18,
      fontWeight: "bold",
      color: "#333",
   },
   resultValue: {
      fontSize: 16,
      fontWeight: "600",
      color: "#008000",
   },
   outOfRangeValue: {
      color: "#ff0000",
   },
   referenceRange: {
      fontSize: 14,
      color: "#555",
      marginTop: 5,
   },
   tahlil: {
      backgroundColor: "red",
   },
   tahlilHeader: {},
   tahlilElement: {},
});
