module.exports = {
   presets: ["babel-preset-expo"],
   plugins: [
      [
         "module-resolver",
         {
            root: ["./"],
            alias: {
               navigations: "./src/navigations",
               preparations: "./src/preparations",
               shared: "./src/Shared",
               screens: "./src/screens",
               locales: "./locales",
               assets: "./assets",
            },
         },
      ],
   ],
};
