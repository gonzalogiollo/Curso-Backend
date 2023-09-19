import express from 'express';
import ProductsRouter from './routes/productsRouter.js'
import CartsRouter from './routes/cartsRouter.js';
import __dirname from './utils.js';
import mongoose from 'mongoose';
import handlebars from 'express-handlebars';
import ViewsRouter from './routes/viewsRouter.js';
import MongoStore from 'connect-mongo';
import session from 'express-session';
import SessionsRouter from './routes/sessionsRouter.js';
import UsersRouter from "./routes/usersRouter.js";
import mockingRouter from "./routes/mockingRouter.js";
import { addLogger } from "./utils/logger.js";

import logger from './routes/loggerRouter.js';	

import passport from 'passport';
import initializePassport from './config/passportConfig.js';
import cookieParser from 'cookie-parser';

import swaggerUi from 'swagger-ui-express';	
import swaggerJsDoc from 'swagger-jsdoc';	

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(`${__dirname}/public`));

app.engine('handlebars', handlebars.engine());
app.set('views', `${__dirname}/views`);
app.set('view engine', 'handlebars');
app.use(cookieParser());

try {
  await mongoose.connect('mongodb+srv://gonzalogiollo:ohP40AFjdzoOct7V@projectcoderhouse-backe.ooemzrs.mongodb.net/ecommerce?retryWrites=true&w=majority')
  console.log('DB connect')
} catch (error) {
  console.log(error)
}

const swaggerOptions = {	
  definition: {	
    openapi: '3.0.1',	
    info: {	
      title: 'Librería',	
      description:	
        'documentacion API librería',	
    },	
  },	
  apis: [`${__dirname}/docs/**/*.yaml`],	
};
const specs = swaggerJsDoc(swaggerOptions);	
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(specs));

app.listen(8080);

initializePassport();

const secret = 'Libreria-Tecnica';
app.use(
  session({
    store: MongoStore.create({
      client: mongoose.connection.getClient(),
      mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true },
      ttl: 3600,
    }),
    secret: secret,
    resave: true,
    saveUninitialized: true,
  })
);

app.use(addLogger);
app.use(passport.initialize());	
app.use(passport.session());


const sessionsRouter = new SessionsRouter();
app.use("/api/sessions", sessionsRouter.getRouter());

const viewsRouter = new ViewsRouter();
app.use("/", viewsRouter.getRouter());

const productsRouter = new ProductsRouter();
app.use("/api/products", productsRouter.getRouter());

const cartsRouter = new CartsRouter();
app.use("/api/carts", cartsRouter.getRouter());


const usersRouter = new UsersRouter();
app.use('/api/users', usersRouter.getRouter());

app.use('/mockingproducts', mockingRouter);
app.use('/logger', logger);














