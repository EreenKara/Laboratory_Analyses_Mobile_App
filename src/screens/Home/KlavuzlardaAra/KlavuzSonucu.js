import {
   View,
   Text,
   Button,
   TextInput,
   StyleSheet,
   Dimensions,
   TouchableOpacity,
   ScrollView,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
// import mySqlLite from "myutility/sqllite_storage";
import myfirebase from "myfirebase/myfirebase";
import { setUser } from "myredux/Reducers/user_reducer";
import { Picker } from "@react-native-picker/picker";
import LoadingComponent from "myshared/loading";

const KlavuzSonucuScreen = ({ route }) => {
   const [data, setData] = useState(route.params);
   const [guides, setGuides] = useState(null);
   const yasaGoreHesapla = () => {
      data.age;
      data.age_format;
      data.element_id;
   };
   const chosenGuides = async () => {
      let eslesenGuides = [];
      const tempGuides = await myfirebase.getGuidesByElement(data.element_id);
      tempGuides.map((guide) => {
         if (guide.age_format === "Year") {
            if (data.age_format === "Year") {
               if (guide.min_age <= data.age && data.age <= guide.max_age) {
                  eslesenGuides.push(guide);
               }
            } else if (data.age_format === "Month") {
               const yearAge = data.age / 12;
               if (guide.min_age <= yearAge && yearAge <= guide.max_age) {
                  eslesenGuides.push(guide);
               }
            } else if (data.age_format === "Day") {
               const monthAge = data.age / 30;
               const yearAge = monthAge / 12;
               if (guide.min_age <= yearAge && yearAge <= guide.max_age) {
                  eslesenGuides.push(guide);
               }
            }
         } else if (guide.age_format === "Month") {
            if (data.age_format === "Year") {
               const yearAge = data.age * 12;
               if (guide.min_age <= yearAge && yearAge <= guide.max_age) {
                  eslesenGuides.push(guide);
               }
            } else if (data.age_format === "Month") {
               if (guide.min_age <= data.age && data.age <= guide.max_age) {
                  eslesenGuides.push(guide);
               }
            } else if (data.age_format === "Day") {
               const monthAge = data.age;
               if (guide.min_age <= monthAge && monthAge <= guide.max_age) {
                  eslesenGuides.push(guide);
               }
            }
         } else if (guide.age_format === "Day") {
            if (data.age_format === "Year") {
               const dayAge = data.age * 365;
               if (guide.min_age <= dayAge && dayAge <= guide.max_age) {
                  eslesenGuides.push(guide);
               }
            } else if (data.age_format === "Month") {
               const dayAge = data.age * 30;
               if (guide.min_age <= dayAge && dayAge <= guide.max_age) {
                  eslesenGuides.push(guide);
               }
            } else if (data.age_format === "Day") {
               if (guide.min_age <= data.age && data.age <= guide.max_age) {
                  eslesenGuides.push(guide);
               }
            }
         }
      });
      return eslesenGuides;
   };

   useEffect(() => {
      const fetchElements = async () => {
         try {
            let eslesenGuides = await chosenGuides();
            setGuides(eslesenGuides);
            console.log(eslesenGuides);
         } catch (error) {
            alert(
               "Klavuz arama ekranında hata meydana geldi. Fetch problem..."
            );
            navigation.navigate("Home");
         } finally {
            setLoading(false);
         }
      };
      fetchElements();
   }, []);
   return (
      // BURADA ESLESEN GUIDESLARIN BILGILERI YAZILACAK
      <View style={styles.container}>
         <View style={styles.header}>
            <Text style={styles.textStyle}>Element</Text>
            <Text style={styles.textStyle}>Min Value</Text>
            <Text style={styles.textStyle}>Max Value</Text>
            <Text style={styles.textStyle}>Min Yaş</Text>
            <Text style={styles.textStyle}>Max Yaş</Text>
            <Text style={styles.textStyle}>Age Format</Text>
         </View>
         {guides
            ? guides.map((guide, index) => {
                 return (
                    <View style={styles.content} key={index}>
                       <Text style={styles.textStyle}>{guide.element_id}</Text>
                       <Text style={styles.textStyle}>{guide.min_value}</Text>
                       <Text style={styles.textStyle}>{guide.max_value}</Text>
                       <Text style={styles.textStyle}>{guide.min_age}</Text>
                       <Text style={styles.textStyle}>{guide.max_age}</Text>
                       <Text style={styles.textStyle}>{guide.age_format}</Text>
                    </View>
                 );
              })
            : "Veri yok"}
      </View>
   );
};

export default KlavuzSonucuScreen;

const styles = StyleSheet.create({
   container: {
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: 20,
      flex: 1,
   },
   header: {
      flexDirection: "row",
      justifyContent: "space-between",
      flex: 0.1,
      width: "100%",
   },
   contentGenel: {
      flexDirection: "row",
      justifyContent: "space-between",
      flexWrap: "wrap",
      flex: 1,
      width: "100%",
   },
   content: {
      flexDirection: "row",
      justifyContent: "space-between",
      flexWrap: "wrap",
      flex: 0.9,
      width: "100%",
   },
   textStyle: {
      width: "16%",
   },
});
