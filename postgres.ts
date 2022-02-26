import {Client} from 'pg'

const dbConfig = {
    connectionString: 'postgresql://localhost:5432/medical_procedures',
    
}
if(process.env.DATABASE_URL){
    //@ts-ignore allow ssl on dbconfig
	dbConfig.ssl = { rejectUnauthorized: false }
	dbConfig.connectionString = process.env.DATABASE_URL
}
if(process.env.ACCESS_TOKEN_SECRET) {
    dbConfig.connectionString = process.env.ACCESS_TOKEN_SECRET
}
if(process.env.REFRESH_TOKEN_SECRET) {
    dbConfig.connectionString = process.env.REFRESH_TOKEN_SECRET
}

const client = new Client(dbConfig)

export default  client;
