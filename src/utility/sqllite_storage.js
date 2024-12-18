import * as SQLite from "expo-sqlite";

//  # işareti private demek.
const createDatabase = () => {
   SQLite.openDatabaseSync("mydatabase.db").execSync(`
             CREATE TABLE IF NOT EXISTS roles (id INTEGER PRIMARY KEY, role_name TEXT UNIQUE NOT NULL);
         
         
         CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT,
             name TEXT,
             surname TEXT,
             TC TEXT NOT NULL UNIQUE,
             gender BOOLEAN,
             birth_date TEXT,
             role_id INTEGER,
             FOREIGN KEY(role_id) REFERENCES roles(id));
             
             
             CREATE TABLE IF NOT EXISTS user_roles 
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
         user_id INTEGER,
         FOREIGN KEY(user_id) REFERENCES users(id));

         CREATE TABLE IF NOT EXISTS analysis_elements (id INTEGER PRIMARY KEY AUTOINCREMENT,
         analysis_id INTEGER,
         element_id INTEGER,
         FOREIGN KEY(analysis_id) REFERENCES analysis(id),
         FOREIGN KEY(element_id) REFERENCES elements(id));
             `);
};
const seedData = () => {
   createDatabase();
   const db = SQLite.openDatabaseSync("mydatabase.db");
   const resultUsers = db.getFirstSync("SELECT COUNT(*) AS count FROM users");
   if (resultUsers.count === 0) {
      console.log("No users found, inserting seed data...");
      db.runSync(
         "INSERT INTO users (name,surname,TC,gender,birth_date,role_id) VALUES (?, ?,?,?,?,?)",
         ["Eren", "Kara", "12345678901", true, "2001-11-06", 2]
      );
   }
   const resultRoles = db.getFirstAsync("SELECT COUNT(*) AS count FROM roles");
   if (resultRoles.count === 0) {
      console.log("No roles found, inserting seed data...");

      // Seed verisi olarak roller ekle
      db.runSync("INSERT INTO roles (role_name) VALUES (?), (?), (?)", [
         "user",
         "doctor",
         "admin",
      ]);
   }
};

const mySqlLite = {
   createDatabase: createDatabase,
   seedData: seedData,
};
export default mySqlLite;
