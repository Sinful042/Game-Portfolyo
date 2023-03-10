const express = require("express");
const router = require("./routes/routes.js");
const env = require("dotenv")
const mongose = require("mongoose")
const bodyParser = require("body-parser");
const cors = require("cors")


env.config();
const app = express();
app.use(bodyParser.json())
app.use(cors());

const MongooseSingleton = (function () {
    let instance;
  
    function createInstance() {
      mongose.connect(process.env.CONNECTION_URL, (e) => {
        if (e) {
          console.log(e);
        } else {
          console.log("Connected DataBase");
        }
      });
    }
  
    return {
      getInstance: function () {
        if (!instance) {
          instance = createInstance();
        }
        return instance;
      },
    };
  })();
  
  MongooseSingleton.getInstance();
  

//Hazırladığımız routerı kullanıyor
app.use("/portfolyo",router)

const PORT = process.env.PORT || 5000
//Server istenilen portu dinlemeye başlıyor
app.listen(PORT,()=>{

    console.log("Server is running at", [PORT].toString());

});