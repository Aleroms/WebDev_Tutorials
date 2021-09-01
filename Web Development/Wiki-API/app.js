//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require('mongoose');

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));

//TODO
mongoose.connect("mongodb://localhost:27017/WikiDB",{
useUnifiedTopology: true, useNewUrlParser: true});

const articleSchema = {
  title:String,
  content:String
};

const Article = mongoose.model("Article",articleSchema);

//======================requests targeting ALL articles
app.route("/articles")

.get(function(req,res){
  Article.find({},function(err, foundArticles){
    if(!err){
      res.send(foundArticles);
    }else{
      res.send(err);
    }
  });
})

.post(function(req,res){
  console.log(req.body.title);
  console.log(req.body.content);

  const newArticle = new Article({
    title:req.body.title,
    content: req.body.content
  });
  newArticle.save();

  if(!err)
    res.send("successful");
  else
    res.send(err);
})

.delete(function(req,res){
  Article.deleteMany(function(err){
    if(!err)
      res.send("no errors");
    else
      res.send(err);
  })




});

//======================requests targeting specific articles
app.route("/articles/:articleTitle")

.get(function(req,res){
  Article.findOne({title:req.params.articleTitle},function(err,foundArticle){
    if(!err)
      res.send(foundArticle);
    else
      res.send("Error");
  });
})

.put(function(req,res){
  Article.replaceOne({title:req.params.articleTitle},
    {title:req.body.title,content:req.body.content}
    ,function(err){
      if(!err)
        res.send("successful");
      else
        res.send(err);
    });
});

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
