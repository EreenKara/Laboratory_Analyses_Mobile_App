import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import * as Localization from "react-native-localize";

// Kullanıcının cihaz dilini algıla

const mylocalizer = (trFilePath, enFilePath) => {
   const resources = {
      tr: { translation: require(trFilePath) },
      en: { translation: require(enFilePath) },
   };
   const languageDetector = {
      type: "languageDetector",
      async: false,
      detect: (callback) => {
         const locales = Localization.getLocales();
         return locales[0]?.languageCode || "tr";
      },
      init: () => {},
      cacheUserLanguage: () => {},
   };
   return i18n
      .use(languageDetector)
      .use(initReactI18next)
      .init({
         resources,
         fallbackLng: "tr", // Dil bulunamazsa kullanılacak dil
         interpolation: {
            escapeValue: false,
         },
      });
};
export default mylocalizer;
