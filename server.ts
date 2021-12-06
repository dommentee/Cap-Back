//postgres
//import express
//pg
//dotenv
//cors
//ts-init
//need types 
//tsc --init for typescript config
//need start script in package.json

import express from 'express'
import cors from 'cors'
import postgres from './postgres';
import session from 'express-session'
import procedureController from './controllers/procedure';
import usersController  from './controllers/user';
const app = express()
const PORT = 3001;
//middle ware

//dissabled cors to see if My form would send

app.use(cors())
// app.use(
//     session({
//       secret: process.env.SECRET,
//       resave: false,
//       saveUninitialized: false
//     })
// )

//give acess to req.body with json
app.use(express.json())
app.get('/', (req,res) => {
    res.send('this is the back')
})
app.use('/procedures', procedureController)
app.use('/users', usersController)

postgres.connect()
app.listen(process.env.PORT || PORT, ()  => {
    console.log(`server has started http://localhost:3001`);
    
    // console.log("App is listeng to " + PORT );
    
})