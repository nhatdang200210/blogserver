
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

//import Router
const authRoute = require('./routers/authRoute')
const postRoute = require('./routers/postRoute');

//import Error Handler
const { errorHandler } = require('./middlewares/errHandler');

const { register } = require('./controllers/authController')

const app = express();
//cors
app.use(cors());

//Body parser
app.use(express.json());

// app.use(register)

//Mount the route
app.use('/api/v1/auth', authRoute);
app.use('/api/v1/posts', postRoute);


// unhandler route
app.all('*', (req, res, next) => {
    const err = new Error('The route can not be found');
    err.statusCode = 404;
    statusCode = 404;
    next(err);
});

app.use(errorHandler);
const URI = 'mongodb+srv://admin:nhat2002@atlascluster.x2xu4rl.mongodb.net/?retryWrites=true&w=majority';

const PORT = 3001;


mongoose.connect(URI, { useNewUrlParser: true, useUnifiedTopology: true, })
    .then(() => {
        console.log('Connected to DB');
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    }).catch((err) => {
        console.log('err', err);
    });
