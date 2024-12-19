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
const width = Dimensions.get("window").width / 1.4;

const FormComponent = () => {
   const navigation = useNavigation();

   const options = ["Kadin", "Erkek"];

   return (
      <Formik
         initialValues={{
            // state tanimlamalari
            name: "",
            surname: "",
            gender: "",
            birth_date: null,
            TC: "",
            password: "",
            passwordConfirm: "",
         }}
         onSubmit={(values, bag) => {
            // bag.setErrors();
            // bag.setFieldError();
            if (values.TC === "53791548800") {
               return bag.setErrors({ TC: "Bu TC kullanımda" });
            }
            bag.resetForm();
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
               <TextInput
                  style={style.textInput}
                  placeholder="Dogum Tarihi"
                  keyboardType="default"
                  placeholderTextColor="#929292"
                  value={values.birth_date}
                  onChangeText={handleChange("birth_date")}
                  onBlur={handleBlur("birth_date")}
                  editable={!isSubmitting}
               />

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
                        routes: [{ name: "Home" }], // Yığını sıfırla ve HomeDrawer'a geç
                     })
                  }
               >
                  <Text style={style.text}>Giriş yap</Text>
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
                  <Text style={style.text}>Kayıt olun</Text>
               </TouchableOpacity>
            </View>
         )}
      </Formik>
   );
};

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
      flex: 0.2,
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
