const express =require('express');

const logger=require('./Logger');

const mysql=require('./mysql');
const app=express();


const port=process.env.port || 1234;

app.use(logger);
app.use(express.json());
// app.use(express.urlencoded({extended:false}));
app.listen(port,()=> console.log("Hi from express"));
app.use('/api/employees',require('./routes/api/employee'));




