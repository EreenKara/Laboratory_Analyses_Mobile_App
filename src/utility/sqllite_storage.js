/*
 Eğerki backend olursa bir gün buradaki fonksiyonların içeriğindeki sql sorguları yerine fetch kullan.
 Böylece her şey aynı kalırken kolayca backend'e geçmiş oluruz.
*/

import { Text, View } from "react-native";

import * as SQLite from "expo-sqlite";
import * as FileSystem from "expo-file-system";

const dbName = "mydatabase.db";

//  # işareti private demek.
const createDatabase = () => {
   const db = SQLite.openDatabaseSync(dbName);
   db.execSync(`
             CREATE TABLE IF NOT EXISTS roles (id INTEGER PRIMARY KEY, role_name TEXT UNIQUE NOT NULL);
         
         
         CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT,
             name TEXT,
             surname TEXT,
             password TEXT,
             TC TEXT NOT NULL UNIQUE,
             gender TEXT,
             birth_date TEXT,
             role_id INTEGER,
             FOREIGN KEY(role_id) REFERENCES roles(id));
             
             
             CREATE TABLE IF NOT EXISTS users_roles 
            (id INTEGER PRIMARY KEY,
            user_id INTEGER,
            role_id INTEGER,
            FOREIGN KEY(user_id) REFERENCES users(id),
            FOREIGN KEY(role_id) REFERENCES roles(id),
            UNIQUE(user_id, role_id));

            CREATE TABLE IF NOT EXISTS elements (id INTEGER PRIMARY KEY AUTOINCREMENT,
         name TEXT UNIQUE NOT NULL);

            CREATE TABLE IF NOT EXISTS guides (id INTEGER PRIMARY KEY AUTOINCREMENT,
            
            min_age INTEGER,
            max_age INTEGER,
            age_format TEXT,
            subject_number INTEGER,
            min_value REAL,
            max_value REAL,
            mean_value REAL,
            mean_value_sd REAL,
            geotmetric_mean REAL,
            geotmetric_mean_sd REAL,
            confidence_intervals_min REAL,
            confidence_intervals_max REAL,
            element_id INTEGER,
            FOREIGN KEY(element_id) REFERENCES elements(id));
             

         CREATE TABLE IF NOT EXISTS analysis (id INTEGER PRIMARY KEY AUTOINCREMENT,
         hospital_name TEXT,
         date TEXT,         
         user_id INTEGER,
         FOREIGN KEY(user_id) REFERENCES users(id));

         CREATE TABLE IF NOT EXISTS analysis_elements (id INTEGER PRIMARY KEY AUTOINCREMENT,
         analysis_id INTEGER,
         element_id INTEGER,
         value REAL,
         FOREIGN KEY(analysis_id) REFERENCES analysis(id),
         FOREIGN KEY(element_id) REFERENCES elements(id));
             `);
   db.closeSync();
};
const tahlilGetir = (TC) => {
   const db = SQLite.openDatabaseSync(dbName);
   const tahliller = db.getAllSync(`SELECT *
      FROM analysis
      JOIN analysis_elements ON analysis.id = analysis_elements.analysis_id
      JOIN elements ON analysis_elements.element_id = elements.id
      JOIN users ON analysis.user_id = users.id
      `);
   console.log("tahlliller:");
   console.log(tahliller[0]);
};
const seedData = () => {
   createDatabase();
   const db = SQLite.openDatabaseSync(dbName);
   const resultUsers = db.getFirstSync("SELECT COUNT(*) AS count FROM users");
   if (resultUsers.count === 0) {
      console.log("users tablosunda 0 eleman vardı. Seed data eklendi.");

      db.runSync(
         "INSERT INTO users (name,surname,password,TC,gender,birth_date,role_id) VALUES (?,?,?,?,?,?,?)",
         ["Eren", "Kara", "e2k213,T", "12345678901", "Erkek", "2001-11-06", 3]
      );
   } else {
      console.log("users tablosunda zaten veri var.");
   }
   const resultRoles = db.getFirstAsync("SELECT COUNT(*) AS count FROM roles");
   if (resultUsers.count === 0) {
      console.log("roles tablosunda 0 eleman vardı. Seed data eklendi.");
      // Seed verisi olarak roller ekle
      db.runSync("INSERT INTO roles (role_name) VALUES (?), (?), (?)", [
         "user",
         "doctor",
         "admin",
      ]);
   } else {
      console.log("roles tablosunda zaten veri var.");
   }
   db.closeSync();
};

const deleteDatabase = async () => {
   const dbPath = `${FileSystem.documentDirectory}SQLite/${dbName}`;
   const bool_fileExists = await FileSystem.getInfoAsync(dbPath)
      .then((fileInfo) => fileInfo.exists)
      .catch((error) => {
         console.error("Dosya kontrolü hatası:", error);
         return false;
      });
   console.log("hata enrde");
   if (bool_fileExists) {
      SQLite.deleteDatabaseSync(dbName);
      console.log(`${dbName} silindi.`);
   } else {
      console.log(`${dbName} isimli silinecek db blunamadı.`);
   }
};
const getRoles = () => {
   const db = SQLite.openDatabaseSync(dbName);
   const resultRoles = db.getAllSync("SELECT * FROM roles;");
   // db.getAllAsync('SELECT * FROM test WHERE intValue = ? AND name = ?', 1, 'Hello');
   let dizi = [];
   for (let index = 0; index < resultRoles.length; index++) {
      const element = resultRoles[index];
      dizi.push(resultRoles[index]);
   }

   return resultRoles;
};
const getUsers = () => {
   const db = SQLite.openDatabaseSync(dbName);
   const resultUsers = db.getAllSync("SELECT *  FROM users;");
   // db.getAllAsync('SELECT * FROM test WHERE intValue = ? AND name = ?', 1, 'Hello');
   let dizi = [];
   for (let index = 0; index < resultUsers.length; index++) {
      const element = resultUsers[index];
      dizi.push(resultUsers[index]);
   }

   return resultUsers;
};

const getUserRoleWithTC = (TC) => {
   const db = SQLite.openDatabaseSync(dbName);
   const role = db.getFirstSync(
      `SELECT users.TC,roles.role_name FROM users JOIN roles ON users.role_id = roles.id
                        WHERE users.TC = ?;`,
      TC
   );
   db.closeSync();
   console.log("role:");
   console.log(role);
   return role.role_name;
};
const getUserRole = (id) => {
   const db = SQLite.openDatabaseSync(dbName);
   const user = db.getFirstSync(
      `SELECT users.name, users.surname, roles.role_name
                        FROM users
                        JOIN roles ON users.role_id = roles.id
                        WHERE users.id = ?;`,
      id
   );

   db.closeSync();
   return user.role_name;
};

const addUser = (user) => {
   // Burad verilen parametre olarak verilen user gerçekten isteidğimiz user objesinden mi cehck edilebilir.
   const db = SQLite.openDatabaseSync(dbName);
   const user_role_id_fk = db.getFirstSync(
      "SELECT id FROM roles WHERE role_name= user;"
   );

   db.runSync(
      `INSERT INTO users (name,surname,password,TC,gender,birth_date,role_id) VALUES (?,?,?,?,?,?,?);`,
      [
         user.name,
         user.surname,
         user.password,
         user.TC,
         user.gender,
         user.birth_date,
         user_role_id_fk,
      ]
   );
   db.closeSync();
};

const checkUser = (TC, password) => {
   const db = SQLite.openDatabaseSync(dbName);
   const user_role_id_fk = db.getFirstSync(
      "SELECT * FROM users WHERE TC=? AND password = ?;",
      [TC, password]
   );
   db.closeSync();
   if (user_role_id_fk) return true;
   return false;
};

const mySqlLite = {
   createDatabase: createDatabase,
   seedData: seedData,
   deleteDatabase: deleteDatabase,
   getRoles: getRoles,
   getUsers: getUsers,
   getUserRole: getUserRole,
   getUserRoleWithTC: getUserRoleWithTC,
   addUser: addUser,
   checkUser: checkUser,
   tahlilGetir: tahlilGetir,
};
export default mySqlLite;
