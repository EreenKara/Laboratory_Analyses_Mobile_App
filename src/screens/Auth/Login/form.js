/*
Custom func yazamadığımdan firebase tarafına e-mail check edilip edilmediğini bilmiyorum
direkt oalrka emial'i kulalnan insana kayıt olma hakkı veriyor olacağız mecbur
Frontend'de bir doğrulama koyacağım ancak aşılabilir elbette.
*/

import {
   View,
   Text,
   Button,
   TextInput,
   StyleSheet,
   Dimensions,
   TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { loginUserSchema } from "myutility/validations";
import { useNavigation } from "@react-navigation/native";
import { Formik } from "formik";
// import mySqlLite from "myutility/sqllite_storage";
import myfirebase from "myfirebase/myfirebase";

import { useSelector, useDispatch } from "react-redux";
import { setUser } from "myredux/Reducers/user_reducer";

const FormComponent = () => {
   const navigation = useNavigation();
   const dispatch = useDispatch();
   return (
      <Formik
         initialValues={{
            // state tanimlamalari
            email: "",
            password: "",
         }}
         onSubmit={async (values, bag) => {
            try {
               const user = await myfirebase.signIn(
                  values.email,
                  values.password
               );
               if (user.emailVerified === false) {
                  alert("Email'inizi doğrulamadan giriş yapamazsınız!");
                  return;
               }
               alert("Giriş başarılı!");
               console.log("duzgun giris");
               console.log("values", { ...values });
               dispatch(setUser({ email: values.email }));
               navigation.navigate("UserData");
            } catch (e) {
               bag.resetForm();
               bag.setErrors({ email: "YANLIS giris yapildi " });
               console.log("hatali giris");
               return;
            }
         }}
         validationSchema={loginUserSchema}
      >
         {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
         }) => (
            <View style={{ flex: 1, width: "100%" }}>
               {errors.TC && touched.TC && (
                  <Text style={style.errorText}>{errors.TC}</Text>
               )}
               <TextInput
                  style={style.textInput}
                  placeholder="email"
                  keyboardType="email-address"
                  autoFocus={true}
                  placeholderTextcolor="#929292"
                  clearButtonMode="always"
                  value={values.email}
                  onChangeText={handleChange("email")}
                  onBlur={handleBlur("email")}
                  editable={!isSubmitting}
               />
               {errors.password && touched.password && (
                  <Text style={style.errorText}>{errors.password}</Text>
               )}
               <TextInput
                  style={style.textInput}
                  placeholder="Sifre"
                  secureTextEntry={true}
                  value={values.password}
                  onChangeText={handleChange("password")}
                  onBlur={handleBlur("password")}
                  editable={!isSubmitting}
               />
               <TouchableOpacity
                  style={style.button}
                  onPress={handleSubmit}
                  disabled={isSubmitting}
               >
                  <Text style={style.text}>Giriş Yap</Text>
               </TouchableOpacity>

               <TouchableOpacity
                  style={style.button}
                  onPress={() =>
                     navigation.reset({
                        index: 0,
                        routes: [{ name: "Home" }], // Yığını sıfırla ve HomeDrawer'a geç
                     })
                  }
               >
                  <Text style={style.text}>to Home</Text>
               </TouchableOpacity>

               <TouchableOpacity
                  style={style.button}
                  onPress={() =>
                     navigation.reset({
                        index: 0,
                        routes: [{ name: "Register" }], // Yığını sıfırla ve HomeDrawer'a geç
                     })
                  }
               >
                  <Text style={style.text}>Kayıt Olun</Text>
               </TouchableOpacity>
            </View>
         )}
      </Formik>
   );
};

{
   /* <TextInput 
autoCapitalize="none"
autoCorrect={false}
clearButtonMode="always"
value={query}
onChangeText={ queryText => handleSearch(queryText) }
placeholder="Arama yapın"
autoFocus={true}
style={{backgroundColor:'#fff', paddingHorizontal:20}}
/> */
}

const style = StyleSheet.create({
   textInput: {
      borderWidth: 2,
      borderRadius: 15,
      padding: 10,
      fontSize: 18,
      width: 320,
      marginTop: 10,
      borderColor: "#6D0B21",
      textAlign: "center",
   },
   text: {
      fontSize: 18,
      color: "white",
   },
   errorText: {
      fontSize: 14,
      fontWeight: "bold",
      color: "red",
   },
   button: {
      marginTop: 10,
      backgroundColor: "#8D0B41",
      flex: 0.2,
      fontSize: 24,
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 20,
   },
});

export default FormComponent;
