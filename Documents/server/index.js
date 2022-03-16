const express =require('express')
const app = express()
const userRouter=require('./Routes/user')
const db=require('./config/Connection')
const cors = require('cors')
const bodyParser=require('body-parser')
const port=process.env.PORT|| 3000




db.connect((err)=>{
    if(err)
    console.log("Connection error"+err);
    else
    console.log("Database connected");
  })



  app.use(bodyParser.json({limit: '50mb'}));
  app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
  app.use(bodyParser.raw({type:'application/octet-stream', limit:'100mb'}));
  

app.use(
    cors({
        origin: "http://localhost:3001",
        methods: "GET,POST,PUT,DELETE,PATCH",
        credentials: true,
    })
);

app.use('/api/user', userRouter);



// ou0bAzzjvzpFRE/CKrApXOG3dhpLoQ3SAbSr6zcP
// AKIAVMLM46RQSFO4SAMD


app.listen(port,()=>{
    console.log("server is running",{port});
})


