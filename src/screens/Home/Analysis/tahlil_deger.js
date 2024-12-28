import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import myfirebase from "myfirebase/myfirebase";
import Ionicons from "@expo/vector-icons/Ionicons";
import LoadingComponent from "myshared/loading";

const upIcon = "arrow-up-outline";
const downIcon = "arrow-down-outline";
const normalIcon = "remove-outline";
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const TahlilDegerComponent = ({ previousTahliller, userdata, element }) => {
   const [loading, setLoading] = useState(true);
   const [guides, setGuides] = useState([]);
   const [iconName, setIconName] = useState("");
   const [backColor, setBackColor] = useState("");
   const [minMax, setMinMax] = useState({ min: 0, max: 0 });
   const [previousValues, setPreviousValues] = useState([]);
   const karsilastir = async () => {
      let minimum = 0;
      let maximum = 0;
      let index = 0;
      guides.forEach((guide) => {
         minimum += guide.min_value;
         maximum += guide.max_value;
         index++;
      });

      let ortmin = minimum / index;
      let ortmax = maximum / index;
      if (ortmin <= element.value && element.value <= ortmax) {
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
      tempGuides.forEach((guide) => {
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
   const fetchSomeData = async () => {
      let dizi = [];
      if (previousTahliller && previousTahliller.length === 2) {
         dizi = await myfirebase.getAnalysisElementsbyAnalysisID(
            previousTahliller[0].id,
            previousTahliller[1].id,
            element.element_id
         );
      } else if (previousTahliller && previousTahliller.length === 1) {
         dizi = await myfirebase.getAnalysisElementsbyAnalysisID(
            previousTahliller[0].id,
            "",
            element.element_id
         );
      }
      setPreviousValues(dizi);
      await delay(500);
   };
   const processAsyncTasks = async () => {
      await eslesenleriBul();
   };
   useEffect(() => {
      processAsyncTasks();
   }, []);

   useEffect(() => {
      karsilastir()
         .then(() => fetchSomeData())
         .then(() => setLoading(false));
   }, [guides]);
   return loading ? (
      <LoadingComponent />
   ) : (
      <View style={[styles.container, { backgroundColor: backColor }]}>
         <Text style={[styles.elementText]}>{element.element_id}</Text>
         <Text style={[styles.elementText]}>{element.value}</Text>
         <Text style={[styles.referenceText]}>
            <Ionicons name={iconName} size={24} />
            <Text>
               {minMax.min}-{minMax.max}
            </Text>
         </Text>
         <Text style={[styles.elementText, { width: "40%" }]}>
            {previousValues.length > 0
               ? previousValues.map((eleman) => {
                    return eleman.value + " ";
                 })
               : "veri yok"}
         </Text>
      </View>
   );
};
export default TahlilDegerComponent;

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
