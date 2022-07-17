const port = process.env.PORT || 5000;
const express = require('express')
const app = express();
const connectionDB = require('./src/Database/DBConnection');

//Import routers
const IndexRouter = require('./src/Routes/IndexRouter');

//Database Connect
connectionDB.authenticate().then(() => {
    console.log(`Success connecting to database postgres`)
}).catch(err => {
    console.log(`Error connect to database. Error message: ${err}`)
})

//Sessions


//Middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true }))


//Public folder
app.use(express.static('public'));


//Routes
app.use('/', IndexRouter);


//Connect server
app.listen(port, () => {
    console.log(`Server is running at the url http://localhost:${port}`);
})