const express = require('express')
const router = express.Router()
const Article = require('../models/article')
const multer = require('multer')


const storage = multer.diskStorage({
    destination: (req,file,cb)=>{
        cb(null,'./uploads/')
    },
    filename: (req,file,cb)=>{
        cb(null, Date.now()+file.originalname)
    }
})
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024*1024*5
    }

})

router.get('/:id',async(req,res)=>{
    let article;
    try{
        article = await Article.findById(req.params.id)
        if(article){
            return res.status(200).send(article)
        }
    }
    catch(err){
        return res.status(400).send("No such article exists")
    }
    
    res.status(400).send("No Such Article Exists")
})
router.get('/user/:id',async(req,res)=>{
    let article;
    try{
        article = await Article.find({user_id:req.params.id})
        if(article){
            return res.status(200).send(article)
        }
    }
    catch(err){
        return res.status(400).send("No such article exists")
    }
    
    res.status(400).send("No Such Article Exists")
})
router.get('/latest',async(req,res)=>{
    let article = await Article.find().select({__v: 0}).sort({'date':-1})
    console.log("-->",article)
    if(article){
        return res.status(200).send(article)

    }
    res.status(400).send("No Articles Published Yet")
})
router.get('/hottest',async(req,res)=>{
    let article = await Article.find().select({__v: 0}).sort({'likes':-1}).limit(5)
    console.log("-->",article)
    if(article){
        return res.status(200).send(article)

    }
    res.status(400).send("No Articles Published Yet")
})
router.post('/publish',upload.single('articleImage'),async(req,res)=>{
    let article = await Article.findOne({user_id: req.user._id,title: req.body.title})
    console.log("-->",req.file)
    if(!article){
        article = new Article ({
            user_id : req.user._id,
            title: req.body.title,
            description: req.body.description,
            articleImage: req.file.path
        })
        await article.save()
        return res.status(200).send(article)

    }
    res.status(400).send("Article with same Title")
})
router.post('/like',async(req,res)=>{
    let oldArticle = await Article.find(req.body._id)
    console.log("-->",oldArticle)
    if(oldArticle){
        let newArticle= await Article.findByIdAndUpdate(req.body._id,{
            $set:{
                likes: oldArticle.likes+1
            }
        },{new:true})
        return res.status(200).send(newArticle)
    }
    res.status(400).send("Invalid ! No such article present")
})

module.exports = router