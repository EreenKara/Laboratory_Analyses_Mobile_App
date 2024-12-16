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

const width = Dimensions.get("window").width / 1.4;

const FormComponent = () => {
   const navigation = useNavigation();
   const [name, setName] = useState("");
   const [surname, setSurname] = useState("");
   const [TC, setTC] = useState();
   const [password, setPassword] = useState("");
   return (
      <View style={{ flex: 1, width: "100%" }}>
         <TextInput
            style={style.textInput}
            placeholder="İsim"
            keyboardType="default"
            autoFocus={true}
            value={name}
            onChangeText={(text) => setName(text)}
         />
         <TextInput
            style={style.textInput}
            placeholder="Soyisim"
            keyboardType="default"
            value={surname}
            onChangeText={(text) => setSurname(text)}
         />
         <TextInput
            style={style.textInput}
            placeholder="TC"
            keyboardType="numeric"
            placeholderTextColor="#929292"
            value={TC}
            onChangeText={(text) => setTC(text)}
         />
         <TextInput
            style={style.textInput}
            placeholder="Sifre"
            secureTextEntry={true}
            value={password}
            onChangeText={(text) => setPassword(text)}
         />
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
});

export default FormComponent;
