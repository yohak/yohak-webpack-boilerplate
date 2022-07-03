const ansis = require("ansis");
//
const result = require("dotenv").config({
  path: `${process.cwd()}/.env.local`,
});
if (result.error) {
  console.log(ansis.red("not loading .env.local"));
}
