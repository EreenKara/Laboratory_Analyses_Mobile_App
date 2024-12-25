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
import { analysisSchema } from "myutility/validations";
import { Formik } from "formik";
// import mySqlLite from "myutility/sqllite_storage";
import myfirebase from "myfirebase/myfirebase";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "myredux/Reducers/user_reducer";
import { Picker } from "@react-native-picker/picker";
import { auth } from "myfirebase/firebaseconfig"; // Realtime Database referansı
import LoadingComponent from "myshared/loading";

const width = Dimensions.get("window").width / 1.4;

const TahlilSonucuGirScreen = () => {
   const navigation = useNavigation();
   const [loading, setLoading] = useState(true);
   const [doctor, setDoctor] = useState(null);
   const [elements, setElements] = useState([]);
   const [show_numune_alma_zamani, set_show_numune_alma_zamani] =
      useState(false);
   const [show_numune_kabul_zamani, set_show_numune_kabul_zamani] =
      useState(false);
   const [show_tetkik_istek_zamani, set_show_tetkik_istek_zamani] =
      useState(false);
   const [show_uzman_onay_kabul_zamani, set_show_uzman_onay_kabul_zamani] =
      useState(false);

   const [users, setUsers] = useState([]);
   const [inputs, setInputs] = useState([{ id: 1, element_id: "", value: "" }]);
   const addInputField = () => {
      const newInput = { id: inputs.length + 1, element_id: "", value: "" };
      setInputs([...inputs, newInput]);
   };
   const handleInputChange = (field, value, id) => {
      setInputs(
         inputs.map((input) =>
            input.id === id ? { ...input, [field]: value } : input
         )
      );
   };
   useEffect(() => {
      const fetchUsers = async () => {
         try {
            const usersData = await myfirebase.getUsers();
            setUsers(usersData);
            console.log("users", "deneme1");

            const elementsData = await myfirebase.getElements();
            setElements(elementsData);
            console.log("elements", "deneme2");
            const docRef = await myfirebase.getUserByEmailAsDoc(
               auth.currentUser.email
            );
            const docData = docRef.data();
            setDoctor({ id: docRef.id, email: docData.email });
            console.log("docData", docData);
            console.log("doctor", doctor);
            setLoading(false);
         } catch (error) {
            alert("Kullanıcılar getirilirken hata oluştu");
            navigation.navigate("Home");
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
               doctor_id: "",
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
                  const docRef = await myfirebase.addAnalysis(values, inputs);
                  alert("Tahlil sonucu başarıyla girildi");
               } catch (e) {
                  alert("Tahlil sonucu girilirken hata oluştu");
                  console.log(e);
               } finally {
                  bag.setSubmitting(false);
                  bag.resetForm();
                  setInputs([{ id: 1, element_id: "", value: "" }]);
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
               <View style={style.container}>
                  <ScrollView contentContainerStyle={[style.containerScroll]}>
                     {errors.hospital_name && touched.hospital_name && (
                        <Text style={style.errorText}>
                           {errors.hospital_name}
                        </Text>
                     )}
                     <TextInput
                        style={style.textInput}
                        placeholder="hospital_name"
                        keyboardType="default"
                        autoFocus={true}
                        value={values.hospital_name}
                        onChangeText={handleChange("hospital_name")}
                        onBlur={handleBlur("hospital_name")}
                        editable={!isSubmitting}
                     />
                     <Text style={style.text}>Doktor: {doctor.email}</Text>
                     <Text style={style.errorText}>
                        Eğerki kullanici burada yoksa lutfen ilk once kullaniyi
                        ekleyin
                     </Text>
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
                     <TextInput
                        style={style.textInput}
                        placeholder="numune_turu"
                        keyboardType="default"
                        autoFocus={true}
                        value={values.numune_turu}
                        onChangeText={handleChange("numune_turu")}
                        onBlur={handleBlur("numune_turu")}
                        editable={!isSubmitting}
                     />
                     <TextInput
                        style={style.textInput}
                        placeholder="rapor_grubu"
                        keyboardType="default"
                        autoFocus={true}
                        value={values.rapor_grubu}
                        onChangeText={handleChange("rapor_grubu")}
                        onBlur={handleBlur("rapor_grubu")}
                        editable={!isSubmitting}
                     />
                     <View style={style.dateStyle}>
                        <Button
                           title="uzman_onay_kabul_zamani"
                           onPress={() =>
                              set_show_uzman_onay_kabul_zamani(true)
                           }
                        />
                        <Text>{`uzman_onay_kabul_zamani: ${values.uzman_onay_kabul_zamani}`}</Text>
                     </View>
                     {show_uzman_onay_kabul_zamani && (
                        <DateTimePicker
                           style={style.button}
                           value={values.uzman_onay_kabul_zamani}
                           mode="date"
                           display="default"
                           onChange={(event, selectedDate) => {
                              setFieldValue(
                                 "uzman_onay_kabul_zamani",
                                 selectedDate || values.uzman_onay_kabul_zamani
                              );
                              set_show_uzman_onay_kabul_zamani(false);
                           }}
                           onBlur={handleBlur("uzman_onay_kabul_zamani")}
                           editable={!isSubmitting}
                        />
                     )}
                     <View style={style.dateStyle}>
                        <Button
                           style={style.button}
                           title="numune_alma_zamani"
                           onPress={() => set_show_numune_alma_zamani(true)}
                        />
                        <Text>{`numune : ${values.numune_alma_zamani}`}</Text>
                     </View>
                     {show_numune_alma_zamani && (
                        <DateTimePicker
                           value={values.numune_alma_zamani}
                           mode="date"
                           display="default"
                           onChange={(event, selectedDate) => {
                              set_show_numune_alma_zamani(false);
                              setFieldValue(
                                 "numune_alma_zamani",
                                 selectedDate || values.numune_alma_zamani
                              );
                           }}
                           onBlur={handleBlur("numune_alma_zamani")}
                           editable={!isSubmitting}
                        />
                     )}
                     <View style={style.dateStyle}>
                        <Button
                           style={style.button}
                           title="numune_kabul_zamani"
                           onPress={() => set_show_numune_kabul_zamani(true)}
                        />
                        <Text>{`numune_kabul_zamani: ${values.numune_kabul_zamani}`}</Text>
                     </View>
                     {show_numune_kabul_zamani && (
                        <DateTimePicker
                           value={values.numune_kabul_zamani}
                           mode="date"
                           display="default"
                           onChange={(event, selectedDate) => {
                              set_show_numune_kabul_zamani(false);
                              setFieldValue(
                                 "numune_kabul_zamani",
                                 selectedDate || values.numune_kabul_zamani
                              );
                           }}
                           onBlur={handleBlur("numune_kabul_zamani")}
                           editable={!isSubmitting}
                        />
                     )}
                     <View style={style.dateStyle}>
                        <Button
                           style={style.button}
                           title="tetkik_istek_zamani"
                           onPress={() => set_show_tetkik_istek_zamani(true)}
                        />
                        <Text>{`tetkik_istek_zamani: ${values.tetkik_istek_zamani}`}</Text>
                     </View>
                     {show_tetkik_istek_zamani && (
                        <DateTimePicker
                           value={values.tetkik_istek_zamani}
                           mode="date"
                           display="default"
                           onChange={(event, selectedDate) => {
                              set_show_tetkik_istek_zamani(false);
                              setFieldValue(
                                 "tetkik_istek_zamani",
                                 selectedDate || values.tetkik_istek_zamani
                              );
                           }}
                           onBlur={handleBlur("tetkik_istek_zamani")}
                           editable={!isSubmitting}
                        />
                     )}

                     <View>
                        {inputs.map((input) => (
                           <View key={input.id} style={style.inputContainer}>
                              <Picker
                                 style={style.pickerStyle}
                                 selectedValue={input.element_id}
                                 onValueChange={(itemValue) =>
                                    handleInputChange(
                                       "element_id",
                                       itemValue,
                                       input.id
                                    )
                                 }
                              >
                                 {elements.map((element) => (
                                    <Picker.Item
                                       key={element.id}
                                       label={element.name}
                                       value={element.id}
                                    />
                                 ))}
                              </Picker>
                              <TextInput
                                 style={style.input}
                                 placeholder={`Input ${input.id}`}
                                 value={input.value}
                                 onChangeText={(value) =>
                                    handleInputChange("value", value, input.id)
                                 }
                              />
                           </View>
                        ))}
                        <Button title="Add Input" onPress={addInputField} />
                     </View>

                     <TouchableOpacity
                        style={style.button}
                        onPress={handleSubmit}
                        disabled={isSubmitting}
                     >
                        <Text style={style.text}>Tahlil Gir</Text>
                     </TouchableOpacity>
                  </ScrollView>
               </View>
            )}
         </Formik>
      ))
   );
};

const style = StyleSheet.create({
   container: {
      width: "100%",
      flexDirection: "column",
      alignItems: "center",
      padding: 20,
   },
   containerScroll: {
      width: width,
      flexDirection: "column",
      alignItems: "center",
   },
   textInput: {
      borderWidth: 2,
      borderRadius: 15,
      padding: 10,
      fontSize: 18,
      width: width,
      marginTop: 10,
      borderColor: "#6D0B21",
      textAlign: "center",
   },
   text: {
      fontSize: 16,
      color: "black",
      margin: 5,
   },
   button: {
      marginTop: 10,
      backgroundColor: "#8D0B41",
      flex: 0.2,
      height: 30,
      width: 100,
      fontSize: 20,
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 20,
   },
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
   errorText: {
      fontSize: 14,
      fontWeight: "bold",
      color: "red",
   },
   radioButtonLabel: {
      fontSize: 16,
   },
   pickerStyle: {
      height: 50,
      width: width,
      borderColor: "#6D0B21",
      borderWidth: 10,
      color: "#344953",
   },
   dateStyle: {
      marginTop: 10,
      width: width,
   },
});

/*
elastic search,
kibana,
agenty,
*/

export default TahlilSonucuGirScreen;
