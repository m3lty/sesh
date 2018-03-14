const fs = require("fs");
var states = fs.readFileSync("/seeds/states.txt");
var stateList = states.split("\n");
console.log(stateList)