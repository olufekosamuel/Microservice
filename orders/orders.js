const express = require('express');
const app = express();
const mongoose = require('mongoose');
const axios = require('axios');

app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:27017/order', { useNewUrlParser: true }, ()=>{
    console.log("database connected - Orders service");
});

//model
require('./Order');
const Order = mongoose.model("Order"); 

//routes
app.post("/order", (req,res)=>{
    console.log(req.body);
    var newOrder = {
        CustomerID: mongoose.Types.ObjectId(req.body.customerID),
        BookID: mongoose.Types.ObjectId(req.body.bookID),
        initialDate: req.body.initialDate
    }

    var order = new Order(newOrder);

    order.save().then(()=>{
        res.send("Order created successfully!");
    }).catch((err)=>{
        console.log(err);
        if(err){
            throw err;
        }
    })
});

app.get("/orders", (req,res)=>{
    Order.find().then((books)=>{
        res.json(books);
    }).catch((err)=>{
        if(err){
            throw err;
        }
    })
});

app.get("/order/:id", (req,res)=>{
    Order.findById(req.params.id).then((order)=>{
        console.log(order.CustomerID);
        if(order){
            axios.get("http://localhost:5555/customer/", order.CustomerID).then((response)=>{
                console.log(response);
            }).catch((err)=>{
                console.log(err);
            })
        }
    }).catch((err)=>{
        if(err){
            throw err;
        }
    })
})


app.listen(7777, ()=>{
    console.log("server is running orders service");
})