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
import React from "react";
import LoadingComponent from "myshared/loading";
import { Picker } from "@react-native-picker/picker";
import { Formik } from "formik";
import { useNavigation } from "@react-navigation/native";
import myfirebase from "myfirebase/myfirebase";

const RoleScreen = () => {
   const [loading, setLoading] = useState(true);
   const navigation = useNavigation();

   const [users, setUsers] = useState([]);
   const [roles, setRoles] = useState([]);
   useEffect(() => {
      const fetchUsers = async () => {
         try {
            const usersData = await myfirebase.getUsers();
            setUsers(usersData);
            const docRef = await getUserByEmailAsDoc(auth.currentUser.email);
            // setDoctor({ id: docRef.id, email: docRef.data().email });
         } catch (error) {
            alert("Kullanıcılar getirilirken hata oluştu");
            navigation.navigate("Home");
         } finally {
            setLoading(false);
         }
      };
      fetchUsers();
   }, []);

   return (
      (loading && <LoadingComponent />) ||
      (!loading && (
         <Formik
            initialValues={{
               // state tanimlamalari
               hospital_name: "Eren Hastanesi",
               doctor_id: doctor.id,
               numune_alma_zamani: new Date(),
               numune_kabul_zamani: new Date(),
               numune_turu: "",
               rapor_grubu: "",
               tetkik_istek_zamani: new Date(),
               user_id: "",
               uzman_onay_kabul_zamani: new Date(),
            }}
            onSubmit={async (values, bag) => {
               try {
                  const docRef = await myfirebase.addAnalysis(values);
                  alert("Tahlil sonucu başarıyla girildi");
               } catch (e) {
                  alert("Tahlil sonucu girilirken hata oluştu");
                  console.log(e);
               } finally {
                  bag.setSubmitting(false);
                  bag.resetForm();
               }
            }}
            validationSchema={analysisSchema}
         >
            {({
               values,
               errors,
               touched,
               handleChange,
               handleBlur,
               handleSubmit,
               isSubmitting,
               setFieldValue,
            }) => (
               <View>
                  <Picker
                     style={style.pickerStyle}
                     selectedValue={values.user_id}
                     onValueChange={handleChange("user_id")}
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
            )}
         </Formik>
      ))
   );
};

export default RoleScreen;

const styles = StyleSheet.create({});
