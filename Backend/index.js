import express from 'express'
import dotenv from 'dotenv';
import morgan from 'morgan';
import studentRouter from './routes/studentRoute.js'
import courseRouter from './routes/courseRoute.js'
import userRouter from './routes/userRoute.js'

import bodyParser from 'body-parser';
import cors from 'cors'
dotenv.config();

const port = process.env.SERVER_PORT;
const app = express();
app.use(cors())
app.use(bodyParser.json());


console.log('Database Password:', process.env.PW);
console.log({
    user: 'postgres',
    host: process.env.DBHOST,
    database: process.env.DB,
    password: process.env.PW,
    port: process.env.DBPORT,
})

app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('short'))
app.use('/students',studentRouter)
app.use('/courses',courseRouter)
app.use('/users',userRouter)

app.listen(port,()=>{
    console.log(`Server started on ${port} succesfully !`)
})