const mongoose = require('mongoose');

const DB = 'mongodb+srv://petrolynk:dmqeGjUPAuKt3PN@cluster0.ttnfhm6.mongodb.net/?retryWrites=true&w=majority';

mongoose
    .connect(DB, { 
        useNewUrlParser: true
      })
    .then(() => console.log('MongoDB connected...'))
    .catch(err => console.log(err));


