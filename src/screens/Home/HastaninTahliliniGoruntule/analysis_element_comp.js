import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import myfirebase from "myfirebase/myfirebase";
import Ionicons from "@expo/vector-icons/Ionicons";
import LoadingComponent from "myshared/loading";

const upIcon = "arrow-up-outline";
const downIcon = "arrow-down-outline";
const normalIcon = "remove-outline";

const AnalysisElementsComponent = ({ userdata, element }) => {
   const [loading, setLoading] = useState(true);
   const [guides, setGuides] = useState([]);
   const [iconName, setIconName] = useState("");
   const [backColor, setBackColor] = useState("");
   const [minMax, setMinMax] = useState({});
   const karsilastir = async () => {
      let minimum = 0;
      let maximum = 0;
      let index = 0;
      guides.forEach((guide) => {
         minimum = minimum + guide.min_value;
         maximum = maximum + guide.max_value;
         index++;
      });
      let ortmin = minimum / index;
      let ortmax = maximum / index;
      let ortGenel = (ortmin + ortmax) / 2;
      if (ortmin < element.value && element.value < ortmax) {
         // burası yeşil
         setIconName(normalIcon);
         setBackColor("green");
      } else if (element.value < ortmin) {
         // burası düşük
         setIconName(downIcon);
         setBackColor("red");
      } else if (element.value > ortmax) {
         // burası yüksek
         setIconName(upIcon);
         setBackColor("#7C444F");
      }
      setMinMax({ min: ortmin, max: ortmax });
   };
   const eslesenleriBul = async () => {
      const tempGuides = await myfirebase.getGuidesByElement(
         element.element_id
      );

      const bugun = new Date();
      const fark = bugun - userdata.birth_date;
      const gunCinsindenYas = fark / (1000 * 3600 * 24);
      let eslesenGuides = [];
      tempGuides.map((guide) => {
         if (guide.age_format === "Year") {
            const monthAge = gunCinsindenYas / 30;
            const yearAge = monthAge / 12;
            if (
               guide.min_age <= yearAge &&
               (guide.max_age === null || yearAge <= guide.max_age)
            ) {
               eslesenGuides.push(guide);
            }
         } else if (guide.age_format === "Month") {
            const monthAge = gunCinsindenYas;
            if (
               guide.min_age <= monthAge &&
               (guide.max_age === null || monthAge <= guide.max_age)
            ) {
               eslesenGuides.push(guide);
            }
         } else if (guide.age_format === "Day") {
            if (
               guide.min_age <= gunCinsindenYas &&
               (guide.max_age === null || gunCinsindenYas <= guide.max_age)
            ) {
               eslesenGuides.push(guide);
            }
         }
      });
      setGuides(eslesenGuides);
   };
   useEffect(() => {
      eslesenleriBul().then(() => {
         karsilastir().then(() => setLoading(false));
      });
   }, []);
   return (
      (loading && <LoadingComponent />) || (
         <View style={styles.container}>
            <Text style={[styles.elementText, { backgroundColor: backColor }]}>
               {element.element_id}
            </Text>
            <Text style={[styles.elementText, { backgroundColor: backColor }]}>
               {element.value}
            </Text>
            <Text
               style={[styles.referenceText, { backgroundColor: backColor }]}
            >
               <Ionicons name={iconName} size={24} />
               <Text>
                  {minMax.min}-{minMax.max}
               </Text>
            </Text>
         </View>
      )
   );
};

export default AnalysisElementsComponent;

const styles = StyleSheet.create({
   container: {
      flexDirection: "row",
   },
   elementText: {
      width: "20%",
      textAlign: "center",
   },
   referenceText: {
      width: "20%",
      textAlign: "center",
      flexDirection: "column",
      flexWrap: "wrap",
   },
});
