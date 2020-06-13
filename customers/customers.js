const express = require('express');
const app = express();
const mongoose = require('mongoose');


app.use(express.json());
mongoose.connect('mongodb://127.0.0.1:27017/customer', { useNewUrlParser: true }, ()=>{
    console.log("database connected - Customers service");
});


require("./Customer");
const Customer = mongoose.model("Customer");


app.post("/customer", (req,res)=>{
    var newCustomer = {
        name: req.body.name,
        age: req.body.age,
        address: req.body.address,
    };

    var customer = new Customer(newCustomer)
    customer.save().then(()=>{
        res.send("Customer created successfully");
    }).catch((err)=>{
        if(err){
            throw err;
        }
    })
});

app.get("/customers", (req,res)=>{
    Customer.find().then((customers)=>{
        if(customer){
            res.json(customers);
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

app.get("/customer/:id", (req,res)=>{
    Customer.findById(req.params.id).then((customer)=>{
        res.json(customer);
    }).catch((err)=>{
        if(err){
            throw err;
        }
    })
})

app.delete("/customer/:id", (req,res)=>{
    Customer.findOneAndRemove(req.params.id).then((customer)=>{
        res.send("customer deleted successfully");
    }).catch((err)=>{
        if(err){
            throw err;
        }
    })
})

app.listen(5555,()=>{
    console.log("server is running customers service");
})