const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/shop');

const fruitSchema = mongoose.Schema({
    // validation
    // name: String,
    // review: String,
    // rating: Number
    name: {
        type: String,
        required: [true,"please check your entry no name specified"]
    },

    rating:{
        type: Number,
        min:1,
        max:10,
    },
    review: String
});

const Fruit = mongoose.model('fruit', fruitSchema, 'Fruit');

// new fruit.
const item = new Fruit({
    name:"stawberry",
    review: "This fruit is unavailable",
    rating: 9
})
item.save().catch((err) => {
    console.log(err);
});;

// Fruit.deleteOne({_id:"64b0feeca26322bda07e9726"}).catch((error) => {
//     console.log(error);});

// relationship tests
peopleSchema = mongoose.Schema({
    name: {type: String, required: true},
    favourite_fruit: String,
    age: Number
}) 

people = mongoose.model('people', peopleSchema);
persons = new people({
    name: "Isaac",
    favourite_fruit: item
})
persons.save();

// show the data in the database, we either use await in a an async function.
// or we use the then() method and then  the callback function.

db = Fruit.find({}).then(function (data) {
    data.forEach(function(item) {
        console.log(item.name);        
    });
    mongoose.connection.close();
});
