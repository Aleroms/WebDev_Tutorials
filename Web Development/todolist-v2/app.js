//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const _ = require("lodash");

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

//1st create a connection to database
mongoose.connect("mongodb+srv://admin-santi<PASSWORD>@cluster0.elfym.mongodb.net/todoListDB",{
useUnifiedTopology: true, useNewUrlParser:true});
//2nd create item schema
const itemSchema = {
  name:String

};
//3rd create a model with the schema provided
const Item = mongoose.model("item",itemSchema);

//4th create a document using the model
const item1 = new Item({
  name:"Welcome to your todo list"
});
const item2 = new Item({
  name:"Hit the + button to add a new item"
});
const item3 = new Item({
  name:"<-- Hit this button to delete an item"
});

const listSchema = {
  name: String,
  item: [itemSchema]
};

const List = mongoose.model("List", listSchema)

const defaultItems = [item1,item2,item3];


//Previous way of saving data
// const items = ["Buy Food", "Cook Food", "Eat Food"];
// const workItems = [];

app.get("/", function(req, res) {

  Item.find({},function(err,foundItems){

    if(foundItems.length === 0){
      Item.insertMany(defaultItems, function(err){
        if(err)
          console.log("error loading default items");
        else
          console.log("Default items uploaded");
      });

      res.redirect("/");
    }else{
      res.render("list", {listTitle: "Today", newListItems: foundItems});
    }


  });

});

app.get("/:customListName",function(req,res){
  const customListName = _.capitalize(req.params.customListName);

  List.findOne({name: customListName}, function(err, result){
    if(!err){
      if(!result){
      //create new list
      const list = new List({
        name: customListName,
        item: defaultItems
      });

      list.save();
      res.redirect("/" + customListName);
      }
      else{
        //render customListName
        res.render("list", {listTitle: result.name, newListItems: result.item});
      }

  }

  });


});

app.post("/", function(req, res){

  const itemName = req.body.newItem;
  const listName = req.body.list;
  const items = new Item({
    name: itemName
  });

  if(listName === "Today"){
    items.save();
    res.redirect("/");
  }else{
    List.findOne({name: listName},function(err,list){
      list.item.push(items);
      list.save();
      res.redirect("/" + listName);
    });

  }



});

app.post("/delete",function(req,res){
  const checkedBox = req.body.checkbox;
  const listName = req.body.listName;

  if(listName === "Today"){
    Item.findByIdAndRemove(checkedBox,function(err){
      if(err)
        console.log(err);
      else{
        console.log("item removed");
        res.redirect("/");
      }
    });
  }else{
    List.findOneAndUpdate({name: listName},{$pull:{item:{_id:checkedBox}}},function(err,foundList){
      if(!err){
        res.redirect("/" + listName);
      }
    });
  }

});

app.get("/work", function(req,res){
  res.render("list", {listTitle: "Work List", newListItems: workItems});
});

app.get("/about", function(req, res){
  res.render("about");
});

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
