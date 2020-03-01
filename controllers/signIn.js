const handleSignIn = (req, res, postgresDb, bcrypt) => {
    const { email, password } = req.body;
    if (!email || !password) {
        // remember the return statement to prevent the rest of the code from executing
        return res.status(400).json('Incorrect form submission');
    }
    postgresDb.select('email', 'hash').from('login')
    .where( 'email', '=',  email)
    .then(data => {
        const isValid = bcrypt.compareSync(password, data[0].hash);
        if (isValid) {
            return postgresDb.select('*').from('users')
            .where('email', '=', email)
            .then(user => {
                res.json(user[0])
            })
            .catch(err => res.status(400).json('Unable to get user'));
        } else {
            res.status(400).json('Wrong credentials');
        }
    })
    .catch(err => res.status(400).json('Wrong credentials'))
}

module.exports = {
    handleSignIn
}