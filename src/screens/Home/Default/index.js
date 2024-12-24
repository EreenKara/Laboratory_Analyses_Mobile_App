import * as React from "react";
import { View, Text, StyleSheet, Button, SafeAreaView } from "react-native";
import BoxList from "./box_list";
import { SECRET_KEY } from "@env";
import BoxComponent from "./box";
import mySqlLite from "myutility/sqllite_storage";

import { useSelector, useDispatch } from "react-redux";
import myfirebase from "myfirebase/myfirebase";

function HomeScreen({ navigation }) {
   const user = useSelector((state) => state.userReducer.user);
   if (user === null) {
   }
   //  else {
   //    const userRole = mySqlLite.getUserRoleWithTC(user.TC);
   //    console.log("user role:");
   //    console.log(userRole);
   // }
   React.useEffect(() => {
      // myfirebase.
   }, []);
   return (
      <SafeAreaView style={{ flex: 1 }}>
         <View>
            <Text style={[style.header, { backgroundColor: "#F29F58" }]}>
               Hasta
            </Text>
            <View style={style.hastaBoxes}>
               <BoxComponent
                  color="#D91656"
                  name="Tahlil Sonuçlarını Görüntüle"
                  toNavigate={() => navigation.navigate("Analysis")}
               />
               <BoxComponent
                  color="#D91656"
                  name="DB"
                  toNavigate={() => navigation.navigate("DB")}
               />
            </View>
            <Text style={[style.header, { backgroundColor: "#CDC1FF" }]}>
               Doktor
            </Text>
            <View style={style.doctorBoxes}>
               <BoxComponent
                  color="#0A97B0"
                  name="Hastanın Tahlilini Görüntüle"
                  toNavigate={() =>
                     navigation.navigate("HastaninTahliliniGoruntule")
                  }
               />
               <BoxComponent
                  color="#F9C0AB"
                  name="Tahlil Sonucu Gir"
                  toNavigate={() => navigation.navigate("TahlilSonucuGir")}
               />
               <BoxComponent
                  color="#4B5945"
                  name="Klavuz Gir"
                  toNavigate={() => navigation.navigate("KlavuzGir")}
               />
               <BoxComponent
                  color="#E1FFBB"
                  name="Klavuz Getir"
                  toNavigate={() => navigation.navigate("KlavuzGetir")}
               />
            </View>
            <Button
               style={style.buttonStyle}
               title="To Login"
               onPress={() => navigation.navigate("Auth")}
            />
         </View>
         <View style={style.denemeBoxes}>
            <Button
               title="Adddata"
               onPress={() => myfirebase.addUser()}
            ></Button>
         </View>
      </SafeAreaView>
   );
}

export default HomeScreen;

const style = StyleSheet.create({
   box_container: {
      flex: 1,
      flexDirection: "row",
      flexWrap: "wrap",
   },
   hastaBoxes: {
      flexDirection: "row",
      flexWrap: "wrap",
   },
   doctorBoxes: {
      flexDirection: "row",
      flexWrap: "wrap",
   },
   denemeBoxes: {
      flexDirection: "row",
      flexWrap: "wrap",
      backgroundColor: "black",
   },
   header: {
      textAlign: "center",
      fontSize: 30,
   },
});
