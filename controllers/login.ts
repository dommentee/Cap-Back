import  bcrypt from 'bcrypt';
import  express from 'express';
import postgres from '../postgres'
//use sessions from express 
const router = express.Router()
//User Schema is need to compare

//user bcrypt to  compare username and password
//sessions.post
router.post('/', (req, res) => {
const {user_name, password} = req.body
  // postgres.query(`SELECT FROM users WHERE user_name = $1 `), [user_name], (error, foundUser) => {
  //   if (error) {
  //     console.log(error);
  //     res.send('problem with username or password')
  //   } else if(!foundUser){
  //     return res.status(4001)
  //   } else {
  //     //if user found
  //     if (bcrypt.compareSync(password, foundUser.password)) {

  //   }
  // })
})

// sessions.delete('/', (req, res) => {
//   req.session.destroy(() => {
//     res.redirect('/')
//   })
// })
export default router