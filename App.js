/*

getAnalysisByDateJustTwo hata veriyor wher esorgusunda problem var.
tempPreviousTahliller'i halledip gösterme kaldı
Bir de klavuz getir kaldı.
*/
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";

import { GenelTabNavigator } from "mynavigations/tabNavigator";
import { GenelDrawerNavigator } from "mynavigations/drawerNavigator";
import { GenelStackNavigator } from "mynavigations/stackNavigator";
import { Provider } from "react-redux";
import mySqlLite from "myutility/sqllite_storage";
import LoadingComponent from "myshared/loading";
import store from "myredux/store";
import { useEffect, useState } from "react";

export default function App() {
   const [isLoading, setIsLoading] = useState(true);
   const preparations = () => {
      mySqlLite.seedData();
      setIsLoading(false);
   };
   useEffect(() => {
      // preparations();
      setIsLoading(false);
   }, []);
   return isLoading ? (
      <LoadingComponent />
   ) : (
      <Provider store={store}>
         <NavigationContainer>
            <GenelStackNavigator />
         </NavigationContainer>
      </Provider>
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
