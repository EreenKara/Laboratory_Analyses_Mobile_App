module.exports = {
   presets: ["babel-preset-expo"], // ['module:metro-react-native-babel-preset'],
   plugins: [
      [
         "module-resolver",
         {
            root: ["./"],
            alias: {
               mynavigations: "./src/navigations",
               myutility: "./src/utility",
               myredux: "./src/redux",
               myshared: "./src/screens/Shared",
               myscreens: "./src/screens",
               mylocales: "./locales",
               myassets: "./assets",
               myenv: "./environments/",
               myfirebase: "./src/firebase",
            },
         },
      ],
      [
         "module:react-native-dotenv",
         {
            moduleName: "@env",
            path: "./environments/.env",
            blocklist: null,
            allowlist: null,
            safe: false,
            allowUndefined: true,
            verbose: false,
         },
      ],
   ],
};
