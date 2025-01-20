const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser')
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');
const productRoutes = require('./routes/product');
const cartRoutes = require('./routes/cart');
const { errorHandler } = require('./middleware/errorHandler');

const app= express();
connectDB();
app.use(cors())
app.use(bodyParser.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);

app.get('/' , (req,res) =>{
    res.send('Server is Hosted')
})

app.use(errorHandler);

app.listen(5000 ,() =>{
    console.log("server is running 5000")
})