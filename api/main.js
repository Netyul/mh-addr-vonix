require('dotenv').config()

const express = require('express')
const app = express();
const consign = require('consign');

const { database } = require('./src/config/knex/database');

app.db = database;

consign()
  .then('./src/models/v2')
  .then('./src/lib')
  .then('./src/middleware/v2')
  .then('./src/lib')
  .then('./src/controllers/v2')
  .then('./src/config/routes')
  .into(app)

const options = {
  dotfiles: 'ignore',
  etag: false,
  extensions: ['htm', 'html'],
  index: false,
  maxAge: '1d',
  redirect: false,
  setHeaders(res, path, stat) {
    res.set('x-timestamp', Date.now())
  }
}

app.use(express.static('public', options))

app.listen(process.env.HOST_PORT, () => {
  console.log('sistema iniciado com sucesso porta: ', process.env.HOST_PORT);
})
