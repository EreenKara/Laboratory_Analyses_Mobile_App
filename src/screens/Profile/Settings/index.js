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
import { useSelector, useDispatch } from "react-redux";
import myfirebase from "myfirebase/myfirebase";
import LoadingComponent from "myshared/loading";
import DateTimePicker from "@react-native-community/datetimepicker";

const SettingsScreen = () => {
   const navigation = useNavigation();
   const [show_birth_date, set_show_birth_date] = useState(false);
   const [loading, setLoading] = useState(true);
   const options = ["Kadin", "Erkek"];
   const [user, setUser] = useState(null);
   const email = useSelector((state) => state.userReducer.user.email);
   useEffect(() => {
      const fetchData = async () => {
         try {
            const tempUser = await myfirebase.getUserByEmailAsDoc(email);
            if (tempUser === null) {
            } else {
               setUser(tempUser);
            }
         } catch (e) {
            bag.resetForm();
            console.log("Kullanci bilgi girisinde hata.");
            console.error(e);
            return;
         } finally {
            setLoading(false);
         }
      };
      fetchData();
   }, []);

   return (
      (loading && <LoadingComponent />) || (
         <Formik
            initialValues={{
               // Eğer user verisi mevcutsa, user'ın değerleri ile başlat.
               name: user ? user.data().name : "",
               surname: user ? user.data().surname : "",
               gender: user ? user.data().gender : "",
               birth_date: user ? user.data().birth_date.toDate() : new Date(),
               TC: user ? user.data().TC : "",
            }}
            onSubmit={async (values, bag) => {
               try {
                  console.log("nerede hata var");
                  // user objesini kontrol etmeden işlem yapma
                  if (!user || user.id === undefined) {
                     // Yeni kullanıcı ekleme işlemi
                     const newUser = await myfirebase.addUser(values);
                  } else {
                     // Mevcut kullanıcıyı güncelleme işlemi
                     const updatedUser = await myfirebase.updateUser(
                        user.id,
                        values
                     );
                  }

                  console.log("Başarılı bilgi girişi");
                  alert("Başarılı bilgi girişi");
                  navigation.navigate("Home");
               } catch (error) {
                  console.error(error);
                  alert("Hata oluştu");
               }
            }}
            // validationSchema={userDataSchema} // Bu kısımda validation ekleyebilirsiniz
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
                     <Text style={style.text}>Bilgileri Gönder</Text>
                  </TouchableOpacity>
               </SafeAreaView>
            )}
         </Formik>
      )
   );
};
const width = 320;

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
      width: width,
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

export default SettingsScreen;
