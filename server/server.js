import dotenv from "dotenv"
import express from "express"
import {connectdb} from './config/db.js'
import authroutes from './routes/authroutes.js'
import cors from 'cors';

dotenv.config();
const app=express();
const PORT=(process.env.PORT);
app.use(cors());
app.use(express.json());
app.use('/api/auth', authroutes);


connectdb().then(()=>{
   app.listen(PORT , () =>{
   console.log("server running in Port 5002");
});


});
