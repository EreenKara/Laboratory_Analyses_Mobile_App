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
import React, { useEffect, useState } from "react";
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
               role_id: "",
               user_id: users[0].id,
            }}
            onSubmit={async (values, bag) => {
               try {
                  await myfirebase.handleRole(values.user_id, values.role_id);
                  alert("Role Degistirildi");
               } catch (e) {
                  alert("Role degistirilirken hata");
                  console.log(e);
               } finally {
                  bag.setSubmitting(false);
               }
            }}
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
               <View style={styles.container}>
                  <View style={styles.headerView}>
                     <Text style={styles.headerText}>
                        Kullanıcı için role gir
                     </Text>
                  </View>
                  <View style={styles.pickerView}>
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
                                    handleChange("role_id")(role.id);
                                 }}
                              >
                                 <View
                                    style={
                                       values.role_id === role.id
                                          ? [
                                               styles.radioButton,
                                               { backgroundColor: "black" },
                                            ]
                                          : styles.radioButton
                                    }
                                 >
                                    {values.role_id === role.id && (
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
                     <Button title="rol degistir" onPress={handleSubmit} />
                  </View>
               </View>
            )}
         </Formik>
      ))
   );
};

export default RoleScreen;

const styles = StyleSheet.create({
   headerView: {
      marginBottom: 30,
      padding: 10,
      justifyContent: "center",
      alignItems: "center",
   },
   headerText: {
      color: "black",
      fontSize: 32,
   },
   container: {
      flex: 0.8,
      padding: 10,
      justifyContent: "center",
      alignItems: "center",
   },
   radioButtons: {
      borderRadius: 15,
      borderColor: "black",
      marginTop: 10,
      flexDirection: "row",
      justifyContent: "space-evenly",
      alignItems: "center",
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
   pickerView: {
      height: 60,
      width: 320,
      borderColor: "#6D0B21",
      borderWidth: 2,
      color: "#344953",
      borderRadius: 20,
   },
   pickerStyle: {
      height: 60,
      width: 300,
      borderColor: "#6D0B21",
      borderWidth: 10,
      color: "#344953",
   },
});
