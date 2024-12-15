/*
  Localizer'ı preparations altında ve login page form içerisinde değiştir.

  Form işlemlerini yapıp kullanıcıdan bilgi alıcam

  Fetch ile api istekleri alıcam

  sql lite bakıcam.
*/
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";

import { GenelTabNavigator } from "navigations/tabNavigator";
import { GenelDrawerNavigator } from "navigations/drawerNavigator";
import { GenelStackNavigator } from "navigations/stackNavigator";

export default function App() {
   return (
      <NavigationContainer>
         <GenelStackNavigator />
      </NavigationContainer>
   );
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: "#fff",
      alignItems: "center",
      justifyContent: "center",
   },
});
