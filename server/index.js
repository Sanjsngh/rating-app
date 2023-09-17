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
if (process.env.NODE_ENV === 'production') {
    //*Set static folder up in production
    app.use(express.static('client/build'));
    
    app.get('*', (req,res) => res.sendFile(path.join(__dirname, '..','client', 'build','index.html')));
}
app.use(express.static('public'));

app.use('/auth', authRouter);
app.use('/companies', companyRouter);
app.use('/users', userRouter);


app.listen(PORT, () => {
    console.log(`App is running at http://localhost:${PORT}`);
});

// console.log("heyyyyy: " + __dirname);