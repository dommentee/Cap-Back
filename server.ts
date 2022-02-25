//postgres
//import express
//pg
//dotenv
//cors
//ts-init
//need types //cnat be dev types for heroku
//tsc --init for typescript config
//need start script in package.json

import express from 'express'
import dotenv from 'dotenv'
import cors, { CorsOptions } from "cors";
import postgres from './postgres';
import cookieParser from 'cookie-parser';
import procedureController from './controllers/procedure';
import usersController from './controllers/user';
import loginController from './controllers/login'
import logoutControlloer from './controllers/logout'
import { authMiddleware } from './models/authentication';
const app = express()
const PORT = 3001;
require('dotenv').config()
// dotenv.config();
//middle ware
// Read authentication cookies from requests
app.use(cookieParser())
let whitelist = ['http://localhost:3000', 'https://enigmatic-retreat-81576.herokuapp.com']
// CORS
var corsOptions: CorsOptions = {
  credentials: true,
  origin: whitelist
}
app.use(cors(corsOptions));
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header("Access-Control-Allow-Headers", 'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json');
  next();
});
// Configure JWT-Authentication
app.use(authMiddleware);



//give acess to req.body with json
app.use(express.json())
app.get('/', (req,res) => {
  res.send('this is the back')
})
app.use('/procedures', procedureController)
app.use('/users', usersController)
app.use('/login', loginController)
app.use('/logout', logoutControlloer)


postgres.connect()
app.listen(process.env.PORT || PORT, ()  => {
  console.log(`server has started http://localhost:3001`);
    // console.log("App is listeng to " + PORT );
    
})