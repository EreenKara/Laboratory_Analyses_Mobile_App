import * as React from "react";
import { View, Text, StyleSheet, Button, SafeAreaView } from "react-native";
import BoxList from "./box_list";
import { SECRET_KEY } from "@env";
import BoxComponent from "./box";
// import mySqlLite from "myutility/sqllite_storage";
import myfirebase from "myfirebase/myfirebase";
import LoadingComponent from "myshared/loading";

import { useSelector, useDispatch } from "react-redux";

function HomeScreen({ navigation }) {
   const user = useSelector((state) => state.userReducer.user);
   // const email = useSelector((state) => state.userReducer.user.email);
   const [role, setRole] = React.useState("");
   const [loading, setLoading] = React.useState(true);
   React.useEffect(() => {
      const fetchData = async () => {
         try {
            const tempRole = await myfirebase.getUserRoleByEmail(user.email);
            setRole(tempRole);
         } catch (error) {
            setRole("role1");
         } finally {
            setLoading(false);
            console.log("role", role);
         }
      };

      fetchData();
   }, []);
   return (
      (loading && <LoadingComponent />) || (
         <SafeAreaView style={{ flex: 1 }}>
            <View>
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
               </View>
               {(role === "role2" || role === "role3") && (
                  <View>
                     <Text
                        style={[style.header, { backgroundColor: "#CDC1FF" }]}
                     >
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
                           toNavigate={() =>
                              navigation.navigate("TahlilSonucuGir")
                           }
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
                  </View>
               )}
               {role === "role3" && (
                  <View>
                     <Text
                        style={[style.header, { backgroundColor: "#CDC1FF" }]}
                     >
                        Admin
                     </Text>
                     <View style={style.doctorBoxes}>
                        <BoxComponent
                           color="#0A97B0"
                           name="Hastanın Tahlilini Görüntüle"
                           toNavigate={() =>
                              navigation.navigate("HastaninTahliliniGoruntule")
                           }
                        />
                     </View>
                  </View>
               )}
               <Button
                  style={style.buttonStyle}
                  title="To Login"
                  onPress={() => navigation.navigate("Auth")}
               />
            </View>
         </SafeAreaView>
      )
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
