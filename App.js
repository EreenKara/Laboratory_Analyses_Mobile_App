/*
  Localizer'ı preparations altında ve login page form içerisinde değiştir.

  Form işlemlerini yapıp kullanıcıdan bilgi alıcam

  Fetch ile api istekleri alıcam
  api isteklerini gerçekleştirmek içib best practiceler nelerdir
  api istekleri nasıl gerçekleştirilir  

  sql lite bakıcam.

  .env dosyalarını mobilde nasıl tutamk gerekiyor. Sonuçta buradai kodlar bizler apk yaptığımzıda birinin
  telefonun olacak olan dosyalar olacak nasıl muhafaza etmek gerekiyor diye bakmak gerek.


  .env babelden dolayı çalışmıyor dğzelt


  Redux ve react-native-paper kurdum.

  JWT token backend'de kesinlikle secret key ile valid edilmeli.


  ScrollView, SelectionList, VirtualizedList, FlatList arasındaki fark. Hocanın kodları biraz incelenebilir.

  backgroundColor: "#8f8f8", GÜZEL BİR BACKGROUND HER YERDE KULLANILABİLİR.


*/
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";

import { GenelTabNavigator } from "mynavigations/tabNavigator";
import { GenelDrawerNavigator } from "mynavigations/drawerNavigator";
import { GenelStackNavigator } from "mynavigations/stackNavigator";
import { Provider } from "react-native-paper";
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
      preparations();
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
