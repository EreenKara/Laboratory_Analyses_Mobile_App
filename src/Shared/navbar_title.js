import { Image, StyleSheet } from "react-native";
import navlogo from "assets/Shared/navlogo.png";

const NavBarTitle = () => {
   return <Image style={style.imagestyle} source={navlogo} />;
};

const style = StyleSheet.create({
   imagestyle: {
      height: 60,
      width: 60,
      resizeMode: "contain",
   },
});

export default NavBarTitle;
