if (process.env.NODE_ENV !== "production") {
    require('dotenv').config();
}

const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const ejsMate = require('ejs-mate');
const session = require('express-session');
const flash = require('connect-flash');
const methodOverride = require('method-override');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const moment = require('moment');
const mongoSanitize = require('express-mongo-sanitize');
const helmet = require('helmet');
const MongoStore = require('connect-mongo');

const ExpressError = require('./utils/expressError');
const User = require('./models/user');
const petshopRoutes = require('./routes/petshops');
const reviewRoutes = require('./routes/reviews')
const userRoutes = require('./routes/users');
const PetShop = require('./models/petshop');

const dbUrl = process.env.DB_URL || 'mongodb://localhost:27017/petFrontier';
const secret = process.env.SECRET || 'petfrontier'


// mongoose config
main().catch(err => console.log(err));

async function main() {
    await mongoose.connect(dbUrl);
    console.log('Mongodb connection open.');
}

const app = express();
const port = process.env.PORT || 3000;


// *********************** config ***********************
// set up ejs view engine, views directory, and ejs-mate
app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// parse request body
app.use(express.urlencoded({ extended: true }));
// send patch and put requests
app.use(methodOverride('_method'));
// serve public directory
app.use(express.static(path.join(__dirname, 'public')));
// prevent mongo operator injection
app.use(mongoSanitize());

// create local variable available for the application
moment.locale('zh-cn');
app.locals.moment = moment; 

// session setup
const store = MongoStore.create({
    mongoUrl: dbUrl,
    secret: secret,
    touchAfter: 24 * 3600
})

store.on('error', function (e) {
    console.log('SESSION STORE ERROR', e)
})

const sessionConfig = {
    store,
    name: 'sessionPF',
    secret: secret,
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        // secure: true,
        // one-week-expiration
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7,
    }
}
app.use(session(sessionConfig));

// connect-flash
app.use(flash());

// helmet security headers setup
app.use(helmet());
const scriptSrcUrls = [
    "https://cdn.jsdelivr.net/",
    "https://code.jquery.com/",
    "https://webapi.amap.com/",
    "https://vdata.amap.com/",
    "https://restapi.amap.com/",
    "https://cache.amap.com/",
    "https://kit.fontawesome.com/",
    "https://cdnjs.cloudflare.com/",
    "https://cdn.jsdelivr.net",
];
const styleSrcUrls = [
    "https://kit.fontawesome.com/",
    "https://cdn.jsdelivr.net/",
    "https://vdata.amap.com/",
    "https://fonts.googleapis.com/",
    "https://use.fontawesome.com/",
];
const connectSrcUrls = [
    "https://ka-f.fontawesome.com/",
    "https://vdata.amap.com/",
];
const fontSrcUrls = [
    "https://fonts.gstatic.com/",
    "https://ka-f.fontawesome.com/",
];
app.use(
    helmet.contentSecurityPolicy({
        directives: {
            defaultSrc: [],
            connectSrc: ["'self'", ...connectSrcUrls],
            scriptSrc: ["'unsafe-inline'", "'self'","'unsafe-eval'", ...scriptSrcUrls],
            styleSrc: ["'self'", "'unsafe-inline'", ...styleSrcUrls],
            workerSrc: ["'self'", "blob:"],
            objectSrc: [],
            imgSrc: [
                "'self'",
                "blob:",
                "data:",
                "https://res.cloudinary.com/addisonshang/", 
                "https://images.unsplash.com/",
                "https://webapi.amap.com/",
                "https://vdata.amap.com/",
            ],
            fontSrc: ["'self'", ...fontSrcUrls],
        },
    })
);


// passport authentication
app.use(passport.initialize());
app.use(passport.session());
// use static authenticate method of model in LocalStrategy
passport.use(new LocalStrategy(User.authenticate()));
// use static serialize and deserialize of model for passport session support
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


// middlewares: flash & user authentication
app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
})

// routes
// homepage
app.get('/', async(req, res) => {
    const allShops = await PetShop.find({});
    res.render('home', { allShops });
})

// users
app.use('/', userRoutes);
// petshops
app.use('/petshops', petshopRoutes);
// reviews
app.use('/petshops/:id/reviews/', reviewRoutes);


// error handlers
app.all('*', (req, res, next) => {
    next(new ExpressError('Page Not Found', 404));
})

app.use((err, req, res, next) => {
    const { statusCode = 500 } = err;
    if (!err.message) err.message = 'Oops, something went wrong'
    res.status(statusCode).render('error', { err });
})

app.listen(port, () => {
    console.log(`Serving on port ${port}`);
})
