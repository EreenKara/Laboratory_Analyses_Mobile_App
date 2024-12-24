import {
   View,
   Text,
   Button,
   TextInput,
   StyleSheet,
   Dimensions,
   TouchableOpacity,
   SafeAreaView,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { userDataSchema } from "myutility/validations";
import { Formik } from "formik";
//  import mySqlLite from "myutility/sqllite_storage";
const width = Dimensions.get("window").width / 1.4;
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "myredux/Reducers/user_reducer";
import myfirebase from "myfirebase/myfirebase";
import LoadingComponent from "myshared/loading";
import DateTimePicker from "@react-native-community/datetimepicker";

const UserDataScreen = () => {
   const navigation = useNavigation();
   const [show_birth_date, set_show_birth_date] = useState(false);
   const [loading, setLoading] = useState(false);
   const dispatch = useDispatch();
   const options = ["Kadin", "Erkek"];

   useEffect(() => {
      const fetchData = async () => {
         try {
            const user = await myfirebase.get(values.email, values.password);
            alert("Kayıt başarılı!");
            console.log("duzgun giris");
            console.log("values", { ...values });
            dispatch(setUser(user));
            navigation.navigate("Login");
         } catch (e) {
            bag.resetForm();
            bag.setErrors({ email: "YANLIS kayit yapildi " });
            console.log("hatali kayit");
            return;
         }
      };
      fetchData();
   }, []);

   return (
      (loading && <LoadingComponent />) || (
         <Formik
            initialValues={{
               // state tanimlamalari
               name: "",
               surname: "",
               gender: "",
               birth_date: new Date(),
               TC: "",
            }}
            onSubmit={async (values, bag) => {
               try {
                  const user = await mySqlLite.addUser(values);

                  if (user === null) {
                     bag.resetForm();
                     console.log("bilgi girisi sirasinda hata olustu");
                     alert("hata olustu");
                     return;
                  }
                  console.log("Basarili bilgi girisi");
                  alert("Basarili bilgi girisi");
                  navigation.navigate("Home");
               } catch (error) {
                  alert("hata olustu");

                  return;
               }
            }}
            validationSchema={userDataSchema}
         >
            {({
               values,
               errors,
               touched,
               handleChange,
               handleBlur,
               handleSubmit,
               isSubmitting,
               /* and other goodies */
            }) => (
               <SafeAreaView style={style.container}>
                  {errors.name && touched.name && (
                     <Text style={style.errorText}>{errors.name}</Text>
                  )}
                  <TextInput
                     style={style.textInput}
                     placeholder="İsim"
                     keyboardType="default"
                     autoFocus={true}
                     value={values.name}
                     onChangeText={handleChange("name")}
                     onBlur={handleBlur("name")}
                     editable={!isSubmitting}
                  />
                  {errors.gender && touched.gender && (
                     <Text style={style.errorText}>{errors.gender}</Text>
                  )}
                  <View style={style.radioButtons}>
                     {options.map((option, index) => (
                        <TouchableOpacity
                           key={index}
                           style={style.radioButtonContainer}
                           onPress={() => {
                              handleChange("gender")(option);
                           }}
                        >
                           <View
                              style={
                                 values.gender === option
                                    ? [
                                         style.radioButton,
                                         { backgroundColor: "black" },
                                      ]
                                    : style.radioButton
                              }
                           >
                              {values.gender === option && (
                                 <View style={[style.radioButtonSelected]} />
                              )}
                           </View>
                           <Text style={style.radioButtonLabel}>{option}</Text>
                        </TouchableOpacity>
                     ))}
                  </View>
                  {errors.surname && touched.surname && (
                     <Text style={style.errorText}>{errors.surname}</Text>
                  )}
                  <TextInput
                     style={style.textInput}
                     placeholder="Soyisim"
                     keyboardType="default"
                     value={values.surname}
                     onChangeText={handleChange("surname")}
                     onBlur={handleBlur("surname")}
                     editable={!isSubmitting}
                  />

                  {errors.birth_date && touched.birth_date && (
                     <Text style={style.errorText}>{errors.birth_date}</Text>
                  )}
                  <View style={style.dateStyle}>
                     <Button
                        title="birth_date"
                        onPress={() => set_show_birth_date(true)}
                     />
                     <Text>{`numune : ${values.birth_date}`}</Text>
                  </View>
                  {show_birth_date && (
                     <DateTimePicker
                        value={values.birth_date}
                        mode="date"
                        display="default"
                        onChange={(event, selectedDate) => {
                           setFieldValue(
                              "birth_date",
                              selectedDate || values.birth_date
                           );
                           set_show_birth_date(false);
                        }}
                     />
                  )}

                  {errors.TC && touched.TC && (
                     <Text style={style.errorText}>{errors.TC}</Text>
                  )}
                  <TextInput
                     style={style.textInput}
                     placeholder="TC"
                     keyboardType="numeric"
                     placeholderTextColor="#929292"
                     value={values.TC}
                     onChangeText={handleChange("TC")}
                     onBlur={handleBlur("TC")}
                     editable={!isSubmitting}
                  />

                  <TouchableOpacity
                     style={style.button}
                     onPress={handleSubmit}
                     disabled={isSubmitting}
                  >
                     <Text style={style.text}>Bilgileri Gonder</Text>
                  </TouchableOpacity>
               </SafeAreaView>
            )}
         </Formik>
      )
   );
};

const style = StyleSheet.create({
   container: {
      paddingTop: 75,
      padding: 20,
      flex: 1,
      justifyContent: "center",
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
      fontSize: 18,
      color: "white",
   },
   button: {
      marginTop: 10,
      backgroundColor: "#8D0B41",
      flex: 0.2,
      fontSize: 16,
      width: 350,
      height: 30,
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
   radioButtonLabel: {
      fontSize: 16,
   },
   dateStyle: {
      marginTop: 10,
      width: width,
   },
});

export default UserDataScreen;
