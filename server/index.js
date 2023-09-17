const express = require('express');
const cors = require('cors');
const app = express();
const path = require('path'); 
const authRouter = require('./router/Auth.js');
const companyRouter = require('./router/Companies.js');
const userRouter = require('./router/Users.js');

require('dotenv').config();
const PORT = process.env.PORT || 8000;
const clientPort = 3000;


const allowedOrigins = [`http://localhost:${clientPort}`];
const corsOptions = {
    origin: allowedOrigins,
    credentials: true, 
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));

app.use('/auth', authRouter);
app.use('/companies', companyRouter);
app.use('/users', userRouter);


app.listen(PORT, () => {
    console.log(`App is running at http://localhost:${PORT}`);
  });
