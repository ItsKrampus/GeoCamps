const express=require('express');
const path=require('path');
const mongoose=require('mongoose');
const Campground=require('./models/campground');
const methodOverride=require('method-override');
const ejsMate=require('ejs-mate')
const catchAsync=require("./utils/catchAsync")
const ExpressError=require("./utils/expressError")
const Joi=require('joi')
const {campgroundSchema,reviewSchema}=require('./schemas.js')
const Review=require("./models/review.js")


const campgrounds=require('./routes/campgrounds')
const reviews=require('./routes/reviews')

mongoose.connect('mongodb://127.0.0.1:27017/YelpCamp', {
    // useNewUrlParser: true,
    // useCreateIndex: true,
    // useUnifiedTopology: true
})

const db= mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open",()=>{
    console.log('database connected')
})

const app=express();

app.engine('ejs', ejsMate)
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


app.use(express.urlencoded({extended: true}))
app.use(methodOverride('_method'))
app.use(express.static(path.join(__dirname, 'public')))






app.use('/campgrounds', campgrounds)
app.use('/campgrounds/:id/reviews', reviews)

app.get('/', (req,res)=>{
    res.render('home')
})








app.all('*',(req, res, next)=>{
   next(new ExpressError('Page not Found', 404))
})



app.use((err,req,res,next)=>{
    const {statusCode=500}=err;
    if(!err.message) err.message="Oh No Something Went Wrong!"
    res.status(statusCode).render('error', {err});
})


app.listen(3000,()=>{
    console.log("LISTENING ON PORT: 3000!")
})