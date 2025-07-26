import express from 'express';
import expressEjsLayouts from 'express-ejs-layouts';
import router from './server/routes/main.mjs';
import { configDotenv } from 'dotenv';
import connectDB from './server/config/db.js';
import cookieParser from 'cookie-parser';

const app = express();
configDotenv();
const PORT = process.env.PORT || 4000;

export const JWT_SECRET = process.env.JWT_SECRET;

connectDB();

app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use(expressEjsLayouts);
app.set('layout', './layouts/main');
app.set('view engine', 'ejs');



app.use('/', router);
app.listen(PORT, () => {
    console.info(`Listening on port ${PORT}`);
});

