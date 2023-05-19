import express from 'express';
import dotenv from 'dotenv';
dotenv.config()

const port: string = process.env.PORT as string
const host: string = process.env.HOST as string

const app = express();

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => console.log(`App listening on ${host}:${port}/`))