const express = require('express')
const mongoose=require('mongoose');
const user = require('./routes/user')
const auth = require('./routes/auth')
const article = require('./routes/article')
const authMiddleWare = require('./middleware/auth')
const cors = require('cors')
const app = express();

mongoose.connect('mongodb://localhost/fatmug-user',{useNewUrlParser:true,useUnifiedTopology: true })
 .then(()=> console.log('Connected to mongodb server...'))
 .catch(err=> console.error('Error connecting:',err.message));
var corsOptions = {
    origin: 'www.localhost:3000', //https://jaisinghal02.github.io
  }
app.use(cors(corsOptions))
app.use(express.json())
app.use('/api/signup',user)
app.use('/api/signin',auth)

app.use(authMiddleWare)
app.use('/uploads',express.static('uploads'))
app.use('/api/article',article)
app.get('/',(req,res)=>{
    res.send("Ok")
})

app.listen(5000,()=>{
    console.log(`Server running at port ${5000}..`)
})