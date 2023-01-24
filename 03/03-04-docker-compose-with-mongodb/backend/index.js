import express from 'express'
import swaggerUi from 'swagger-ui-express';
import swaggerJsDoc from 'swagger-jsdoc';
import {swaggerOptions} from './swagger/config.js'
import cors from 'cors'
import {checkPhoneLength, sendSMS, createToken} from './service/phone.js'
import {getWelcomeTemplate, checkValidationEmail, sendTemplateToEmail} from "./service/email.js";
import mongoose from 'mongoose';
import { Board } from './models/board.model.js'

const app = express();


app.use(express.json());    //body의 JSON 파싱
/* cors set */
app.use(cors({
    origin: '*' //허용할 origin
    //origin: "*"   //전체 허용하려면 이렇게 하거나 cors{}
}))
/* */
/* swagger setup */


//setup에서 쓰일 옵션 생성
const swaggerSpec = swaggerJsDoc(swaggerOptions)

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

/* end of swagger setup */

/*
mongoose : ODM
*/
//DB 가정



app.get('/boards/:id', async (req, res) => {
    const id = req.params.id
    const result = await Board.findById(id);
    res.status(200).send(result);
})

app.get('/boards', async (req, res) => {
    const result = await Board.find();
    res.status(200).send(result);    
})


app.post('/boards', async (req, res) => {
    //1. 데이터 등록(DB에서 데이터 저장하기)
    const data = req.body;
    console.log(data);
    if(data.writer && data.title && data.contents){
        const board = new Board({
            writer: data.writer,
            title: data.title,
            contents: data.contents
        })

        await board.save();
    
        //2. 결과 응답하기
        res.status(200).send({
            success: true, 
            message : "게시물 등록 성공"
        });
    }
    else{
        res.status(400).send({
            success: false, 
            message : "요청이 잘못됨"
        });
    }

    
})


//MongoDB connection
//mongoose.connect('mongodb://localhost/mydocker03'); localhost는 접속 안됨. Docker Service로 분리가 되어있기 때문
mongoose.connect('mongodb://my-database:27017/mydocker03'); //docker-compose로 연결되어 있으므로 네임사용가능


app.listen(3001, () => {
    console.log(`Example app listening on port! ${3001}`);
})

