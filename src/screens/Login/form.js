import { View, Text } from "react-native";
import React from "react";

import { useTranslation } from "react-i18next";
import { mylocalizer } from "../../preparations/localizer";

let i18n = mylocalizer(
   "../../../locales/Login/tr.json",
   "../../../locales/Login/en.json"
);

const FormComponent = ({ pStyle }) => {
   const { t, i18n } = useTranslation();

   const changeLanguage = (lang) => {
      i18n.changeLanguage(lang); // Dili değiştir
   };
   return (
      <View style={pStyle}>
         <Text>Form Component</Text>
         <Button title="Türkçe" onPress={() => changeLanguage("tr")} />
         <Button title="English" onPress={() => changeLanguage("en")} />
      </View>
   );
};

export default FormComponent;
