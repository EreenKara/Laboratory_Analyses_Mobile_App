import { ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useState, useEffect } from "react";
import PerAnalysisComponet from "./per_analysis";
import { useNavigation } from "@react-navigation/native";
import myfirebase from "myfirebase/myfirebase";
import { Picker } from "@react-native-picker/picker";
import LoadingComponent from "myshared/loading";

const HastaninTahlininiGoruntuleScreen = () => {
   const [loading, setLoading] = useState(true);
   const navigation = useNavigation();
   const [users, setUsers] = useState([]);
   const [user, setUser] = useState({});
   const [tahliller, setTahliller] = useState([]);
   //    const tahliller = [
   //    { id: 1, title: "Item 1", content: "This is the content for item 1." },
   //    { id: 2, title: "Item 2", content: "This is the content for item 2." },
   //    { id: 3, title: "Item 3", content: "This is the content for item 3." },
   // ];
   useEffect(() => {
      const performSomething = async () => {
         if (!user || !user.id) return; // Eğer kullanıcı yoksa çık
         try {
            const analysisdata = await myfirebase.getAnalysisWithElements(
               user.id
            ); // Kullanıcı ID'sine göre veri getir
            analysisdata.sort((a, b) => new Date(b.date) - new Date(a.date)); // Tarihe göre sırala
            setTahliller(analysisdata); // State'i güncelle
         } catch (error) {
            console.error("Tahliller yüklenirken hata oluştu:", error);
         }
      };
      performSomething();
   }, [user]); // Sadece state değiştiğinde tetiklenir
   useEffect(() => {
      const fetchUsers = async () => {
         try {
            const usersData = await myfirebase.getUsersWithData();
            setUsers(usersData);
            setUser(usersData[0]);
         } catch (error) {
            alert("Hata1");
            navigation.navigate("Home");
         } finally {
            setLoading(false);
         }
      };
      fetchUsers();
   }, []);
   return (
      (loading && <LoadingComponent />) || (
         <View style={styles.container}>
            <View style={styles.hastaSec}>
               <Picker
                  style={styles.pickerStyle}
                  selectedValue={user.id}
                  onValueChange={(itemValue, itemIndex) => {
                     setUser(users.find((user) => user.id === itemValue));
                  }}
               >
                  {users.map((user) => (
                     <Picker.Item
                        key={user.id}
                        label={user.email}
                        value={user.id}
                     />
                  ))}
               </Picker>
            </View>
            <View style={styles.hastaBilgileri}>
               <View>
                  <Text style={styles.header}>Hasta Bilgileri</Text>
               </View>
               <View style={styles.contentView}>
                  <Text style={styles.content}>Adı: {user.name}</Text>
                  <Text style={styles.content}>Soyadı: {user.surname}</Text>
                  <Text style={styles.content}>TC: {user.TC}</Text>
                  <Text style={styles.content}>
                     Doğum Tarihi: {user.birth_date.getDate()}/
                     {user.birth_date.getMonth()}/
                     {user.birth_date.getFullYear()}
                  </Text>
                  <Text style={styles.content}>Cinsiyet: {user.gender}</Text>
               </View>
            </View>
            <ScrollView>
               {tahliller.map((item) => (
                  <PerAnalysisComponet
                     key={item.id}
                     userdata={user}
                     tahlil={item}
                  />
               ))}
            </ScrollView>
         </View>
      )
   );
};

export default HastaninTahlininiGoruntuleScreen;

const styles = StyleSheet.create({
   container: {
      padding: 10,
   },
   componentContainer: {
      marginBottom: 10,
      backgroundColor: "#f0f0f0",
      borderRadius: 5,
      overflow: "hidden",
   },

   hastaBilgileri: {
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 5,
      borderWidth: 2,
   },
   header: {
      color: "black",
      fontWeight: "bold",
      padding: 2,
      fontSize: 24,
      textAlign: "center",
   },
   content: {
      fontSize: 16,
      color: "black",
      minWidth: "20%",
   },
   contentView: {
      padding: 5,
      flexWrap: "wrap",
      flexDirection: "row",
      justifyContent: "space-between",
      width: "100%",
   },
   hastaSec: {
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 5,
      borderWidth: 2,
   },
   pickerStyle: {
      height: 60,
      width: 300,
      borderColor: "#6D0B21",
   },
});
