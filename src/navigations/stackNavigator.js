import React from "react";
import { Button, TouchableOpacity, Dimensions } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { GenelDrawerNavigator } from "mynavigations/drawerNavigator";
import { GenelTabNavigator } from "mynavigations/tabNavigator";

import HomeScreen from "myscreens/Home/Default/index";
import AnalysisScreen from "myscreens/Home/Analysis/index";
import LoginScreen from "myscreens/Auth/Login/index";
import RegisterScreen from "myscreens/Auth/Register/index";
import ProfileScreen from "myscreens/Profile/Default/index";

import Ionicons from "@expo/vector-icons/Ionicons";

import NavBarTitle from "myshared/navbar_title";
import NavBarLeft from "myshared/navbar_left";
import NavBarLang from "myshared/navbar_lang";
import KlavuzGirScreen from "myscreens/Home/KlavuzGir/index";
import KlavuzlardaAraScreen from "myscreens/Home/KlavuzlardaAra/index";
import KlavuzSonucuScreen from "myscreens/Home/KlavuzlardaAra/KlavuzSonucu";
import HastaninTahliliniGoruntuleScreen from "myscreens/Home/HastaninTahliliniGoruntule/index";
import TahlilSonucuGirScreen from "myscreens/Home/TahlilSonucuGir";
import UserDataScreen from "myscreens/Auth/UserData/index";
import RoleScreen from "myscreens/Home/Roles/index";

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
         <AuthStack.Screen name="UserData" component={UserDataScreen} />
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

const HomeStack = createNativeStackNavigator();
const HomeStackNavigator = () => {
   return (
      <HomeStack.Navigator
         initialRouteName="Home"
         screenOptions={({ navigation, route }) => ({
            headerStyle: {
               backgroundColor: "#FBF6E9",
            },
            headerTitleAlign: "center",
            headerTitle: () => <NavBarTitle />,
            headerLeft: () => <NavBarLeft navigation={navigation} />,
            headerRight: () => <NavBarLang />,
         })}
      >
         <HomeStack.Screen
            name="Home"
            component={HomeScreen}
            options={() => ({
               title: "Anasayfa",
            })}
         />
         <HomeStack.Screen
            name="Analysis"
            component={AnalysisScreen}
            options={() => ({
               title: "Analysis",
            })}
         />

         <HomeStack.Screen
            name="TahlilSonucuGir"
            component={TahlilSonucuGirScreen}
            options={() => ({
               title: "TahlilSonucuGir",
            })}
         />
         <HomeStack.Screen
            name="KlavuzGir"
            component={KlavuzGirScreen}
            options={() => ({
               title: "KlavuzGir",
            })}
         />
         <HomeStack.Screen
            name="RoleDegistir"
            component={RoleScreen}
            options={() => ({
               title: "RoleDegistir",
            })}
         />
         <HomeStack.Screen
            name="KlavuzlardaAra"
            component={KlavuzlardaAraScreen}
            options={() => ({
               title: "KlavuzlardaAra",
            })}
         />
         <HomeStack.Screen
            name="KlavuzSonucuScreen"
            component={KlavuzSonucuScreen}
            options={() => ({
               title: "KlavuzSonucuScreen",
            })}
         />
         <HomeStack.Screen
            name="HastaninTahliliniGoruntule"
            component={HastaninTahliliniGoruntuleScreen}
            options={() => ({
               title: "HastaninTahliliniGoruntule",
            })}
         />
      </HomeStack.Navigator>
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
         <GenelStack.Screen name="Home" component={GenelDrawerNavigator} />
         <GenelStack.Screen name="Auth" component={AuthStackNavigator} />
      </GenelStack.Navigator>
   );
};

export {
   GenelStackNavigator,
   HomeStackNavigator,
   AuthStackNavigator,
   ProfileStackNavigator,
};
