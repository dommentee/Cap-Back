import express from 'express'
import postgres from '../postgres'
import bcrypt from 'bcrypt';
const router = express.Router();

//create user
router.post('/', (req, res) => {
    const {user_name, password} = req.body 
    postgres.query(`INSERT INTO users (user_name, password) VALUES ($1, $2) RETURNING *`, 
    [user_name, bcrypt.hashSync(password, bcrypt.genSaltSync(10))], (error, results) => {
        res.json(results.rows[0])
    })
})



export default router
