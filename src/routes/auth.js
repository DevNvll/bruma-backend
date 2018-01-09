import { Router } from 'express'
import jwt from 'jsonwebtoken'

import {getUserByUsername} from './../controllers/users'

const router = Router()

router.post('/authenticate', (req, res) => {
  const {username, password} = req.body;
  getUserByUsername(username)
  .then((result) => {
      if(result.length >= 1) {
        if(result[0].password == password) {
          const token = jwt.sign({id: result[0].id, username: result[0].username }, req.app.get('secret'));
          res.json({success: true, token: token})
        } else {
          res.json({ success: false, code: 'WRONG_PASS', message: 'Senha incorreta' });
        }
      } else {
        res.json({ success: false, code: 'WRONG_USER', message: 'Usuário não encontrado' });
      }
    })
})

export default router;