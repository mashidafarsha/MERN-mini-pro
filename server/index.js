const express=require("express")
const cors =require("cors");
const mongoose =require("mongoose")
const app = express();
const path = require('path');


const userRouter = require('./Routes/userRouter')
const adminRouter = require('./Routes/adminRouter')
const cookieParser = require("cookie-parser");
app.use(cookieParser())

app.use(
  cors({
      origin:["http://localhost:3000"],
      methods:["GET","POST","DELETE","PUT"],
      credentials:true,
      
  })
)
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json());
app.use('/',userRouter)
app.use('/admin',adminRouter)


mongoose.connect('mongodb://127.0.0.1:27017/minipro',{
  useNewUrlParser:true,
  useUnifiedTopology:true  
})
  .then(() => console.log('Database Connected Successfully'))
  .catch((err)=>{
console.log(err.message);
  })

app.listen(4000,()=>{
    console.log("server started on port 4000");
})





