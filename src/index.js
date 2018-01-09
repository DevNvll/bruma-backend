import express from 'express'
import bodyParser from 'body-parser'
import jwt from 'jsonwebtoken'
import _ from 'lodash'
import morgan from 'morgan'

import db from './db'
import usersApi from './routes/users'
import authApi from './routes/auth'

const isDev = process.env.NODE_ENV === 'development'

const SERVER_PORT = 3000

const app = express()

app.set('secret', 'ech3l0n h4s 3y3s 3v3rywh3r3')

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
if(isDev) app.use(morgan('dev'))

function checkToken(req, res, next) {
  var token = req.body.token || req.query.token || req.headers['x-access-token'];
  if (token) {
    jwt.verify(token, app.get('secret'), function(err, decoded) {      
      if (err) {
        return res.json({ success: false, code: 'TOKEN_FAIL', message: 'Token inválido' });    
      } else {
        req.decoded = decoded;    
        next();
      }
    });

  } else {
    return res.status(403).send({ 
        success: false, 
        code: "NO_TOKEN",
        message: 'Você precisa utilizar um token.' 
    });
  }
}

app.use('/users', checkToken, usersApi);   
app.use('/auth', authApi);   

app.get('/', (req, res) => {
  res.send('Hello')
})

var server = app.listen(3000, function () {
  var port = server.address().port;
  if(process.env.NODE_ENV !== 'test') console.log('App listening at port %s', port);
});
module.exports = server;