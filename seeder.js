const mongoose = require("mongoose");
require("dotenv").config({ path: "./config/config.env" });
const fs = require("fs");
require("colors");
const Restraurant = require("./models/Restraurant");

//  connect to db
mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

const restraurants = JSON.parse(
  fs.readFileSync(`${__dirname}/test_data/restraurants.json`, "utf-8")
);

const importData = async () => {
  try {
    await Restraurant.create(restraurants);

    console.log(`Data Imported Successfully..`.green.inverse);
    process.exit();
  } catch (err) {
    console.log(err);
  }
};

const deleteData = async () => {
  try {
    await Restraurant.deleteMany();

    console.log(`Data Deleted Successfully..`.red.inverse);
    process.exit();
  } catch (err) {
    console.log(err);
  }
};

//  check command
if (process.argv[2] === "-i") {
  importData();
} else if (process.argv[2] === "-d") {
  deleteData();
} else {
  console.log("sorry, seeder unable to understand");
  process.exit();
}