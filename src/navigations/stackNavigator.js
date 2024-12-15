import React from "react";
import { Button, TouchableOpacity, Dimensions } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { GenelDrawerNavigator } from "navigations/drawerNavigator";
import { GenelTabNavigator } from "navigations/tabNavigator";

import HomeScreen from "screens/Home/index";
import AnalysisScreen from "screens/Analysis/index";
import LoginScreen from "screens/Login/index";
import RegisterScreen from "screens/Register/index";
import ProfileScreen from "screens/Profile/index";
import Ionicons from "@expo/vector-icons/Ionicons";

import NavBarTitle from "shared/navbar_title";

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
            headerLeft: () => (
               <TouchableOpacity onPress={({}) => navigation.toggleDrawer()}>
                  <Ionicons name="menu" size={20} color="black" />
               </TouchableOpacity>
            ),
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
