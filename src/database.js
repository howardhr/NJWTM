require('dotenv').config();
import mongoose from "mongoose";


mongoose.connect( process.env.MONGO_URI ,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
  
})
  .then(db=> console.log('Db Conectada'))  
  .catch(error=> console.log(error))       