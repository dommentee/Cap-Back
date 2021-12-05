
import express from 'express'
import { appendFile } from 'fs'
import postgres from '../postgres'
const router = express.Router()

//query all
//needs to be async because connection needs to be made
router.get('/', async(req,res) => {
    try {
        const allProcedures = await postgres.query('SELECT * FROM procedures')
        res.json(allProcedures)
    }catch(err: any) {
        console.error(err.message)
    }
})

// //create 
router.post('/', async(req, res, next) => {
    try{
        const {name, price, hospital_name,hospital_city,hospital_state,hospital_rating,heal_time} = req.body;//destructer
        const newProcedure = await postgres.query(//await 
            'INSERT INTO procedures (name, price, hospital_name,hospital_city,hospital_state,hospital_rating,heal_time) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',//inserts for valuse $ []
            [name, price, hospital_name,hospital_city,hospital_state,hospital_rating,heal_time]
        );
        res.json(newProcedure.rows[0])//gets only what is created
    }catch(err: any){
        console.error(err.message)
    }
})

//get specific
router.get('/:id', async(req,res,next) => {
    try{
        const {id} = req.params;
        const selectedProcedure = await postgres.query('SELECT * FROM procedures WHERE procedure_id = $1', 
            [id]

        );
        res.json(selectedProcedure.rows)//finds selected procedure
    }catch(err: any) {
        console.error(err.message)
    }
})

// //update
router.put('/:id', async(req,res, next) => {
    try{
        const {id} = req.params;
        const {name, price, hospital_name,hospital_city,hospital_state,hospital_rating,heal_time} = req.body;
        const procedureToUpdate = await postgres.query(
            'UPDATE procedures SET (name, price, hospital_name,hospital_city,hospital_state,hospital_rating,heal_time) = ($1, $2,$3, $4, $5, $6, $7) WHERE procedure_id = $8',
            [name, price, hospital_name,hospital_city,hospital_state,hospital_rating,heal_time,id]
        );
        res.json("updated")
    }catch(err: any) {
        console.error(err.message)
    }
})

//delete
router.delete('/:id', async(req,res, next) => {
    try {
        const {id} = req.params
        const procedureToDelete = await postgres.query(
            'DELETE FROM procedures WHERE procedure_id = $1', [id]
        );
        res.json('procedure Deleted')
    } catch (err:any) {
        console.error(err.message)
    }
})


export default router


