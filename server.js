const express = require('express');
const path = require('path')
require('./config/db');
const app = express();
const userRoute = require('./routes/api/user');
const authRoute = require('./routes/api/auth');
const profileRoute = require('./routes/api/profile')
const postRoute = require('./routes/api/post')



app.use(express.json({extended: false}))

app.use('/api/users',userRoute)
app.use('/api/auth', authRoute)
app.use('/api/profile', profileRoute)
app.use('/api/posts', postRoute)

if(process.env.NODE_ENV ==='production'){
    app.use(express.static('client/build'));
    app.get('*', (req,res)=>{
        res.sendFile(path.resolve(__dirname,'client','build','index.html'))
    })
}

const PORT = process.env.PORT || 5000;
app.listen(PORT,()=>{
    console.log(`The server is on port ${PORT}`);
})