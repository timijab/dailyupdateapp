const express = require('express');
const bodyParser = require('body-parser');
const lodash = require('lodash');
const mongoose = require('mongoose');

const app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static('public'));

app.set('view engine', 'ejs');

blogschema = mongoose.Schema({
    title: [String],
    post: [String]
});

mongoose.connect('mongodb+srv://admin-isaac:Test123@cluster0.rfa5zq9.mongodb.net/posts').catch(function(err){console.log(err);});
const post = mongoose.model('blogpost', blogschema);

const first_post = new post({title:['My first entry'], post:['This is my first post on the blog website, this is going to be a collection of my thoughts and truth. If you come across this please read and enjoy.']});
first_post.save();

const HomestartingContent = "What is Lorem IpsumLorem Ipsum is simply dummy text of the printing and typesetting industry.\n\   Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
const aboutcontent = "In this article, you will learn three different ways to create multiline strings in JavaScript. I will first explain the basics of strings ...";
const contactcontent = "Websites designer in Nigeria No reviews · Website designer Lagos · 0803 60 76208";



var index = 0;
app.get('/', (req, res) => {
    post.find({}).then(result => {
        var new_post = result[0].post;
        var new_title = result[0].title;
        // please work on this bug, the data in the database needs to load before page is rendered.
        res.render('home.ejs', {homecontent:HomestartingContent, newcontent:new_post, newtitle:new_title});
    });
    
});

app.get('/about', (req, res) => {
    res.render("aboutus.ejs", {aboutcontent:aboutcontent});
});

app.get('/contact', (req, res) => {
    res.render("contactus.ejs", {contactcontent:contactcontent});
});

app.get("/publish", (req, res)=>{
    res.render("publish.ejs", {});
});

// This is the point we are populating the array.
app.post("/publish", (req, res)=>{
    const newpost = req.body.daily;
    const newtitle = req.body.title;
    post.updateOne({},{$addToSet:{title:[newtitle], post:[newpost]}}).catch(function(err) {
        console.log(err);
    });
    setTimeout(function() {
        res.redirect('/');
    }, 1000);
    
});


// The link to the post individually.
app.get('/posts/:postsd', (req,res)=>{
    var post_title = req.params.postsd;
    lodash.replace(post_title, ' ', '-');
    post.find({}).then(function(results){
        // var title = new_post['title'];
        var title = results[0].title;
        // function that finds the lower case version
        title.forEach(element => {
            // if (post_title === lodash.lowerCase(element)){
            //     index = title.indexOf(element);
            // }
            if (post_title === lodash.lowerCase(element)){
                index = title.indexOf(element);
            }else{
                
            }
        
        });
        let posttitle = title[index];

        var content = results[0].post;
        let post_content = content[index];
       

        res.render('individual.ejs', {post_title:posttitle, post_content:post_content});
    }).catch(err=>console.log(err));
    
})

app.listen(3000, function name() {
    console.log('listening on port 3000')
});
// array.forEach(element => {
//    console.log(element);
// })
