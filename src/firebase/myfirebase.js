import { db, auth, app } from "myfirebase/firebaseconfig"; // Realtime Database referansı
import {
   getFirestore,
   collection,
   addDoc,
   query,
   where,
   getDocs,
   Timestamp,
} from "firebase/firestore";
import {
   sendEmailVerification,
   createUserWithEmailAndPassword,
   signInWithEmailAndPassword,
} from "firebase/auth";
const signIn = async (email, password) => {
   try {
      console.log("email", email);
      console.log("password", password);
      const userCredential = await signInWithEmailAndPassword(
         auth,
         email,
         password
      );
      const user = userCredential.user;
      console.log("Kullanıcı girş yaptı:", user);
      return user;
   } catch (error) {
      console.error("giriş hatası:", error.message);
      throw error;
   }
};
const signUp = async (email, password) => {
   try {
      const userCredential = await createUserWithEmailAndPassword(
         auth,
         email,
         password
      );
      const user = userCredential.user;

      console.log("Kullanıcı kayıt yaptı:", user);
      alert("email'e verification maili gönderildi!");
      await sendEmailVerification(user);
      const dbUser = getUserByEmailAsDoc(email);
      if (dbUser !== null) {
         await setDoc(dbUser.ref, {
            role: "role1", // Örneğin 'user', 'doctor', 'admin'
         });
      }
      return user;
   } catch (error) {
      console.error("kayit hatası:", error.message);
      throw error;
   }
};

const addUser = async (user) => {
   try {
      const docRef = await addDoc(collection(db, "users"), {
         name: user.name,
         surname: user.surname,
         TC: user.TC,
         gender: user.gender,
         birth_date: user.birth_date,
         role_id: "role1",
      });

      console.log("Document written with ID: ", docRef.id);
      return docRef;
   } catch (e) {
      console.error("Error adding document: ", e);
      return null;
   }
};
const getUserByEmailAsDoc = async (email) => {
   try {
      const q = query(collection(db, "users"), where("email", "==", email));
      const querySnapshot = await getDocs(q);
      // console.log("querySnapshot", querySnapshot);
      if (querySnapshot.empty) {
         return null;
      }
      console.log("querySnapshot[0]", querySnapshot.docs[0]);

      return querySnapshot.docs[0];
   } catch (error) {
      throw error;
   }
};

const addAnalysis = async (analysis) => {
   try {
      const docRef = await addDoc(collection(db, "analysis"), {
         hospital_name: analysis.hospital_name,
         doctor_id: analysis.doctor_id,
         numune_alma_zamani: Timestamp.fromDate(analysis.numune_alma_zamani),
         numune_kabul_zamani: Timestamp.fromDate(analysis.numune_kabul_zamani),
         numune_turu: analysis.numune_turu,
         rapor_grubu: analysis.rapor_grubu,
         tetkik_istek_zamani: Timestamp.fromDate(analysis.tetkik_istek_zamani),
         user_id: analysis.user_id,
         uzman_onay_kabul_zamani: Timestamp.fromDate(
            analysis.uzman_onay_kabul_zamani
         ),
      });
      console.log("Document written with ID: ", docRef.id);
      return docRef;
   } catch (e) {
      console.error("Error adding document: ", e);
      throw e;
   }
};

const getUsers = async () => {
   try {
      const dizi = [];
      const querySnapshot = await getDocs(collection(db, "users"));
      querySnapshot.forEach((doc) => {
         dizi.push({
            id: doc.id,
            email: doc.data().email,
         });
         console.log(doc.id, " => ", doc.data()); // Her document'in ID'sini ve verisini alıyoruz
      });
      console.log("auth curren user", " => ", auth.currentUser.email); // Her document'in ID'sini ve verisini alıyoruz
      return dizi;
   } catch (error) {
      console.error("Error getting documents: ", error);
      throw error;
   }
};

const myfirebase = {
   addUser: addUser,
   signIn: signIn,
   signUp: signUp,
   addAnalysis: addAnalysis,
   getUsers: getUsers,
};

export default myfirebase;
