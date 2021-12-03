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
// import cors from 'cors'
import postgres from './postgres';
import procedureController from './controllers/procedure'

const app = express()
const PORT = 3001;
//middle ware

//dissabled cors to see if My form would send
// app.use(cors())

//give acess to req.body with json
app.use(express.json())
app.get('/', (req,res) => {
    res.send('this is the back')
})
app.use('/procedures', procedureController)

postgres.connect()
app.listen(process.env.PORT || PORT, ()  => {
    console.log(`server has started http://localhost:3001`);
    
    // console.log("App is listeng to " + PORT );
    
})