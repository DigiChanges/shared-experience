import rimraf from "rimraf";
console.log("prebuild");
rimraf.sync("./lib");
