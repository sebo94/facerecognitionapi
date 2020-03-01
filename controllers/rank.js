const Clarifai = require('clarifai');

const app = new Clarifai.App({
    apiKey: '279885f1cf6643678ec96ffcd3eff3c8'
});

const handleApiCall = (req, res) => {
    app.models.predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
    .then(data => {
        res.json(data);
    })
    .catch(err => res.status(400).json('Unable to call api'))
}

const handleRank = (req, res, postgresDb) => {
    const { id } = req.body;
    postgresDb('users').where('id', '=', id)
    .increment('entries', 1)
    .returning('entries')
    .then(entries => {
        res.json(entries[0])
    })
    .catch(err => res.status(400).json('Unable to get entries'))
}

module.exports = {
    handleRank,
    handleApiCall
}