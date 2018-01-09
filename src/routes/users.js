import { Router } from 'express'
import {getUsersList, getUserById} from './../controllers/users'

const router = Router()

router.get('/', function(req, res) {
  getUsersList().then((users) => {
    res.json(users)
  })
});  

router.get('/me', function(req, res) {
  getUserById(req.decoded.id).then((user) => {
    res.json(user[0])
  })
});   

export default router;