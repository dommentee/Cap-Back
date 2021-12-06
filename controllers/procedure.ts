
import express from 'express'
import postgres from '../postgres'
const router = express.Router()

//query all

router.get('/', (req,res) => {
    postgres.query('SELECT * FROM procedures', (error, results) => {
        res.json(results.rows)
    });
})

// search
router.get('/', (req,res) => {
    //@ts-ignore
    const {search} = req.params;

    postgres.query(`SELECT * FROM procedures WHERE name = ${search}`, (error, results) => {
        res.json(results.rows)
    })
    // postgres.query(`SELECT * FROM procedures WHERE name = ${name}`, (error, results) => {
    //     res.json(results)
    // });

})
// //create 
router.post('/', (req,res) => {
    const {name, price, hospital_name,hospital_city,hospital_state,hospital_rating,heal_time} = req.body;//destructer
    postgres.query(`INSERT INTO procedures (name, price, hospital_name,hospital_city,hospital_state,hospital_rating,heal_time) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
    [name, price, hospital_name,hospital_city,hospital_state,hospital_rating,heal_time], (error, results) => {
        res.json(results.rows[0])
    });
    
})

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
router.put('/:id', (req,res) => {
    const {id} = req.params;
    const {name, price, hospital_name,hospital_city,hospital_state,hospital_rating,heal_time} = req.body;
    postgres.query('UPDATE procedures SET (name, price, hospital_name,hospital_city,hospital_state,hospital_rating,heal_time) = ($1, $2,$3, $4, $5, $6, $7) WHERE procedure_id = $8',
    [name, price, hospital_name,hospital_city,hospital_state,hospital_rating,heal_time,id]);
    res.json("updated")

})

//delete

router.delete('/:id', (req,res) => {
    const {id} = req.params
    postgres.query('DELETE FROM procedures WHERE procedure_id = $1', [id]);
    res.json('procedure Deleted')
})

export default router


