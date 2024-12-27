import React, { useState, useRef, useEffect } from "react";
import {
   Animated,
   TouchableOpacity,
   Text,
   View,
   StyleSheet,
   ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import AnalysisElementsComponent from "./analysis_element_comp";
import myfirebase from "myfirebase/myfirebase";

const PerAnalysisComponet = ({ userdata, tahlil }) => {
   const [isExpanded, setIsExpanded] = useState(false);
   const animationValue = useRef(new Animated.Value(0)).current;
   const backgroundColor1 = "#f0f0f0";
   const backgroundColor2 = "#fff";
   const [doctor, setDoctor] = useState(null);
   useEffect(() => {
      const fetchData = async () => {
         try {
            const doctorDoc = await myfirebase.getUserByIdAsDoc(
               tahlil.doctor_id
            );
            const doctorData = doctorDoc.data();
            setDoctor(doctorData);
         } catch (error) {
            alert("Hata2");
            navigation.navigate("Home");
         } finally {
            setLoading(false);
         }
      };
      fetchData();
   }, []);
   const toggleExpand = () => {
      setIsExpanded(!isExpanded);
      Animated.timing(animationValue, {
         toValue: isExpanded ? 0 : 1, // Açıkken 1, kapalıyken 0
         duration: 300, // Animasyon süresi (ms)
         useNativeDriver: false,
      }).start();
   };

   const heightInterpolation = animationValue.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 300], // Kapalı halde 0, açık halde 100 piksel
   });
   return (
      <ScrollView style={styles.container}>
         {/* Tıklanabilir Başlık */}
         <TouchableOpacity onPress={toggleExpand} style={styles.compNavBar}>
            <View style={styles.headerTextView}>
               {/* <Text style={styles.headerText}>Doctor TC: {doctor.TC}</Text> */}
               <Text style={styles.headerText}>
                  Hastane adı: {tahlil.hospital_name}
               </Text>
               <Text style={styles.headerText}>
                  Numune Türü: {tahlil.numune_turu}
               </Text>
               <Text style={styles.headerText}>
                  Tetkik Istek Zamani: {tahlil.tetkik_istek_zamani.getDate()}/
                  {tahlil.tetkik_istek_zamani.getMonth()}/
                  {tahlil.tetkik_istek_zamani.getFullYear()}
               </Text>
               <Text style={styles.headerText}>
                  Numune Alma Zamani: {tahlil.numune_alma_zamani.getDate()}/
                  {tahlil.numune_alma_zamani.getMonth()}/
                  {tahlil.numune_alma_zamani.getFullYear()}
               </Text>
               <Text style={styles.headerText}>
                  Rapor Grubu: {tahlil.rapor_grubu}
               </Text>
               <Text style={styles.headerText}>
                  Numune Kabul Zamani: {tahlil.numune_kabul_zamani.getDate()}/
                  {tahlil.numune_kabul_zamani.getMonth()}/
                  {tahlil.numune_kabul_zamani.getFullYear()}
               </Text>
               <Text style={styles.headerText}>
                  Uzman Onay Zamani: {tahlil.uzman_onay_kabul_zamani.getDate()}/
                  {tahlil.uzman_onay_kabul_zamani.getMonth()}/
                  {tahlil.uzman_onay_kabul_zamani.getFullYear()}
               </Text>
            </View>
            <View style={styles.iconView}>
               <Ionicons name="chevron-down-outline" size={24} color="black" />
            </View>
         </TouchableOpacity>

         {/* Genişleyen İçerik */}
         <Animated.View
            style={[styles.content, { height: heightInterpolation }]}
         >
            <View>
               <View style={styles.headers}>
                  <Text
                     style={[
                        styles.perColumn,
                        { backgroundColor: backgroundColor1 },
                     ]}
                  >
                     Tetkik Adı
                  </Text>
                  <Text style={styles.perColumn}> Sonuc</Text>
                  <Text style={styles.perColumn}> Referans Aralığı</Text>
                  <Text style={[styles.perColumn, { width: "40%" }]}>
                     Onceki Sonuclar
                  </Text>
               </View>
               <View style={styles.elementView}>
                  {tahlil.perElement.map((element, index) => {
                     const backColor =
                        index % 2 === 0 ? backgroundColor1 : backgroundColor2;
                     return (
                        <AnalysisElementsComponent
                           userdata={userdata}
                           element={element}
                        />
                     );
                  })}
               </View>
            </View>
         </Animated.View>
      </ScrollView>
   );
};

export default PerAnalysisComponet;

const styles = StyleSheet.create({
   container: {
      margin: 10,
      borderWidth: 1,
      borderColor: "#ccc",
      borderRadius: 8,
      overflow: "hidden",
      width: "95%",
   },
   compNavBar: {
      flexDirection: "row",
      justifyContent: "space-evenly",
      backgroundColor: "#9AA6B2",
      padding: 10,
      width: "100%",
      flex: 1,
   },
   headers: {
      flexDirection: "row",
      flexWrap: "wrap",
      backgroundColor: "#f0f0f0",
   },
   perColumn: {
      width: "20%",
      textAlign: "center",
   },
   headerTextView: {
      padding: 5,
      flex: 0.9,

      flexWrap: "wrap",
      flexDirection: "column",
      justifyContent: "space-between",
      alignItems: "flex-start",
      width: "100%",
   },
   iconView: {
      flex: 0.1,
      position: "relative",
      top: 5,
   },
   headerText: {
      color: "#fff",
      fontSize: 16,
      textAlign: "center",
      minWidth: "20%",
   },
   content: {
      backgroundColor: "#f9f9f9",
      overflow: "hidden",
   },
   contentText: {
      padding: 10,
      fontSize: 14,
      color: "#333",
   },
   elementView: {
      flexWrap: "wrap",
      flexDirection: "column",
   },
});
