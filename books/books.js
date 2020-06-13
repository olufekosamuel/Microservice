const express = require('express');
const app = express();

const mongoose = require('mongoose');


app.use(express.json());
require('./Book');
const Book = mongoose.model('Book');

mongoose.connect('mongodb://127.0.0.1:27017/bookstore', { useNewUrlParser: true });

app.get('/',(req,res)=>{
    console.log(req.body);
    res.send("This is our main endpoint!");
})


//create book functionality
app.post('/books',(req,res)=>{
    var newBook = {
        title: req.body.title,
        author: req.body.author,
        numberPages: req.body.numberPages,
        publisher: req.body.publisher
    }

    //Create a new Book
    var book = new Book(newBook);
    book.save().then(()=>{
        res.status(200).send("New book created!");
    }).catch((err)=>{
        if(err){
            throw err;
        }
    })
});

app.get('/books',(req,res)=>{
    Book.find().then((books)=>{
        res.json(books);
    }).catch((err)=>{
        if(err){
            throw err;
        }
    })
})

app.get('/book/:id',(req,res)=>{
    Book.findById(req.params.id).then((book)=>{
        if(book){
            res.json(book);
        }
        else{
            res.sendStatus(404);
        }
    }).catch((err)=>{
        if(err){
            throw err;
        }
    })
});

app.delete('/book/:id',(req,res)=>{
    Book.findOneAndRemove(req.params.id).then((book)=>{
        res.send("Book removeed successfully with id: "+book.id);
    }).catch((err)=>{
        if(err){
            throw err;
        }
    })
});

app.listen(4545, ()=>{
    console.log("server is running books service");
});