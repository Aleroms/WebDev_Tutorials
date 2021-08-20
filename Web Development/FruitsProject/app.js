const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/fruitsDB",{useNewUrlParser:true,useUnifiedTopology: true});

const fruitSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "please check your data entry. No Name specified"]
  },
  rating: {
    type: Number,
    min: 1,
    max: 10
  },
  review: String
});

const Fruit = mongoose.model("Fruit",fruitSchema);
// const fruit = new Fruit({
//
//   rating: 8,
//   review: "Better than bananas"
// });

//fruits.save();
const peopleSchema = new mongoose.Schema({
  name: String,
  age: Number,
  favoriteFruit: fruitSchema
});

const pineapple = new Fruit({
  name: "pineapple",
  rating: 10,
  review: "yass"
});
const pear = new Fruit({
  name:"pear",
  rating:8,
  review:"k"
});

//pineapple.save();
pear.save();

const People = mongoose.model("People",peopleSchema);
const person = new People({
  name: "Amy",
  age:12,
  favoriteFruit: pineapple
});
const john = new People({
  name: "John",
  age:21,
  favoriteFruit: pear
});


// Fruit.updateOne({_id:"611ae39746d89d0f04d355b4"},{name: "blackberry"}, function(err)
// {
//   if(err)
//     console.log(err);
//   else
//     console.log("Successfully updated");
//
// });
// Fruit.deleteOne({name:"blackberry"},function(err){
//   if(err)
//     console.log(err);
//   else
//     console.log("Successfully deleted");
// });

People.deleteMany({name: "John"},function(err){
  if(err)
    console.log(err);
  else
    console.log("deleted people");
});
person.save();
john.save();
// const banana = new Fruit({
//   name: "banana",
//   rating: 7,
//   review: "tis ok"
// });
// const kiwi = new Fruit({
//   name: "kiwi",
//   rating: 6,
//   review: "never tried its"
// });
// const blueberry = new Fruit({
//   name: "blueberry",
//   rating: 8,
//   review: "not a fruit"
// });

// Fruit.insertMany([banana,kiwi,blueberry],function(err){
//   if(err)
//     console.log(err)
//   else
//     console.log("Successfully saved fruits");
// });

Fruit.find(function(err,fruits){
  if(err)
    console.log(err);
  else{
    mongoose.connection.close();
    // foreach(f in fruits)
    //   console.log(f.name);
    fruits.forEach(function(fruit){
      console.log(fruit.name);
    });

  }
});
