import { StyleSheet } from "react-native";

// import * as Font from "expo-font"; // react-native karşılıklarını bulup yapmak gerek
// import AppLoading from "expo-app-loading"; //

// const loadFonts = async () => {
//    await Font.loadAsync({
//       "Montserrat-Regular": require("./assets/fonts/Montserrat-Regular.ttf"),
//       "Montserrat-Bold": require("./assets/fonts/Montserrat-Bold.ttf"),
//    });
// };
// loadFonts();
const textStyles = StyleSheet.create({
   header: {
      // fontFamily: "Montserrat-Regular",
      fontSize: 20,
      fontWeight: "bold",
      fontStyle: "normal",
   },
   plain: {
      fontSize: 15,
      fontWeight: "normal",
      fontStyle: "normal",
   },
});

const styles = {
   text: textStyles,
};

export default styles;
