/*
  Localizer'ı preparations altında ve login page form içerisinde değiştir.

*/

import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import {
   createStaticNavigation,
   NavigationContainer,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./src/screens/Home";
import LoginScreen from "./src/screens/Login";
import RegisterScreen from "./src/screens/Register";
import { Component } from "react";

const Stack = createNativeStackNavigator();
export default function App() {
   return (
      <NavigationContainer>
         <Stack.Navigator initialRouteName="Login">
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />

            <Stack.Screen
               name="Home"
               component={HomeScreen}
               options={{
                  title: "Anasayfa",
               }}
            />
         </Stack.Navigator>
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
