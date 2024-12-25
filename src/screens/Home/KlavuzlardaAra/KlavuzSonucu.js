import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { GithubAuthProvider } from "firebase/auth";

const KlavuzSonucuScreen = ({ route }) => {
   const [data, setData] = useState(route.params);
   const [guides, setGuides] = useState([]);
   const yasaGoreHesapla = () => {
      data.age;
      data.age_format;
      data.element_id;
   };
   const chosenGuides = () => {
      let eslesenGuides = [];
      guides.map((guide) => {
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
            const tempGuides = await myfirebase.getGuidesByElement(
               data.element_id
            );
            setGuides(tempGuides);
            let eslesenGuides = chosenGuides();
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
      <View>
         <Text>KlavuzSonucuScreen</Text>
      </View>
   );
};

export default KlavuzSonucuScreen;

const styles = StyleSheet.create({});
