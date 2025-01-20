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
// CORS configuration
const corsOptions = {
    origin: '*', 
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
};

app.use(cors(corsOptions));

// Handle preflight requests
app.options('*', cors(corsOptions));

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
