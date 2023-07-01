const mongoose = require("mongoose");

const host = "localhost";
const port = "27017";
const db = "hr";
const uri = "mongodb://127.0.0.1:27017/dbtppg"
//'mongodb://${host}:${port}/${db}'
exports.mongoConnect = () => {
    const mongoStringConnection = uri;
    mongoose.connect(mongoStringConnection);
    mongoose.Promise = global.Promise;
    const dbConnection = mongoose.connection;
    dbConnection.on("errore", console.error.bind(console, "Mongodb connection error"))
}