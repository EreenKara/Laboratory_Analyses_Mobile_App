import { View, Text, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import ItemComponent from "./item.js";
import LoadingComponent from "myshared/loading";

const fakeVeri = {
   name: "Eren",
   age: 23,
};

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const fetchData = async (setData, setLoading) => {
   console.log("Veri çekme işlemi başladi...");
   await sleep(4000); // 2 saniye bekle
   console.log("Bekleme  tamamlandi.");
   fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((resJson) => setData(resJson))
      .finally(() => setLoading(false));
   console.log("Veri çekme tamamlandi.");
};

const APIScreen = () => {
   const [data, setData] = useState([]);
   const [loading, setLoading] = useState(true);

   useEffect(() => {
      fetchData(setData, setLoading);
      return () => {
         setData([]);
         setLoading(true);
      };
   }, []);
   return (
      <View style={[{ flex: 1 }]}>
         {loading ? (
            <LoadingComponent />
         ) : (
            <>
               <FlatList
                  data={data}
                  keyExtractor={(item) => item.id}
                  renderItem={({ item }) => <ItemComponent item={item} />}
               />
               <View>
                  <Text>{JSON.stringify(fakeVeri, null, 2)}</Text>
               </View>
            </>
         )}
      </View>
   );
};

export default APIScreen;
