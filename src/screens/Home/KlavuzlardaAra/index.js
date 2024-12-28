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
import LoadingComponent from "myshared/loading";
import { format } from "crypto-js";

const ageFormats = [
   {
      id: 0,
      format: "Day",
   },
   {
      id: 1,
      format: "Month",
   },
   { id: 2, format: "Year" },
];

const KlavuzlardaAraScreen = () => {
   const navigation = useNavigation();
   const [loading, setLoading] = useState(true);
   const [elements, setElements] = useState([]);
   useEffect(() => {
      const fetchElements = async () => {
         try {
            const elements = await myfirebase.getElements();
            setElements(elements);
         } catch (error) {
            alert(
               "Klavuz arama ekranında hata meydana geldi. Fetch problem..."
            );
            navigation.navigate("Home");
         } finally {
            setLoading(false);
         }
      };
      fetchElements();
   }, []);

   return (
      (loading && <LoadingComponent />) ||
      (!loading && (
         <Formik
            initialValues={{
               // state tanimlamalari
               age: 0,
               age_format: "Day",
               element_id: "IgA",
            }}
            onSubmit={(values, bag) => {
               console.log(values); // Burada values'a bakarak hangi verilerin geldiğini kontrol edin.
               try {
                  alert("Klavuzda arama gerçekleşecek");
                  navigation.navigate("KlavuzSonucu", values);
               } catch (e) {
                  alert("Klavuzda arama sırasında hata");
                  console.log(e);
               } finally {
                  bag.setSubmitting(false);
                  bag.resetForm();
               }
            }}
            // validationSchema={analysisSchema}
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
               <View style={style.container}>
                  <ScrollView contentContainerStyle={[style.containerScroll]}>
                     {errors.age && touched.age && (
                        <Text style={style.errorText}>{errors.age}</Text>
                     )}
                     <TextInput
                        style={style.textInput}
                        placeholder="age"
                        keyboardType="numeric"
                        autoFocus={true}
                        value={values.age}
                        onChangeText={handleChange("age")}
                        onBlur={handleBlur("age")}
                        editable={!isSubmitting}
                     />

                     {/* age format gelcek uraya */}
                     <Picker
                        style={style.pickerStyle}
                        selectedValue={values.age_format}
                        onValueChange={handleChange("age_format")}
                     >
                        {ageFormats.map((ageFormat) => (
                           <Picker.Item
                              key={ageFormat.id}
                              label={ageFormat.format}
                              value={ageFormat.format}
                           />
                        ))}
                     </Picker>
                     {/* element id gelcek uraya */}
                     <Picker
                        style={style.pickerStyle}
                        selectedValue={values.element_id}
                        onValueChange={handleChange("element_id")}
                     >
                        {elements.map((element) => (
                           <Picker.Item
                              key={element.id}
                              label={element.name}
                              value={element.id}
                           />
                        ))}
                     </Picker>

                     <TouchableOpacity
                        style={style.button}
                        onPress={handleSubmit}
                        disabled={isSubmitting}
                     >
                        <Text style={style.text}>Klavuzlarda Ara</Text>
                     </TouchableOpacity>
                  </ScrollView>
               </View>
            )}
         </Formik>
      ))
   );
};

export default KlavuzlardaAraScreen;

const style = StyleSheet.create({
   container: {
      width: "100%",
      flexDirection: "column",
      alignItems: "center",
      padding: 20,
   },
   containerScroll: {
      width: 320,
      flexDirection: "column",
      alignItems: "center",
   },
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
   button: {
      marginTop: 10,
      backgroundColor: "#8D0B41",
      flex: 0.2,
      height: 50,
      width: 200,
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
      height: 60,
      width: 320,
      borderColor: "#fff",
      borderWidth: 10,
      color: "#344953",
   },
   dateStyle: {
      marginTop: 10,
      width: 500,
   },
});
