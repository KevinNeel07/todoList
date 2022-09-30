const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/toList').then(()=>{
    console.log('DataBase Connection is Successfull');
}).catch((error)=>{
    console.log(error);
});