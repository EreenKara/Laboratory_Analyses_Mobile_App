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
import { useNavigation } from "@react-navigation/native";
import { registerUserSchema } from "myutility/validations";
import { Formik } from "formik";
// import mySqlLite from "myutility/sqllite_storage";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "myredux/Reducers/user_reducer";
import myfirebase from "myfirebase/myfirebase";

const FormComponent = () => {
   const navigation = useNavigation();
   const dispatch = useDispatch();
   const options = ["Kadin", "Erkek"];

   return (
      <Formik
         initialValues={{
            // state tanimlamalari
            email: "",
            password: "",
            passwordConfirm: "",
         }}
         onSubmit={async (values, bag) => {
            try {
               const user = await myfirebase.signUp(
                  values.email,
                  values.password
               );
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
         }}
         validationSchema={registerUserSchema}
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
            <View style={{ flex: 1, width: "100%" }}>
               {errors.name && touched.name && (
                  <Text style={style.errorText}>{errors.name}</Text>
               )}
               <TextInput
                  style={style.textInput}
                  placeholder="email"
                  keyboardType="default"
                  autoFocus={true}
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
               {errors.passwordConfirm && touched.passwordConfirm && (
                  <Text style={style.errorText}>{errors.passwordConfirm}</Text>
               )}
               <TextInput
                  style={style.textInput}
                  placeholder="Sifre Dogrulama"
                  secureTextEntry={true}
                  value={values.passwordConfirm}
                  onChangeText={handleChange("passwordConfirm")}
                  onBlur={handleBlur("passwordConfirm")}
                  editable={!isSubmitting}
               />

               <TouchableOpacity
                  style={style.button}
                  onPress={handleSubmit}
                  disabled={isSubmitting}
               >
                  <Text style={style.text}>Register</Text>
               </TouchableOpacity>

               <TouchableOpacity
                  style={style.button}
                  onPress={() =>
                     navigation.reset({
                        index: 0,
                        routes: [{ name: "Login" }], // Yığını sıfırla ve HomeDrawer'a geç
                     })
                  }
               >
                  <Text style={style.text}>Giriş yap</Text>
               </TouchableOpacity>
            </View>
         )}
      </Formik>
   );
};

const width = 320;
const style = StyleSheet.create({
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
      flex: 0.1,
      fontSize: 24,
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
});

export default FormComponent;
