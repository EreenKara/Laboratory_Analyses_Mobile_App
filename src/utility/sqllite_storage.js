import SQLite from "react-native-sqlite-storage";

class SQLLiteStorage {
   #db;
   constructor() {
      this.#db = null;
   }
   dbOpen() {
      if (this.db === null) {
         this.db = SQLite.openDatabase(
            { name: "mydatabase.db", location: "default" },
            () => console.log("Database opened"),
            (error) => console.log("Error opening database: ", error)
         );
      }
      return this.db;
   }
   dbClose = () => {
      if (this.db !== null) {
         this.db.close(
            () => {
               console.log("Database closed successfully");
            },
            (error) => {
               console.log("Error closing database: ", error);
            }
         );
         this.db = null;
      }
   };
   //  # işareti private demek.
   #createDatabase = () => {
      this.dbOpen().transaction((tx) => {
         tx.executeSql(`CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT,
             name TEXT,
             surname TEXT,
             TC TEXT NOT NULL UNIQUE,
             gender BOOLEAN,
             birth_date TEXT)`);
         tx.executeSql(
            `CREATE TABLE IF NOT EXISTS roles (id INTEGER PRIMARY KEY, role_name TEXT UNIQUE NOT NULL)`
         );
         tx.executeSql(
            `CREATE TABLE IF NOT EXISTS user_roles 
            (id INTEGER PRIMARY KEY,
            user_id INTEGER,
            role_id INTEGER,
            FOREIGN KEY(user_id) REFERENCES users(id),
            FOREIGN KEY(role_id) REFERENCES roles(id),
            UNIQUE(user_id, role_id))`
         );
         tx.executeSql(`CREATE TABLE IF NOT EXIST guide (id INTEGER PRIMARY KEY AUTOINCREMENT,
            )`);
         tx.executeSql(`CREATE TABLE IF NOT EXIST guide-element (id INTEGER PRIMARY KEY AUTOINCREMENT,
                min REAL,
                max REAL,
                mean REAL)`);
      });
      this.dbClose();
   };
   #seedDatabase = () => {
      this.createDatabase();
      this.dbOpen().transaction((tx) => {
         // Seed Data ekle (örneğin başlangıç verileri)
         tx.executeSql(
            "SELECT COUNT(*) AS count FROM users",
            [],
            (tx, results) => {
               const rowCount = results.rows.item(0).count;

               // Eğer veritabanı boşsa, seed verileri ekle
               if (rowCount === 0) {
                  tx.executeSql(
                     "INSERT INTO users (name,surname,TC,gender,birth_date age) VALUES (?, ?)",
                     ["Eren", "Kara", "12345678901", true, "2001-11-06", 30]
                  );

                  console.log("Seed data inserted!");
               }
            }
         );
         this.dbClose();
      });
   };
}
