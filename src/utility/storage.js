/*
    Özellik storage kısmı expo ve normal react-native'de baya farklı oluyor

    EXPO ve REACT-NATIVE'de ortak :
        Güvensiz.
            AsyncStorage, // buna kendimiz bir tane şifreleme katmanı ekleyebiliriz. Ama yinede secure olanlar kadar güvenli olmayabilir.

    EXPO:
        Güvenli.
            SecureStore
    
    
    REACT-NATIVE:
        Güvenli.
            react-native-encrypted-storage
            react-native-keychain
            react-native-secure-storage - AES256 kullanıyor yani çöpten hallice
    

    AŞAĞIDAKİLERİ TEST ETMEDİM ETMEM GEREK

    BURADAki benim oluştruduğum sınıfarda farklı farklı kütüphaneler kullanlıabilir
    Ben bu sınıflar sayesinde onları soyutladım. Hepsi

    Şifreler ilişkisel tabloda salt ve tek taraflı hash fonskiyonalr kullanılarak saklamansı gerekyior diyor
    Salt rastgele bir değer oluyor bu veritabanında direkt kaydediliyor
    şifre ise -> "şifre"+"saltdeğer" yapılıyor sonra hash'i alınıyor. 
    Kullanıcı şifre giriyor. Kullıncıının şfiresi + saltdeğer yapılıyor hash alınıyor ve veri tabanındaki hash ile karşılaştırılıyor


    Aşağıdakileri ortak bir itnerface altına topalyabilirsin isteren typescripte geçince

    Kendimiz güvenlik için şifreleyerek kaydetme işlemi yapabiliriz Ancak normalde donanımsal olarka şifreleme ypaıyormuş
    burdaki kütüphaneler.
    Bu yüzden kendimiz yaparsak nasıl olur bilemedim araştırılabilir.

*/

import AsyncStorage from "@react-native-async-storage/async-storage";
const SecureStore = require("expo-secure-store"); // denemek için require yaptım

/*
    Bu genel oalrak uygulamada önemli verileri saklamak için kullanılıyor örneğin jwt token felan.
*/
class SecureStorage {
   constructor() {}
   async store(key, value) {
      try {
         await SecureStore.setItemAsync(key, value);
         console.log("Veri başarıyla kaydedildi!");
      } catch (error) {
         console.error("Veri kaydedilirken hata oluştu:", error);
      }
   }
   async getData(key) {
      try {
         const value = await SecureStore.getItemAsync(key);
         if (value) {
            console.log("Veri okundu:", value);
         } else {
            console.log("Veri bulunamadı");
         }
      } catch (error) {
         console.error("Veri okunurken hata oluştu:", error);
      }
   }
   async removeData(key) {
      try {
         await SecureStore.deleteItemAsync(key);
         console.log("Veri başarıyla silindi!");
      } catch (error) {
         console.error("Veri silinirken hata oluştu:", error);
      }
   }
}

/*
    Bu genel oalrak uygulama dandik özelliklerini sakalmak için kullanılıyormuş
    örneğin tema'nın dark mı aydınlık mı olması felan
*/
class PropertyStorage {
   constructor() {}
   async store(key, value) {
      try {
         await AsyncStorage.setItem(key, value);
      } catch (e) {
         console.error("Error storing value", e);
      }
   }
   async getData(key) {
      try {
         const value = await AsyncStorage.getItem(key);
         if (value !== null) {
            console.log(value); // 'some value'
         }
      } catch (e) {
         console.error("Error reading value", e);
      }
   }
   async removeData(key) {
      try {
         await AsyncStorage.removeItem(key);
      } catch (e) {
         console.error("Error removing value", e);
      }
   }
}

export { SecureStorage, PropertyStorage };
