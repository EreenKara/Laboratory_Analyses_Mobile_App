import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import HomeScreen from "myscreens/Home/Default";
import AnalysisScreen from "myscreens/Home/Analysis";
import { GenelTabNavigator } from "mynavigations/tabNavigator";

const Drawer = createDrawerNavigator();
const GenelDrawerNavigator = () => {
   return (
      <Drawer.Navigator
         screenOptions={({ route }) => ({
            headerShown: false,
            tabBarIcon: ({ color, size }) => {
               return <Ionicons name={iconName} size={size} color={color} />;
            },
         })}
      >
         <Drawer.Screen name="MainTabs" component={GenelTabNavigator} />
      </Drawer.Navigator>
   );
};

export { GenelDrawerNavigator };
