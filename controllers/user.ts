import express from 'express'
import postgres from '../postgres'
import bcrypt from 'bcrypt';
import { createTokens, Req } from '../models/authentication';
const router = express.Router();

export interface User {
    id: number
    username: string
    authCount: number
}

//create user
router.post('/', (req, res) => {
    const {user_name, password} = req.body 
    postgres.query(`INSERT INTO users (user_name, password, auth_count) VALUES ($1, $2, $3) RETURNING *`, 
    [user_name, bcrypt.hashSync(password, bcrypt.genSaltSync(10)), 0], (error, results) => {
        if(error) {
            return res.status(401).send({error});
        }
        res.status(200)
    })
})

// //
// router.post('/login', (req,res) => {
//     const {user_name, password} = req.body
//     postgres.query(`SELECT * FROM users WHERE user_name = '${user_name}'`, (error, results) => {
//         if (error) {
//             console.log(error);
//             res.send('problem with username or password')
//         } else if(results.rows.length === 0){
//             return res.status(401)
//         }else {
//       //if user found
//             if (bcrypt.compareSync(password, results.rows[0].password)) {
//                 const user: User = {
//                     id: results.rows[0].user_id,
//                     username: results.rows[0].user_name,
//                     authCount: results.rows[0].auth_count
//                 }
//                 const tokens = createTokens(user);
//                 res.cookie("refresh-token", tokens.refreshToken);
//                 res.cookie("access-token", tokens.accessToken);
//                 res.status(200)
//                 return user;
//             }

//         }
//     })
// })

router.post('/logout', (req,res) => {
    res.cookie("refresh-token", "")
    res.cookie("access-token", "").send('cookie set');
})

//resove is a function
//takes user as param
//promimise waits untill we acall resolve
export const findUserById = (id:number): Promise<User> => {
    return new Promise((resolve:(user: User) => void , reject) => {
      postgres.query(`SELECT * FROM users WHERE user_id = ${id}`, (error, results) => {
        if (error) {
          reject(error)
          return
        }
        const user: User = {
            id: results.rows[0].user_id,
            username: results.rows[0].user_name,
            authCount: results.rows[0].auth_count
        }
        resolve(user)
      })
    }) 
}

router.get('/', (req: Req,res) => {
    if(req.userId){
        findUserById(req.userId).then((user) =>{
            res.json(user)
        })
    }
})

// export const findUserById = (id:number) => {
//     postgres.query(`SELECT * FROM users WHERE user_id = ${id}`, (error, results) => {
//         const user: User = {
//             id: results.rows[0].user_id,
//             username: results.rows[0].user_name,
//             authCount: results.rows[0].auth_count
//         }
//     })
// }





export default router
