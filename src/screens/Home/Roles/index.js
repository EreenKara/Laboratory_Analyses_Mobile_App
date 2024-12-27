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
            const rolesData = await myfirebase.getRoles();
            setRoles(rolesData);
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
               role: "",
               user_id: "",
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
                  <View>
                     <Picker
                        style={styles.pickerStyle}
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
                     <View>
                        <View style={styles.radioButtons}>
                           {roles.map((role, index) => (
                              <TouchableOpacity
                                 key={index}
                                 style={styles.radioButtonContainer}
                                 onPress={() => {
                                    handleChange("role")(role.id);
                                 }}
                              >
                                 <View
                                    style={
                                       values.role === role.id
                                          ? [
                                               styles.radioButton,
                                               { backgroundColor: "black" },
                                            ]
                                          : styles.radioButton
                                    }
                                 >
                                    {values.role === role.id && (
                                       <View
                                          style={[styles.radioButtonSelected]}
                                       />
                                    )}
                                 </View>
                                 <Text style={styles.radioButtonLabel}>
                                    {role.role_name}
                                 </Text>
                              </TouchableOpacity>
                           ))}
                        </View>
                     </View>
                  </View>
               </View>
            )}
         </Formik>
      ))
   );
};

export default RoleScreen;

const styles = StyleSheet.create({
   radioButtons: {
      marginTop: 10,
      flexDirection: "row",
      justifyContent: "space-evenly",
   },
   radioButtonContainer: {
      flexDirection: "row",
      flexWrap: "wrap",
      alignItems: "center",
      marginBottom: 10,
   },
   radioButton: {
      height: 20,
      width: 20,
      borderRadius: 10,
      borderWidth: 2,
      borderColor: "#007BFF",
      justifyContent: "center",
      alignItems: "center",
      marginRight: 10,
   },
   radioButtonSelected: {
      height: 10,
      width: 10,
      borderRadius: 5,
      backgroundColor: "#007BFF",
   },
   radioButtonLabel: {
      fontSize: 16,
   },
   pickerStyle: {
      height: 60,
      width: width,
      borderColor: "#6D0B21",
      borderWidth: 10,
      color: "#344953",
   },
});
