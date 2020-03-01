const handleRegister = (req, res, postgresDb, bcrypt) => {
    const { email, name, password } = req.body;
    if (!email || !name || !password) {
        // remember the return statement to prevent the rest of the code from executing
        return res.status(400).json('Incorrect form submission');
    } 
    const hash = bcrypt.hashSync(password);
    postgresDb.transaction(trx => {
        trx.insert({hash, email})
        .into('login')
        .returning('email')
        .then(loginEmail => {
            return trx('users')
            .returning('*')
            .insert({
                name: name,
                email: loginEmail[0],
                joined: new Date()
            })
            .then(user => {
                res.json(user[0])
            })
        })
        .then(trx.commit)
        .catch(trx.rollback);
    }).catch(err => res.status(400).json('something went wrong'));
}

module.exports = {
    handleRegister
}