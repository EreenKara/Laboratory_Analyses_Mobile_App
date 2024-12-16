import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
   AppStackNavigator,
   AuthStackNavigator,
   ProfileStackNavigator,
} from "mynavigations/stackNavigator";
import HomeScreen from "myscreens/Home/index";
import LoginScreen from "myscreens/Login/index";
import RegisterScreen from "myscreens/Register/index";

import Ionicons from "@expo/vector-icons/Ionicons";
// import fa5 from "@expo/vector-icons/FontAwesome5";

const Tab = createBottomTabNavigator();

let appRoutingName = "App";
let profileRoutingName = "Profile";

const GenelTabNavigator = () => {
   const [shownValue, setShownValue] = React.useState(false);
   return (
      <Tab.Navigator
         screenOptions={({ route }) => ({
            headerShown: shownValue,
            tabBarIcon: ({ color, size }) => {
               let iconName;
               if (route.name === appRoutingName) {
                  iconName = "home";
               } else if (route.name === profileRoutingName) {
                  iconName = "people";
               }
               return <Ionicons name={iconName} size={size} color={color} />;
            },
         })}
      >
         <Tab.Screen
            name={appRoutingName}
            component={AppStackNavigator}
            options={{
               tabBarLabel: "Home",
            }}
         />
         <Tab.Screen
            name={profileRoutingName}
            component={ProfileStackNavigator}
            options={{
               tabBarLabel: "Profile",
            }}
         />
      </Tab.Navigator>
   );
};

export { GenelTabNavigator };
