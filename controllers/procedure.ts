
import express from 'express'
import postgres from '../postgres'
const router = express.Router()

//query all
router.get('/', (req,res) => {
    //@ts-ignore to allow postgres.query
    postgres.query('SELECT * from procedure in ORDER BY id ASC;', (error, results) => {
        res.json(results.rows)
    }) 
})

//create 
router.post('/', (req,res) => {
    //create
    //@ts-ignore to allow postgres.query
    postgres.query(`INSERT INTO procedure (name, price) VALUES ('${req.body.name}', ${req.body.price})`, (error, results) => {
        //pull all 
        //@ts-ignore to allow postgres.query
        postgres.query('SELECT * from procedure in ORDER BY id ASC;', (error, results) => {
            res.json(results.rows)
        }) 
    })
})
 
//delete
router.delete('/:id', (req,res) => {
    //@ts-ignore to allow postgres.query
    postgres.query(`DELETE FROM procedure WHERE id = ${req.params.id};`, (error, results) => {
        //@ts-ignore to allow postgres.query
        postgres.query('SELECT * from procedure in ORDER BY id ASC;', (error, results) => {
            res.json(results.rows)
        }) 

    })
})

//update
router.put('/:id', (req,res) => {
    //@ts-ignore to allow postgres.query
    postgres.query(`UPDATE procedure SET name = '${req.body.name}', price = ${req.body.price} WHERE id = ${req.params.id}`, (error, results) => {
        //@ts-ignore to allow postgres.query
        postgres.query('SELECT * from procedure in ORDER BY id ASC;', (error, results) => {
            res.json(results.rows)
        }) 
    })
})


export default router


