import { View, Text, Button } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

const FormComponent = () => {
   const navigation = useNavigation();
   return (
      <View>
         <Text>Form Component</Text>
         <Button
            title="Tikla"
            onPress={() =>
               navigation.reset({
                  index: 0,
                  routes: [{ name: "App" }], // Yığını sıfırla ve HomeDrawer'a geç
               })
            }
         />
      </View>
   );
};

export default FormComponent;
