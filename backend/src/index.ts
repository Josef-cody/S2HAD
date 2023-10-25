require("dotenv").config();
import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import cors from 'cors';

import router from './routes';
import mongoose from 'mongoose';

const app = express();

app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());

const helmet = require("helmet");
app.use(express.urlencoded({ extended: false }));

/*=================================
        Database
===================================*/

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connection Successfull");
  })
  .catch((err) => {
    console.log(err);
  });

//https://s2had.netlify.app
//http://localhost:5173
app.use(cors({
  origin: (requestOrigin: string | undefined, callback: (err: Error | null, allow?: boolean) => void): void  => {
      // allow requests with no origin
      if (requestOrigin && 'https://s2had.netlify.app'.indexOf(requestOrigin) === -1) {
          const message: string = "The CORS policy for this origin doesn't allow access from the particular origin.";
          return callback(new Error(message), false);
      } else {
          // tslint:disable-next-line:no-null-keyword
          return callback(null, true);
      }
  },
  methods: ['POST', 'PUT', 'GET', 'PATCH','OPTIONS', 'HEAD'],
}));

app.use('/',router());
const PORT = process.env.PORT || 8080;
// process.env.PORT || 
app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});

