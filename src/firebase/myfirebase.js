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

const updateUser = async (id, user) => {
   try {
      const userRef = doc(db, "users", id);
      await setDoc(userRef, {
         name: user.name,
         surname: user.surname,
         TC: user.TC,
         gender: user.gender,
         birth_date: user.birth_date,
         email: auth.currentUser.email,
      });

      return docRef;
   } catch (e) {
      console.error("Error adding document: ", e);
      return null;
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

      return querySnapshot.docs[0];
   } catch (error) {
      throw error;
   }
};
const getUserByIdAsDoc = async (id) => {
   try {
      const userDocRef = doc(db, "users", id);
      const docVeri = await getDoc(userDocRef);
      if (docVeri.exists()) {
         return docVeri; // Sadece veriyi döndür
      } else {
         console.log("Document not found!");
         return null; // Eğer doküman bulunmazsa null döndür
      }
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
const getGuidesByElement = async (elementId) => {
   // burada direkt age veremezsin. Bütün hepsin
   try {
      const dizi = [];
      const q = query(
         collection(db, "guides"),
         where("element_id", "==", elementId)
      );
      const querySnapshot = await getDocs(q);
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
      return dizi;
   } catch (error) {
      console.error("Error getting documents: ", error);
      throw error;
   }
};
const getAnalysisElementsByDate = async (userId, elementId, tarih) => {
   try {
   } catch (error) {}
};
const getAnalysisWithElements = async (userId) => {
   try {
      const dizi = [];
      console.log("userid:", userId);
      const user = await getUserByIdAsDoc(userId);
      const analysisCollection = collection(db, "analysis");
      const queryAnalysis = query(
         analysisCollection,
         where("user_id", "==", user.id)
      );
      const querySnapshot = await getDocs(queryAnalysis);
      if (!querySnapshot.empty) {
         // const analysisId = querySnapshot.docs[0].id; // İlk dokümanı al
         const analysis_elementsCollection = collection(
            db,
            "analysis_elements"
         );
         // const queryElements = query(
         //    analysis_elementsCollection,
         //    where("analysis_id", "==", analysisId)
         // );

         await Promise.all(
            querySnapshot.docs.map(async (doc) => {
               const queryElements = query(
                  analysis_elementsCollection,
                  where("analysis_id", "==", doc.id)
               );

               const querySnapshotElements = await getDocs(queryElements);
               dizi.push({
                  id: doc.id,
                  hospital_name: doc.data().hospital_name,
                  doctor_id: doc.data().doctor_id,
                  numune_alma_zamani: doc.data().numune_alma_zamani.toDate(),
                  numune_kabul_zamani: doc.data().numune_kabul_zamani.toDate(),
                  numune_turu: doc.data().numune_turu,
                  rapor_grubu: doc.data().rapor_grubu,
                  tetkik_istek_zamani: doc.data().tetkik_istek_zamani.toDate(),
                  user_id: doc.data().user_id,
                  uzman_onay_kabul_zamani: doc
                     .data()
                     .uzman_onay_kabul_zamani.toDate(),
                  perElement: querySnapshotElements.docs.map((docElement) => ({
                     element_id: docElement.data().element_id,
                     value: docElement.data().value,
                  })),
               });
            })
         );
         // querySnapshot.forEach((doc) => {
         //    const queryElements = query(
         //       analysis_elementsCollection,
         //       where("analysis_id", "==", doc.id)
         //    );

         //    getDocs(queryElements).then((querySnapshotElements) => {
         //       dizi.push({
         //          id: doc.id,
         //          hospital_name: doc.data().hospital_name,
         //          doctor_id: doc.data().doctor_id,
         //          numune_alma_zamani: doc.data().numune_alma_zamani.toDate(),
         //          numune_kabul_zamani: doc.data().numune_kabul_zamani.toDate(),
         //          numune_turu: doc.data().numune_turu,
         //          rapor_grubu: doc.data().rapor_grubu,
         //          tetkik_istek_zamani: doc.data().tetkik_istek_zamani.toDate(),
         //          user_id: doc.data().user_id,
         //          uzman_onay_kabul_zamani: doc
         //             .data()
         //             .uzman_onay_kabul_zamani.toDate(),
         //          perElement: querySnapshotElements.docs.map((docElement) => {
         //             return {
         //                element_id: docElement.data().element_id,
         //                value: docElement.data().value,
         //             };
         //          }),
         //       });
         //    });
         // });
      }

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
const getUsersWithData = async () => {
   try {
      const dizi = [];
      const querySnapshot = await getDocs(collection(db, "users"));
      querySnapshot.forEach((doc) => {
         dizi.push({
            id: doc.id,
            email: doc.data().email,
            name: doc.data().name,
            surname: doc.data().surname,
            TC: doc.data().TC,
            gender: doc.data().gender,
            birth_date: doc.data().birth_date.toDate(),
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

const loadJsonData = async () => {
   try {
      const veri = {
         guides: [
            {
               min_age: 0,
               max_age: 5,
               min_value: 0.07,
               max_value: 0.37,
               age_format: "Month",
               element_id: "IgA",
            },
            {
               min_age: 5,
               max_age: 9,
               min_value: 0.16,
               max_value: 0.5,
               age_format: "Month",
               element_id: "IgA",
            },
            {
               min_age: 9,
               max_age: 15,
               min_value: 0.27,
               max_value: 0.66,
               age_format: "Month",
               element_id: "IgA",
            },
            {
               min_age: 15,
               max_age: 24,
               min_value: 0.36,
               max_value: 0.79,
               age_format: "Month",
               element_id: "IgA",
            },
            {
               min_age: 2,
               max_age: 4,
               min_value: 0.27,
               max_value: 2.46,
               age_format: "Year",
               element_id: "IgA",
            },
            {
               min_age: 4,
               max_age: 7,
               min_value: 0.29,
               max_value: 2.56,
               age_format: "Year",
               element_id: "IgA",
            },
            {
               min_age: 7,
               max_age: 10,
               min_value: 0.34,
               max_value: 2.74,
               age_format: "Year",
               element_id: "IgA",
            },
            {
               min_age: 10,
               max_age: 13,
               min_value: 0.42,
               max_value: 2.95,
               age_format: "Year",
               element_id: "IgA",
            },
            {
               min_age: 13,
               max_age: 16,
               min_value: 0.52,
               max_value: 3.19,
               age_format: "Year",
               element_id: "IgA",
            },
            {
               min_age: 16,
               max_age: 18,
               min_value: 0.6,
               max_value: 3.37,
               age_format: "Year",
               element_id: "IgA",
            },
            {
               min_age: 18,
               max_age: null,
               min_value: 0.61,
               max_value: 3.56,
               age_format: "Year",
               element_id: "IgA",
            },
            {
               min_age: 0,
               max_age: 5,
               min_value: 0.26,
               max_value: 1.22,
               age_format: "Month",
               element_id: "IgM",
            },
            {
               min_age: 5,
               max_age: 9,
               min_value: 0.32,
               max_value: 1.32,
               age_format: "Month",
               element_id: "IgM",
            },
            {
               min_age: 9,
               max_age: 15,
               min_value: 0.4,
               max_value: 1.43,
               age_format: "Month",
               element_id: "IgM",
            },
            {
               min_age: 15,
               max_age: 24,
               min_value: 0.46,
               max_value: 1.52,
               age_format: "Month",
               element_id: "IgM",
            },
            {
               min_age: 2,
               max_age: 4,
               min_value: 0.37,
               max_value: 1.84,
               age_format: "Year",
               element_id: "IgM",
            },
            {
               min_age: 4,
               max_age: 7,
               min_value: 0.37,
               max_value: 2.24,
               age_format: "Year",
               element_id: "IgM",
            },
            {
               min_age: 7,
               max_age: 10,
               min_value: 0.38,
               max_value: 2.51,
               age_format: "Year",
               element_id: "IgM",
            },
            {
               min_age: 10,
               max_age: 13,
               min_value: 0.41,
               max_value: 2.55,
               age_format: "Year",
               element_id: "IgM",
            },
            {
               min_age: 13,
               max_age: 16,
               min_value: 0.45,
               max_value: 2.44,
               age_format: "Year",
               element_id: "IgM",
            },
            {
               min_age: 16,
               max_age: 18,
               min_value: 0.49,
               max_value: 2.01,
               age_format: "Year",
               element_id: "IgM",
            },
            {
               min_age: 18,
               max_age: null,
               min_value: 0.37,
               max_value: 2.86,
               age_format: "Year",
               element_id: "IgM",
            },
            {
               min_age: 0,
               max_age: 5,
               min_value: 1.0,
               max_value: 1.34,
               age_format: "Month",
               element_id: "IgG",
            },
            {
               min_age: 5,
               max_age: 9,
               min_value: 1.64,
               max_value: 5.88,
               age_format: "Month",
               element_id: "IgG",
            },
            {
               min_age: 9,
               max_age: 15,
               min_value: 2.46,
               max_value: 9.04,
               age_format: "Month",
               element_id: "IgG",
            },
            {
               min_age: 15,
               max_age: 24,
               min_value: 3.13,
               max_value: 11.7,
               age_format: "Month",
               element_id: "IgG",
            },
            {
               min_age: 2,
               max_age: 4,
               min_value: 2.95,
               max_value: 11.56,
               age_format: "Year",
               element_id: "IgG",
            },
            {
               min_age: 4,
               max_age: 7,
               min_value: 3.86,
               max_value: 14.7,
               age_format: "Year",
               element_id: "IgG",
            },
            {
               min_age: 7,
               max_age: 10,
               min_value: 4.62,
               max_value: 16.82,
               age_format: "Year",
               element_id: "IgG",
            },
            {
               min_age: 10,
               max_age: 13,
               min_value: 5.03,
               max_value: 15.8,
               age_format: "Year",
               element_id: "IgG",
            },
            {
               min_age: 13,
               max_age: 16,
               min_value: 5.09,
               max_value: 15.8,
               age_format: "Year",
               element_id: "IgG",
            },
            {
               min_age: 16,
               max_age: 18,
               min_value: 4.87,
               max_value: 13.27,
               age_format: "Year",
               element_id: "IgG",
            },
            {
               min_age: 18,
               max_age: null,
               min_value: 7.67,
               max_value: 15.9,
               age_format: "Year",
               element_id: "IgG",
            },
            {
               min_age: 0,
               max_age: 5,
               min_value: 0.56,
               max_value: 2.15,
               age_format: "Month",
               element_id: "IgG1",
            },
            {
               min_age: 5,
               max_age: 9,
               min_value: 1.02,
               max_value: 3.69,
               age_format: "Month",
               element_id: "IgG1",
            },
            {
               min_age: 9,
               max_age: 15,
               min_value: 1.6,
               max_value: 5.62,
               age_format: "Month",
               element_id: "IgG1",
            },
            {
               min_age: 15,
               max_age: 24,
               min_value: 2.09,
               max_value: 7.2,
               age_format: "Month",
               element_id: "IgG1",
            },
            {
               min_age: 2,
               max_age: 4,
               min_value: 1.58,
               max_value: 7.21,
               age_format: "Year",
               element_id: "IgG1",
            },
            {
               min_age: 4,
               max_age: 7,
               min_value: 2.09,
               max_value: 9.02,
               age_format: "Year",
               element_id: "IgG1",
            },
            {
               min_age: 7,
               max_age: 10,
               min_value: 2.53,
               max_value: 10.1,
               age_format: "Year",
               element_id: "IgG1",
            },
            {
               min_age: 10,
               max_age: 13,
               min_value: 2.8,
               max_value: 10.3,
               age_format: "Year",
               element_id: "IgG1",
            },
            {
               min_age: 13,
               max_age: 16,
               min_value: 2.89,
               max_value: 9.3,
               age_format: "Year",
               element_id: "IgG1",
            },
            {
               min_age: 16,
               max_age: 18,
               min_value: 2.83,
               max_value: 7.7,
               age_format: "Year",
               element_id: "IgG1",
            },
            {
               min_age: 18,
               max_age: null,
               min_value: 3.41,
               max_value: 8,
               age_format: "Year",
               element_id: "IgG1",
            },
            {
               min_age: 0,
               max_age: 5,
               min_value: 0,
               max_value: 0.82,
               age_format: "Month",
               element_id: "IgG2",
            },
            {
               min_age: 5,
               max_age: 9,
               min_value: 0,
               max_value: 0.89,
               age_format: "Month",
               element_id: "IgG2",
            },
            {
               min_age: 9,
               max_age: 15,
               min_value: 0.24,
               max_value: 0.98,
               age_format: "Month",
               element_id: "IgG2",
            },
            {
               min_age: 15,
               max_age: 24,
               min_value: 0.35,
               max_value: 1.05,
               age_format: "Month",
               element_id: "IgG2",
            },
            {
               min_age: 2,
               max_age: 4,
               min_value: 0.39,
               max_value: 1.76,
               age_format: "Year",
               element_id: "IgG2",
            },
            {
               min_age: 4,
               max_age: 7,
               min_value: 0.44,
               max_value: 3.16,
               age_format: "Year",
               element_id: "IgG2",
            },
            {
               min_age: 7,
               max_age: 10,
               min_value: 0.54,
               max_value: 4.35,
               age_format: "Year",
               element_id: "IgG2",
            },
            {
               min_age: 10,
               max_age: 13,
               min_value: 0.66,
               max_value: 5.02,
               age_format: "Year",
               element_id: "IgG2",
            },
            {
               min_age: 13,
               max_age: 16,
               min_value: 0.82,
               max_value: 5.16,
               age_format: "Year",
               element_id: "IgG2",
            },
            {
               min_age: 16,
               max_age: 18,
               min_value: 0.98,
               max_value: 4.86,
               age_format: "Year",
               element_id: "IgG2",
            },
            {
               min_age: 18,
               max_age: null,
               min_value: 1.71,
               max_value: 6.32,
               age_format: "Year",
               element_id: "IgG2",
            },
            {
               min_age: 0,
               max_age: 5,
               min_value: 0.07,
               max_value: 8.23,
               age_format: "Month",
               element_id: "IgG3",
            },
            {
               min_age: 5,
               max_age: 9,
               min_value: 0.119,
               max_value: 0.74,
               age_format: "Month",
               element_id: "IgG3",
            },
            {
               min_age: 9,
               max_age: 15,
               min_value: 0.173,
               max_value: 0.637,
               age_format: "Month",
               element_id: "IgG3",
            },
            {
               min_age: 15,
               max_age: 24,
               min_value: 0.219,
               max_value: 0.55,
               age_format: "Month",
               element_id: "IgG3",
            },
            {
               min_age: 2,
               max_age: 4,
               min_value: 0.17,
               max_value: 0.847,
               age_format: "Year",
               element_id: "IgG3",
            },
            {
               min_age: 4,
               max_age: 7,
               min_value: 0.108,
               max_value: 0.949,
               age_format: "Year",
               element_id: "IgG3",
            },
            {
               min_age: 7,
               max_age: 10,
               min_value: 0.085,
               max_value: 1.06,
               age_format: "Year",
               element_id: "IgG3",
            },
            {
               min_age: 10,
               max_age: 13,
               min_value: 0.115,
               max_value: 0.53,
               age_format: "Year",
               element_id: "IgG3",
            },
            {
               min_age: 13,
               max_age: 16,
               min_value: 0.2,
               max_value: 1.032,
               age_format: "Year",
               element_id: "IgG3",
            },
            {
               min_age: 16,
               max_age: 18,
               min_value: 0.313,
               max_value: 0.976,
               age_format: "Year",
               element_id: "IgG3",
            },
            {
               min_age: 18,
               max_age: null,
               min_value: 0.184,
               max_value: 1.06,
               age_format: "Year",
               element_id: "IgG3",
            },
            {
               min_age: 0,
               max_age: 5,
               min_value: 0,
               max_value: 0.198,
               age_format: "Month",
               element_id: "IgG4",
            },
            {
               min_age: 5,
               max_age: 9,
               min_value: 0,
               max_value: 0.208,
               age_format: "Month",
               element_id: "IgG4",
            },
            {
               min_age: 9,
               max_age: 15,
               min_value: 0,
               max_value: 0.22,
               age_format: "Month",
               element_id: "IgG4",
            },
            {
               min_age: 15,
               max_age: 24,
               min_value: 0,
               max_value: 0.23,
               age_format: "Month",
               element_id: "IgG4",
            },
            {
               min_age: 2,
               max_age: 4,
               min_value: 0.004,
               max_value: 0.491,
               age_format: "Year",
               element_id: "IgG4",
            },
            {
               min_age: 4,
               max_age: 7,
               min_value: 0.008,
               max_value: 0.819,
               age_format: "Year",
               element_id: "IgG4",
            },
            {
               min_age: 7,
               max_age: 10,
               min_value: 0.01,
               max_value: 1.087,
               age_format: "Year",
               element_id: "IgG4",
            },
            {
               min_age: 10,
               max_age: 13,
               min_value: 0.01,
               max_value: 1.219,
               age_format: "Year",
               element_id: "IgG4",
            },
            {
               min_age: 13,
               max_age: 16,
               min_value: 0.007,
               max_value: 1.217,
               age_format: "Year",
               element_id: "IgG4",
            },
            {
               min_age: 16,
               max_age: 18,
               min_value: 0.003,
               max_value: 1.11,
               age_format: "Year",
               element_id: "IgG4",
            },
            {
               min_age: 18,
               max_age: null,
               min_value: 0.024,
               max_value: 1.21,
               age_format: "Year",
               element_id: "IgG4",
            },
         ],
      };
      const colS = collection(db, "guides");
      await Promise.all(
         veri.guides.forEach((element) => {
            console.log("ekleniyor");
            addDoc(colS, element);
         })
      );
   } catch (error) {
      console.error("Dosya okuma hatası:", error);
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
      return docRef;
   } catch (e) {
      console.error("Error adding document: ", e);
      throw e;
   }
};

const myfirebase = {
   addUser: addUser,
   updateUser: updateUser,
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
   getUsersWithData: getUsersWithData,
   getUserRoleByEmail: getUserRoleByEmail,
   getAnalysisWithElements: getAnalysisWithElements,
   getUserByIdAsDoc: getUserByIdAsDoc,
   getAnalysisElementsByDate: getAnalysisElementsByDate,
};

export default myfirebase;
