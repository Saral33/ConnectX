const mongoose = require('mongoose');
const config = require('config')
const db = config.get('mongoURI')




mongoose.connect(db,{
    useCreateIndex:true,
    useNewUrlParser:true,
    useUnifiedTopology: true,
    useFindAndModify: false
})
.then(()=>{
    console.log('MongoDb connected');
});