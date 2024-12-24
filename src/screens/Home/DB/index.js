import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import * as SQLite from "expo-sqlite";
import mySqlLite from "myutility/sqllite_storage";

const DBScreen = () => {
   const yazdir = () => {
      console.log("roles:");
      const roles = mySqlLite.getRoles();
      roles.forEach((role) => {
         console.log(role);
      });

      console.log("users:");
      const users = mySqlLite.getUsers();
      users.forEach((user) => {
         console.log(user);
      });
   };
   yazdir();
   return (
      <View>
         <Text>Naber</Text>
         <TouchableOpacity
            style={style.button}
            onPress={() => {
               console.log("basildi");
               mySqlLite.deleteDatabase();
            }}
         >
            <Text style={style.text}>DB SİL</Text>
         </TouchableOpacity>
         <TouchableOpacity
            style={style.button}
            onPress={() => {
               mySqlLite.createDatabase();
            }}
         >
            <Text style={style.text}>DB create</Text>
         </TouchableOpacity>
         <TouchableOpacity
            style={style.button}
            onPress={() => {
               mySqlLite.seedData();
            }}
         >
            <Text style={style.text}>DB Seed Data</Text>
         </TouchableOpacity>
      </View>
   );
};

export default DBScreen;

const style = StyleSheet.create({
   button: {
      backgroundColor: "red",
      width: 100,
      height: 100,
      justifyContent: "center",
   },
   text: {
      textAlign: "center",
   },
});
