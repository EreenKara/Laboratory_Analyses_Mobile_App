import React from "react";
import { Button, TouchableOpacity, Dimensions } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { GenelDrawerNavigator } from "mynavigations/drawerNavigator";
import { GenelTabNavigator } from "mynavigations/tabNavigator";

import HomeScreen from "myscreens/Home/index";
import AnalysisScreen from "myscreens/Analysis/index";
import LoginScreen from "myscreens/Login/index";
import RegisterScreen from "myscreens/Register/index";
import ProfileScreen from "myscreens/Profile/index";
import APIScreen from "myscreens/APIDENEME/index";

import Ionicons from "@expo/vector-icons/Ionicons";

import NavBarTitle from "myshared/navbar_title";
import NavBarLeft from "myshared/navbar_left";
import NavBarLang from "myshared/navbar_lang";

const AuthStack = createNativeStackNavigator();
const AuthStackNavigator = () => {
   return (
      <AuthStack.Navigator
         initialRouteName="Login"
         screenOptions={({ navigation }) => ({
            headerShown: false,
            headerTitleAlign: "center",
            headerTitle: () => <NavBarTitle />,
         })}
      >
         <AuthStack.Screen name="Login" component={LoginScreen} />
         <AuthStack.Screen name="Register" component={RegisterScreen} />
      </AuthStack.Navigator>
   );
};

const ProfileStack = createNativeStackNavigator();
const ProfileStackNavigator = () => {
   return (
      <ProfileStack.Navigator
         initialRouteName="Profile"
         screenOptions={({ navigation, route }) => ({
            headerTitleAlign: "center",
            headerShown: true,
            headerTitle: () => <NavBarTitle />,
         })}
      >
         <ProfileStack.Screen name="Profile" component={ProfileScreen} />
      </ProfileStack.Navigator>
   );
};

const AppStack = createNativeStackNavigator();
const AppStackNavigator = () => {
   return (
      <AppStack.Navigator
         initialRouteName="Home"
         screenOptions={({ navigation, route }) => ({
            headerTitleAlign: "center",
            headerTitle: () => <NavBarTitle />,
            headerLeft: () => <NavBarLeft navigation={navigation} />,
            headerRight: () => <NavBarLang />,
         })}
      >
         <AppStack.Screen
            name="Home"
            component={HomeScreen}
            options={() => ({
               title: "Anasayfa",
            })}
         />
         <AppStack.Screen
            name="Analysis"
            component={AnalysisScreen}
            options={() => ({
               title: "Analysis",
            })}
         />
         <AppStack.Screen
            name="APIDeneme"
            component={APIScreen}
            options={() => ({
               title: "API",
            })}
         />
      </AppStack.Navigator>
   );
};

const GenelStack = createNativeStackNavigator();
const GenelStackNavigator = () => {
   return (
      <GenelStack.Navigator
         initialRouteName="Auth"
         screenOptions={({ navigation, route }) => ({
            headerShown: false,
         })}
      >
         <GenelStack.Screen name="App" component={GenelDrawerNavigator} />
         <GenelStack.Screen name="Auth" component={AuthStackNavigator} />
      </GenelStack.Navigator>
   );
};

export {
   GenelStackNavigator,
   AppStackNavigator,
   AuthStackNavigator,
   ProfileStackNavigator,
};
