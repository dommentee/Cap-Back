import express from 'express'
import { Cookie } from 'express-session';
const router = express.Router();

router.post('/', (req,res) => {

    // res.cookie("access-token", "",{maxAge: 1})
    // res.clearCookie("refresh-token")
    // res.clearCookie("access-token").send('test');
    // res.status(202).clearCookie('refresh-token').send('cookie cleared'
    // res.cookie("refresh-token", " ",{maxAge: 1})
    // res.cookie("refresh-token", "",{maxAge: 1})
    res.clearCookie("access-token").send('test');
})

export default router;