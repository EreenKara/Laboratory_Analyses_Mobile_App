// /*
// kullanmıyorum
// */

// const functions = require("firebase-functions");
// const admin = require("firebase-admin");
// admin.initializeApp();

// // Custom Claims Ayarlama Fonksiyonu
// exports.setCustomClaims = functions.https.onCall(async (data, context) => {
//    // Admin kontrolü
//    if (!context.auth || !context.auth.token.admin) {
//       throw new functions.https.HttpsError(
//          "permission-denied",
//          "Bu işlemi yapmak için admin yetkisine sahip olmanız gerekiyor."
//       );
//    }

//    const { uid, claims } = data;

//    // Kullanıcıya Custom Claims ekleme
//    await admin.auth().setCustomUserClaims(uid, claims);
//    return {
//       message: `User ${uid} has been updated with claims: ${JSON.stringify(
//          claims
//       )}.`,
//    };
// });
