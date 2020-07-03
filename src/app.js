const express=require('express')
const path=require('path')
const hbs =require('hbs')
const geocode=require('./utils/geocode')
const forecast=require('./utils/forcast')
//console.log(__dirname)
//console.log(path.join(__dirname,'../public'))

const app = express()

//Define paths for Express config
const publicdir=path.join(__dirname,'../public')
const viewspath=path.join(__dirname,'../templates/views')
const partialsPath=path.join(__dirname,'../templates/partials')

//Setup handlebars engine and view location
app.set('view engine','hbs')
app.set('views',viewspath)
hbs.registerPartials(partialsPath)

//setup static directory to serve
app.use(express.static(publicdir))

app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather',
        name:'Rahul raj'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title: 'About me',
        name:'Rahul Raj'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title:'Help',
        text:'Go to service center',
        name:'Rahul Raj'
    })
})

/*app.get('',(req, res)=>{
    res.send('Hello express')
})*/

// app.get('/help',(req,res)=>{
//     res.send('Help page')
// })

// app.get('/about',(req,res)=>{
//     res.send('<h1>About Page</h1>')
// })

app.get('/weather',(req,res)=>{
    if(!req.query.address)
    {
        return res.send({
            error: 'No address provided'
        })
    }
    geocode(req.query.address,(error,{latitude,longitude,location}={})=>{
        if(error)
        {
            return res.send({error})
        }
        forecast(latitude,longitude,(error,forecastData)=>{
            if(error)
            {
                return res.send({error})
            }
            res.send({
                forecast:forecastData,
                location,
                address: req.query.address
            })
        })
    })
    // console.log(req.query.address)
    // res.send({
    //     forcast : 'It is raining',
    //     location: req.query.address
    // })
}) 

app.get('/product',(req,res)=>{
    if(!req.query.search)
    {
        return res.send({
            error: 'Provide a search term'
        })
    }

    console.log(req.query.search)
    //query is very imp coz it provides the information we will write on the server
    res.send({
        products:[]
    })
})

app.get('/help/*',(req,res)=>{
    res.render('error',{
        title:'404',
        message: 'Help article not found',
        name:'Rahul Raj'
    })
})

app.get('*',(req,res)=>{
    res.render('error',{
        title:'404',
        name:'Rahul Raj',
        message:'Page not found'
    })
})

app.listen(3000,()=>{
    console.log('Server is up on port 3000.')
})