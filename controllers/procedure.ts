
import express from 'express'
import postgres from '../postgres'
const router = express.Router()

//query all
//needs to be async because connection needs to be made
router.get('/', async(req,res) => {
    try {
        const allProcedures = await postgres.query('SELECT * from procedures')
        res.json(allProcedures)
    }catch(err: any) {
        console.error(err.message)
    }
    //@ts-ignore to allow postgres.query
    // postgres.query('SELECT * from procedures in ORDER BY id ASC;', (error, results) => {
    //     res.json(results.rows)
    // }) 
})

// //create 
router.post('/', async(req, res) => {
    try{
        const {name, price} = req.body;
        const newProcedure = await postgres.query(
            'INSERT INTO procedures (name, price) VALUES ($1, $2) RETURNING *',
            [name, price]
        );
        res.json(newProcedure)
    }catch(err: any){
        console.error(err.message)
    }
})
// router.post('/', (req,res) => {
//     //create
//     //@ts-ignore to allow postgres.query
//     postgres.query(`INSERT INTO procedures (name, price) VALUES ('${req.body.name}', ${req.body.price})`, (error, results) => {
//         //pull all 
//         //@ts-ignore to allow postgres.query
//         postgres.query('SELECT * from procedures in ORDER BY id ASC;', (error, results) => {
//             //@ts-ignore to allow postgres.query
//             res.json(results.rows)
//         }) 
//     })
// })
 
// //delete
// router.delete('/:id', (req,res) => {
//     //@ts-ignore to allow postgres.query
//     postgres.query(`DELETE FROM procedures WHERE id = ${req.params.id};`, (error, results) => {
//         //@ts-ignore to allow postgres.query
//         postgres.query('SELECT * from procedures in ORDER BY id ASC;', (error, results) => {
//             res.json(results.rows)
//         }) 

//     })
// })

// //update
// router.put('/:id', (req,res) => {
//     //@ts-ignore to allow postgres.query
//     postgres.query(`UPDATE procedures SET name = '${req.body.name}', price = ${req.body.price} WHERE id = ${req.params.id}`, (error, results) => {
//         //@ts-ignore to allow postgres.query
//         postgres.query('SELECT * from procedures in ORDER BY id ASC;', (error, results) => {
            
//             res.json(results.rows)
//         }) 
//     })
// })


export default router


