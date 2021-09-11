const path = require('path')
const express = require('express')
const hbs = require('hbs')

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

//Define pathhs for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup hanndbars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)  // views folder has to be in root folder with exact name, otherwise this.
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirectoryPath))


app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather app',
        name: 'Abhijeet'
    })
})
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About weather app',
        name: 'Abhijeet'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        txt: 'Help text',
        name: 'Abhijeet'
    })
})
// app.get('/weather', (req, res) => {
//     if(!req.query.adress) {
//        return res.send({
//            error: 'Please enter adress'})
//     }
//     res.send({
//         forecast: 'raining',
//         location: 'Pune',
//         adress: req.query.adress
//     })
// })

app.get('/weather', (req, res) => {
    if(!req.query.adress) {
       return res.send({
           error: 'Please enter adress'})
    }else {
        geocode(req.query.adress, (error, {longitude, lattitude, location} = {}) => {     //={} to avoid destructuring of undefined
            if (error) {
                return res.send({error })              //object shorthand error: error
                
            }
            
            forecast(longitude, lattitude, (error,forecastData) =>{
                if (error) {
                    return error
                }
            res.send({
                forecast: forecastData,
                location,
                adress: req.query.adress
            })    
            
            })
        })
        
    }
    // res.send({
    //     forecast: 'raining',
    //     location: 'Pune',
    //     adress: req.query.adress
    // })
})


app.get('/products', (req, res) => {
    if(!req.query.search) {
        return  res.send('Please enter a search term..')
    }
    
    res.send({
        products: []
    })
})



// Setup 404 error page
app.get('/help/*', (req, res) => {
    res.render('error', {
        title: 'Error 404',
        txt: 'Help artcle not found',
        name: 'Abhijeet'
    })
})

app.get('*', (req, res) => {
    res.render('error', {
        title: 'Error 404',
        txt: 'Page not found',
        name: 'Abhijeet'
    })
})

app.listen(port, () => {
    console.log('Running on port' + port)
})