const port = process.env.PORT || 5000;
const express = require('express')
const app = express();
const connectionDB = require('./src/Database/DBConnection');


//Import routers
const IndexRouter = require('./src/Routes/IndexRouter');
const UserRouter = require('./src/Routes/UserRouter');
const CompanyRouter = require('./src/Routes/CompanyRouter');
const AdminRouter = require('./src/Routes/AdminRouter');


//Database Connect
try {
    connectionDB.authenticate()
    console.log(`Success connecting to database postgres`)
} catch (error) {
    console.log(`Error connect to database. Error message: ${error}`)
}


//Middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true }))


//Public folder
app.use(express.static('public'));


//Routes
app.use('/', IndexRouter);
app.use('/user', UserRouter);
app.use('/company', CompanyRouter);
app.use('/admin', AdminRouter);


//Connect server
app.listen(port, () => {
    console.log(`Server is running at the url http://localhost:${port}`);
})