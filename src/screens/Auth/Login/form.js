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

const width = Dimensions.get("window").width / 1.4;
const FormComponent = () => {
   const navigation = useNavigation();

   return (
      <Formik
         initialValues={{
            // state tanimlamalari
            TC: "",
            password: "",
         }}
         onSubmit={(values, bag) => {
            // bag.setErrors();
            // bag.setFieldError();
            if (values.TC === "53791548800") {
               return bag.setErrors({ TC: "Bu TC kullanımda" });
            }
            bag.resetForm();
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
            /* and other goodies */
         }) => (
            <View style={{ flex: 1, width: "100%" }}>
               {errors.TC && touched.TC && (
                  <Text style={style.errorText}>{errors.TC}</Text>
               )}
               <TextInput
                  style={style.textInput}
                  placeholder="TC"
                  keyboardType="numeric"
                  autoFocus={true}
                  placeholderTextColor="#929292"
                  clearButtonMode="always"
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
      width: width,
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
