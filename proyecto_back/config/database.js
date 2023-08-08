const mongoose = require("mongoose");
const uri = "mongodb+srv://thepropaintgroup:Dz25L1GiCxsywOgB@thepropaintgroup.bokkh6t.mongodb.net/thepropaintgroup?retryWrites=true&w=majority";
//const uri = "mongodb://127.0.0.1:27017/dbtppg"
//'mongodb://${host}:${port}/${db}'
//thepropaintgroup:Dz25L1GiCxsywOgB

exports.mongoConnect = () => {
const mongoStringConnection = uri;
mongoose.connect(mongoStringConnection);
mongoose.Promise = global.Promise;
const dbConnection = mongoose.connection;
dbConnection.on("errore", console.error.bind(console, "Mongodb connection error"))
}