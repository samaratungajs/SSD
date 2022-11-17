require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const connection = require("./config/db");
const PORT = process.env.PORT || 5000; 

const https = require('https')
const path = require('path')
const fs = require('fs')


const authRoute = require('./routes/auth')
const userRoute = require('./routes/user')
const noteRoute = require('./routes/note')
const fileRoute = require('./routes/file')

// database connection
connection();

// middlewares
app.use(express.json());
app.use(cors());

// routes
app.use('/api/auth', authRoute);
app.use('/api/user', userRoute);
app.use('/api/note', noteRoute);
app.use('/api/file', fileRoute );
app.use('/', (req,res) => {res.send('Server Running')});

const sslServer = https.createServer({
    key: fs.readFileSync(path.join(__dirname, 'cert', 'key.pem')),
    cert: fs.readFileSync(path.join(__dirname, 'cert', 'cert.pem'))
}, app)

sslServer.listen(5000, () => console.log('Secure server on port 5000'))
