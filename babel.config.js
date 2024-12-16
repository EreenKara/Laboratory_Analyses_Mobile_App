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
               myredux: "./src/utility/redux",
               myshared: "./src/Shared",
               myscreens: "./src/screens",
               mylocales: "./locales",
               myassets: "./assets",
               myenv: "./environments/",
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
