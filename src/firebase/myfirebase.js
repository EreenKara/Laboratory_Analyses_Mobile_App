import { db, auth, app } from "myfirebase/firebaseconfig"; // Realtime Database referansı
import {
   getFirestore,
   collection,
   addDoc,
   query,
   where,
   doc,
   getDocs,
   getDoc,
   setDoc,
   Timestamp,
} from "firebase/firestore";
import {
   sendEmailVerification,
   createUserWithEmailAndPassword,
   signInWithEmailAndPassword,
} from "firebase/auth";
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";
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
      // const dbUser = getUserByEmailAsDoc(email);
      // if (dbUser !== null) {
      //    await setDoc(dbUser.ref, {
      //       role: "role1", // Örneğin 'user', 'doctor', 'admin'
      //    });
      // }
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
         email: auth.currentUser.email,
         // role_id: "role1",
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

const addAnalysis = async (analysis, inputs) => {
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

      const analysis_elements_Collection = collection(db, "analysis_elements");
      console.log("elements ", inputs);
      console.log("docRef ", docRef.id);
      for (const input of inputs) {
         const docRefAEC = await addDoc(analysis_elements_Collection, {
            analysis_id: docRef.id,
            element_id: input.element_id,
            value: input.value,
         });
      }
      return docRef;
   } catch (e) {
      console.error("Error adding document: ", e);
      throw e;
   }
};

const getGuides = async () => {
   try {
      const dizi = [];
      const querySnapshot = await getDocs(collection(db, "guides"));
      querySnapshot.forEach((doc) => {
         dizi.push(doc.data());
      });
      return dizi;
   } catch (error) {
      console.error("Error getting documents: ", error);
      throw error;
   }
};
const getGuidesByAge = async (age) => {
   // burada direkt age veremezsin. Bütün hepsin
   try {
      const dizi = [];
      const querySnapshot = await getDocs(collection(db, "guides"));
      querySnapshot.forEach((doc) => {
         dizi.push(doc.data());
      });
      return dizi;
   } catch (error) {
      console.error("Error getting documents: ", error);
      throw error;
   }
};
const getGuidesByElement = async (element_id) => {
   // burada direkt age veremezsin. Bütün hepsin
   try {
      const dizi = [];
      const querySnapshot = await getDocs(collection(db, "guides"));
      querySnapshot.forEach((doc) => {
         dizi.push(doc.data());
      });
      return dizi;
   } catch (error) {
      console.error("Error getting documents: ", error);
      throw error;
   }
};
const getRoles = async () => {
   try {
      const dizi = [];
      const querySnapshot = await getDocs(collection(db, "roles"));
      querySnapshot.forEach((doc) => {
         dizi.push({
            id: doc.id,
            role_name: doc.data().role_name,
         });
         console.log(doc.id, " => ", doc.data()); // Her document'in ID'sini ve verisini alıyoruz
      });
      return dizi;
   } catch (error) {
      console.error("Error getting documents: ", error);
      throw error;
   }
};

const getElements = async () => {
   try {
      const dizi = [];
      const querySnapshot = await getDocs(collection(db, "elements"));
      querySnapshot.forEach((doc) => {
         dizi.push({
            id: doc.id,
            name: doc.data().name,
         });
      });
      console.log("element id", dizi[0].id);
      return dizi;
   } catch (error) {
      console.error("Error getting documents: ", error);
      throw error;
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
      });
      return dizi;
   } catch (error) {
      console.error("Error getting documents: ", error);
      throw error;
   }
};

const getUserRoleByEmail = async (email) => {
   try {
      const userEmail = email;
      if (!userEmail) {
         throw new Error("User not authenticated.");
      }
      // users_roles koleksiyonundaki document ID'si ile e-posta eşleştiği için
      const docRef = doc(db, "users_roles", userEmail); // Doc ID = userEmail

      // Belirtilen document'i almak için getDoc kullanıyoruz
      const docSnapshot = await getDoc(docRef);

      if (!docSnapshot.exists()) {
         console.log("No matching document found.");
         return null;
      }
      return docSnapshot.data().role_id;
   } catch (error) {
      throw error;
   }
};

const addGuide = async (guide) => {
   try {
      const docRef = await addDoc(collection(db, "guides"), {
         max_age: guide.max_age,
         min_age: guide.min_age,
         age_format: guide.age_format,
         subject_number: guide.subject_number,
         min_value: guide.min_value,
         max_value: guide.max_value,
         mean_value: guide.mean_value,
         mean_value_sd: guide.mean_value_sd,
         geometric_mean: guide.geometric_mean,
         geometric_mean_sd: guide.geometric_mean_sd,
         confidence_intervals_min: guide.confidence_intervals_min,
         confidence_intervals_max: guide.confidence_intervals_max,
         element_id: guide.element_id,
      });
      console.log("Document written with ID: ", docRef.id);
      return docRef;
   } catch (e) {
      console.error("Error adding document: ", e);
      throw e;
   }
};

const myfirebase = {
   addUser: addUser,
   signIn: signIn,
   signUp: signUp,
   getUserByEmailAsDoc: getUserByEmailAsDoc,
   addAnalysis: addAnalysis,
   getUsers: getUsers,
   getRoles: getRoles,
   getElements: getElements,
   getGuides: getGuides,
   addGuide: addGuide,
   getGuidesByElement: getGuidesByElement,
   getUserRoleByEmail: getUserRoleByEmail,
};

export default myfirebase;
