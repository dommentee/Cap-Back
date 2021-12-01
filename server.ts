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

const app = express()
const PORT = 3001;

//create server

app.listen(PORT, () => {
    console.log("App is listeng to " + PORT );
    
})