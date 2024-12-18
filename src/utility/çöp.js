this.dbOpen().transaction((tx) => {
   tx.executeSql(`CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT,
           name TEXT,
           surname TEXT,
           TC TEXT NOT NULL UNIQUE,
           gender BOOLEAN,
           birth_date TEXT
           role_id INTEGER,
           FOREIGN KEY(role_id) REFERENCES roles(id))`);
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
   tx.executeSql(`CREATE TABLE IF NOT EXIST guides (id INTEGER PRIMARY KEY AUTOINCREMENT,
          element_id INTEGER,
          FOREIGN KEY(element_id) REFERENCES elements(id),
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
          confidence_intervals_max REAL)`);
});
tx.executeSql(`CREATE TABLE IF NOT EXIST elements (id INTEGER PRIMARY KEY AUTOINCREMENT,
       name TEXT UNIQUE NOT NULL)`);
tx.executeSql(`CREATE TABLE IF NOT EXIST analysis (id INTEGER PRIMARY KEY AUTOINCREMENT,
       user_id INTEGER,
       FOREIGN KEY(user_id) REFERENCES elements(id),
       hospital_name TEXT)`);
this.dbClose();
