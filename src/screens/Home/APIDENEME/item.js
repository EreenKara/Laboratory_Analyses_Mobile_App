import { View, Text } from "react-native";
import React from "react";

const ItemComponent = ({ item }) => {
   return (
      <View>
         <Text>{item.id}</Text>
         <Text>{item.name}</Text>
      </View>
   );
};

export default ItemComponent;
