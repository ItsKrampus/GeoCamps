const mongoose=require('mongoose');
const Campground=require('../models/campground');
const {places, descriptors}=require('./seedHelpers');
const cities=require('./cities');
const campground = require('../models/campground');


mongoose.connect('mongodb://127.0.0.1:27017/YelpCamp', {
    useNewUrlParser: true,
    // useCreateIndex: true,
    useUnifiedTopology: true
})

const db= mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open",()=>{
    console.log('database connected')
})


const sample= array=>array[Math.floor(Math.random() * array.length)]

const seedDb= async()=>{
    await campground.deleteMany({});
    for (let i = 0; i < 50; i++) {
        const random1000=Math.floor(Math.random()*1000);
        const price=Math.floor(Math.random() * 20)+10;
        const camp=new campground({
            author: '6575db544eb155a805af52a7',
            location:`${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description:"    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Excepturi, ea quia ad eum dolorum totam optio debitis nam porro assumenda reprehenderit qui minima suscipit quasi. Iure nostrum repellendus quo repudiandae?",
            price,
            images:[
                {
                    url: "https://res.cloudinary.com/dqu0ajetu/image/upload/v1702505572/YelpCamp/pexels-xue-guangjian-1687845_obvpdr.jpg",
                    filename:"pexels-xue-guangjian-1687845_obvpdr"
                },
                {
                    url:"https://res.cloudinary.com/dqu0ajetu/image/upload/v1702505574/YelpCamp/pexels-d%C6%B0%C6%A1ng-nh%C3%A2n-1328876_jtxxfd.jpg",
                    filename:"pexels-dương-nhân-1328876_jtxxfd"
                },
                {
                    url: "https://res.cloudinary.com/dqu0ajetu/image/upload/v1702505573/YelpCamp/pexels-vlad-bagacian-1061640_a4rq6x.jpg",
                    filename:"pexels-vlad-bagacian-1061640_a4rq6x"
                }


            ]

        })
        await camp.save();
    }
}

seedDb().then(()=>{
    mongoose.connection.close()
})