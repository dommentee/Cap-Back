import express from 'express'
const router = express.Router();

router.post('/', (req,res) => {
    res.cookie("refresh-token", "")
    res.cookie("access-token", "").send('cookie clear');
})

export default router;