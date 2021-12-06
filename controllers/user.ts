import express from 'express'
import postgres from '../postgres'
import bcrypt from 'bcrypt';
const router = express.Router()

//create user
router.post('/', (req, res) => {
    const {user_name, password} = req.body 
    // req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));
    postgres.query(`INSERT INTO users (user_name, password) VALUES ($1, $2) RETURNING *`, 
    [user_name, bcrypt.hashSync(password, bcrypt.genSaltSync(10))], (error, results) => {
        res.json(results.rows[0])
    })
})

export default router
  
  //ejs file to crete user
//   users.get('/new', (req, res) => {
//     res.render(
//       'users/new_user.ejs',
//       {
//         currentUser: req.session.currentUser 
//       }
      
//     )
//   })