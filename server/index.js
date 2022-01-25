const express = require('express');
const app = express();

const { handleErrors } = require('./util/helper-functions')

const PORT = process.env.PORT || 3000

app.use(express.json())

app.use(['/', '/help'], require('./routes/welcome'))

app.use('/games', require('./routes/games'))


app.use((req, res) => {
    res.send('that route does not exist')
})

app.use((err, req, res, next) => {
    console.log('global err: ', err.message);
})

app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`)
})
