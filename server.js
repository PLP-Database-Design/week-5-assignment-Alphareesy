//importing required packages
const express = require('express')
const mysql = require('mysql2')
const dotenv = require('dotenv')
const cors = require('cors')

//initializing express app
const app = express()


//setting the middlewares
app.use(express.json())
app.use(cors())

//setting the ejs engine
app.set('view engine', 'ejs')

//configuring the dotenv file
dotenv.config()

//creating connection to mysql db
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
})


//checking the success of the connection
db.connect(err => {
    if(err) return console.log('Error connecting...')
    
    console.log(`Connected successfully with ${db.threadId}`)
})


//Q1. Retrieve all patients
app.get('/patients', (req, res) => {
    const query = "SELECT patient_id, first_name, last_name, date_of_birth FROM patients"
    
    db.query(query, (err, result) => {
        if(err) return console.log('Failed to retrieve data')
        
        res.render('allPatientsData', {data: result})
    })
})

//2. Retrieve all providers
app.get('/providers', (req, res) => {
    const query = "SELECT first_name, last_name, provider_specialty FROM providers"
    
    db.query(query, (err, result) => {
        if(err) return console.log('Failed to retrieve data')
        
        res.render('allProviders', {data: result})
    })
})

//3. Filter patients by First Name
app.get('/filterPatients', (req, res) => {
    const query = "SELECT * FROM patients ORDER BY first_name ASC"
    
    db.query(query, (err, result) => {
        if(err) return console.log('Failed to retrieve data')
        
        res.render('filteredPatients', {data: result})
    })
})

//4. Retrieve all providers by their specialty
app.get('/filterProviders', (req, res) => {
    const query = "SELECT * FROM providers ORDER BY provider_specialty ASC"
    
    db.query(query, (err, result) => {
        if(err) return console.log('Failed to retrieve data')
        
        res.render('filteredProviders', {data: result})
    })
})

//listening to the server
const PORT = process.env.DB_PORT
app.listen(PORT, (req, res) => {
    console.log(`Listening on server ${PORT}`)
})