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

const KlavuzGirScreen = () => {
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
               max_age: 0,
               min_age: 0,
               age_format: "Day",
               subject_number: 0,
               min_value: 0,
               max_value: 0,
               mean_value: 0,
               mean_value_sd: 0,
               geometric_mean: 0,
               geometric_mean_sd: 0,
               confidence_intervals_min: 0,
               confidence_intervals_max: 0,
               element_id: "IgA",
            }}
            onSubmit={async (values, bag) => {
               try {
                  const docRef = await myfirebase.addGuide(values);
                  alert("Tahlil sonucu başarıyla girildi");
               } catch (e) {
                  alert("Tahlil sonucu girilirken hata oluştu");
                  console.log(e);
               } finally {
                  bag.setSubmitting(false);
                  bag.resetForm();
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
            }) => (
               <View style={style.container}>
                  <ScrollView contentContainerStyle={[style.containerScroll]}>
                     {errors.min_age && touched.min_age && (
                        <Text style={style.errorText}>{errors.min_age}</Text>
                     )}
                     <TextInput
                        style={style.textInput}
                        placeholder="min_age"
                        keyboardType="numeric"
                        autoFocus={true}
                        value={values.min_age}
                        onChangeText={handleChange("min_age")}
                        onBlur={handleBlur("min_age")}
                        editable={!isSubmitting}
                     />
                     <TextInput
                        style={style.textInput}
                        placeholder="max_age"
                        keyboardType="numeric"
                        autoFocus={true}
                        value={values.max_age}
                        onChangeText={handleChange("max_age")}
                        onBlur={handleBlur("max_age")}
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
                     <TextInput
                        style={style.textInput}
                        placeholder="subject_number"
                        keyboardType="numeric"
                        autoFocus={true}
                        value={values.subject_number}
                        onChangeText={handleChange("subject_number")}
                        onBlur={handleBlur("subject_number")}
                        editable={!isSubmitting}
                     />
                     <TextInput
                        style={style.textInput}
                        placeholder="min_value"
                        keyboardType="numeric"
                        autoFocus={true}
                        value={values.min_value}
                        onChangeText={handleChange("min_value")}
                        onBlur={handleBlur("min_value")}
                        editable={!isSubmitting}
                     />
                     <TextInput
                        style={style.textInput}
                        placeholder="max_value"
                        keyboardType="numeric"
                        autoFocus={true}
                        value={values.max_value}
                        onChangeText={handleChange("max_value")}
                        onBlur={handleBlur("max_value")}
                        editable={!isSubmitting}
                     />
                     <TextInput
                        style={style.textInput}
                        placeholder="mean_value"
                        keyboardType="numeric"
                        autoFocus={true}
                        value={values.mean_value}
                        onChangeText={handleChange("mean_value")}
                        onBlur={handleBlur("mean_value")}
                        editable={!isSubmitting}
                     />
                     <TextInput
                        style={style.textInput}
                        placeholder="mean_value_sd"
                        keyboardType="numeric"
                        autoFocus={true}
                        value={values.mean_value_sd}
                        onChangeText={handleChange("mean_value_sd")}
                        onBlur={handleBlur("mean_value_sd")}
                        editable={!isSubmitting}
                     />
                     <TextInput
                        style={style.textInput}
                        placeholder="geometric_mean"
                        keyboardType="numeric"
                        autoFocus={true}
                        value={values.geometric_mean}
                        onChangeText={handleChange("geometric_mean")}
                        onBlur={handleBlur("geometric_mean")}
                        editable={!isSubmitting}
                     />
                     <TextInput
                        style={style.textInput}
                        placeholder="geometric_mean_sd"
                        keyboardType="numeric"
                        autoFocus={true}
                        value={values.geometric_mean_sd}
                        onChangeText={handleChange("geometric_mean_sd")}
                        onBlur={handleBlur("geometric_mean_sd")}
                        editable={!isSubmitting}
                     />
                     <TextInput
                        style={style.textInput}
                        placeholder="confidence_intervals_min"
                        keyboardType="numeric"
                        autoFocus={true}
                        value={values.confidence_intervals_min}
                        onChangeText={handleChange("confidence_intervals_min")}
                        onBlur={handleBlur("confidence_intervals_min")}
                        editable={!isSubmitting}
                     />
                     <TextInput
                        style={style.textInput}
                        placeholder="confidence_intervals_max"
                        keyboardType="numeric"
                        autoFocus={true}
                        value={values.confidence_intervals_max}
                        onChangeText={handleChange("confidence_intervals_max")}
                        onBlur={handleBlur("confidence_intervals_max")}
                        editable={!isSubmitting}
                     />
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
                        <Text style={style.text}>Tahlil Gir</Text>
                     </TouchableOpacity>
                  </ScrollView>
               </View>
            )}
         </Formik>
      ))
   );
};

export default KlavuzGirScreen;

const width = 320;
const style = StyleSheet.create({
   container: {
      width: "100%",
      flexDirection: "column",
      alignItems: "center",
      padding: 20,
   },
   containerScroll: {
      width: width + 15,
      flexDirection: "column",
      alignItems: "center",
   },
   textInput: {
      borderWidth: 2,
      borderRadius: 15,
      padding: 10,
      fontSize: 18,
      width: width,
      marginTop: 15,
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
      height: 60,
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
