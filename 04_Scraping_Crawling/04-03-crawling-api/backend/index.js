import express from 'express'
import swaggerUi from 'swagger-ui-express';
import swaggerJsDoc from 'swagger-jsdoc';
import {swaggerOptions} from './swagger/config.js'
import cors from 'cors'
import mongoose from 'mongoose';
import { Stock } from './models/stock.model.js'

const app = express();


app.use(express.json());    //body의 JSON 파싱
/* cors set */
app.use(cors({
    origin: '*' //허용할 origin
}))

/* swagger setup */
const swaggerSpec = swaggerJsDoc(swaggerOptions)

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

/* end of swagger setup */


app.get('/stocks', async (req, res) => {
    const stocks = await Stock.find();
    res.send(stocks);
})


//MongoDB connection
//mongoose.connect('mongodb://localhost/mydocker03'); localhost는 접속 안됨. Docker Service로 분리가 되어있기 때문
mongoose.connect('mongodb://my-database:27017/mydocker03'); //docker-compose로 연결되어 있으므로 네임리졸루션사용가능


app.listen(3001, () => {
    console.log(`Example app listening on port! ${3001}`);
})

