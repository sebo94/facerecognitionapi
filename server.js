const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const register = require('./controllers/register');
const signIn = require('./controllers/signIn');
const profile = require('./controllers/profile');
const rank = require('./controllers/rank');

const postgresDb = knex({
    client: 'pg',
    connection: {
      connectionString: process.env.DATABASE_URL,
      ssl: true
    }
});

const app = express();

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => { res.send('it is working!!!') });

app.post('/signIn', (req, res) => { signIn.handleSignIn(req, res, postgresDb, bcrypt) });

app.post('/register', (req, res) => { register.handleRegister(req, res, postgresDb, bcrypt) });

app.get('/profile/:id', (req, res) => { profile.handleProfileGet(req, res, postgresDb) });

app.put('/rank', (req, res) => { rank.handleRank(req, res, postgresDb) });

app.post('/rankUrl', (req, res) => { rank.handleApiCall(req, res) });

app.listen(process.env.PORT || 3000, () => {
    console.log(`app is running on port ${process.env.PORT}`); 
})