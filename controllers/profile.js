const handleProfileGet = (req, res, postgresDb) => {
    const { id } = req.params;
    postgresDb.select('*').from('users').where({id})
    .then(user => {
        if(user.length) {
            res.json(user[0]);
        } else {
            res.status(400).json('User not found');
        }
    })
    .catch(err => res.status(400).json('Error getting user'))
}

module.exports = {
    handleProfileGet
}