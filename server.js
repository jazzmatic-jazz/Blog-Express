const express = require('express')
const mongoose = require('mongoose')
const Article = require('./models/article')
const articleRouter = require('./routes/articles')
const methodOverride = require('method-override')
const app = express()

require('dotenv').config();
const url = process.env.CON

mongoose.connect(url)

app.set('view engine', 'ejs')
app.use(express.urlencoded({extended: false}))
app.use(methodOverride('_method'))


app.get('/', async(req, res)=>{
    // res.send('Hello World') written content
    // render will pass the html folder
    const articles = await Article.find().sort({createdAt: 'desc'})
    res.render('articles/index', {articles: articles})
})
app.use( "/articles", articleRouter)

app.listen(5000)