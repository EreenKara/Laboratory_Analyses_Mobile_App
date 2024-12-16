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
   const [TC, setTC] = useState(0);
   const [password, setPassword] = useState("");

   const handleSubmit = () => {
      const user = {
         TC: TC,
         password: password,
      };
   };

   return (
      <View style={{ flex: 1, width: "100%" }}>
         <TextInput
            style={style.textInput}
            placeholder="TC"
            keyboardType="numeric"
            autoFocus={true}
            placeholderTextColor="#929292"
            clearButtonMode="always"
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
            <Text style={style.text}>Kayıt Olun</Text>
         </TouchableOpacity>
      </View>
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
{
   /* <FlatList 
                      ListHeaderComponent={renderHeader}
                      data={data}
                      keyExtractor={ item => item.name.first}
                      renderItem={ ({item}) => (
                              <View style={styles.listItem}>
                                  <Image
                                        source={{ uri: item.picture.large }}
                                        style={styles.coverImage} 
                                  />

                                  <View style={styles.metaInfo}>
                                        <Text style={styles.title}> {`${item.name.first} ${item.name.last}`} </Text>
                                        <Text style={styles.title}>Age: {`${item.dob.age} ${item.location.country}`}</Text>
                                  </View>

                              </View>
                      )}
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
