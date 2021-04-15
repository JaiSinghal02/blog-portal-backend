const express = require('express')
const mongoose=require('mongoose');
const user = require('./routes/user')
const auth = require('./routes/auth')
const article = require('./routes/article')
const authMiddleWare = require('./middleware/auth')
const cors = require('cors')
const app = express();

mongoose.connect('mongodb+srv://Jai-Singhal:Mongodbsinghal@02@cluster0.rwdlf.mongodb.net/MongoDataBase?retryWrites=true&w=majority',{useNewUrlParser:true,useUnifiedTopology: true })
 .then(()=> console.log('Connected to mongodb server...'))
 .catch(err=> console.error('Error connecting:',err.message));
var corsOptions = {
    origin: 'https://jaisinghal02.github.io', //https://jaisinghal02.github.io
  }
app.use(cors(corsOptions))
app.use(express.json())

app.get('/',(req,res)=>{
    res.send("This is API for Fatmug Blog Portal")
})

app.use('/api/signup',user)
app.use('/api/signin',auth)
app.use('/uploads',express.static('uploads'))
app.use('/api/article',authMiddleWare)
app.use('/api/article',article)

const port = process.env.PORT || 5000
app.listen(port,()=>{
    console.log(`Server running at port ${5000}..`)
})