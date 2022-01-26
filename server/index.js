const express = require('express');
const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser')

const { handleErrors, dbConnect } = require('./util/helper-functions')

const PORT = process.env.PORT || 3000

app.use(express.json())
app.use(cookieParser())

app.use(cors({
    credentials: true
}))




app.use(['/', '/help'], require('./routes/welcome'))

app.use('/games', require('./routes/games'))

app.use('/user', require('./routes/auth'))


app.use((req, res) => {
    res.send('that route does not exist')
})

app.use((err, req, res, next) => {
    console.log('global err: ', handleErrors(err));
    res.status(502).json(handleErrors(err))
})

dbConnect().then(() => {
    console.log('db connected');
    app.listen(PORT, () => {
        console.log(`listening on port ${PORT}`)
    })
}).catch(err =>{
    console.log('Database connection issue');
})

