import express from 'express'
import {checkPhoneLength, sendSMS, createToken} from './phone.js'
//import * as phoneService fron './phone.js'
//중괄호 : 일부 import / * : 전체
//import express from 'express' -> export default로 선언된 서비스

//두개 import
import swaggerUi from 'swagger-ui-express';
import swaggerJsDoc from 'swagger-jsdoc';
import {swaggerOptions} from './swagger/config.js'
import cors from 'cors'

const app = express();
app.use(express.json());    //body의 JSON 파싱
/* cors set */
app.use(cors({
    origin: ['http://127.0.0.1:5500'] //허용할 origin
    //origin: "*"   //전체 허용하려면 이렇게 하거나 cors{}
}))
/* */
/* swagger setup */


//setup에서 쓰일 옵션 생성
const swaggerSpec = swaggerJsDoc(swaggerOptions)

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

/* end of swagger setup */

//DB 가정

let boardDB= [
    {number: 1, writer: "철수", title: "제목1임", contents: "내용임"},
    {number: 2, writer: "유리", title: "제목2임", contents: "내용임"},
    {number: 3, writer: "훈이", title: "제목3임", contents: "내용임"},
    {number: 4, writer: "맹구", title: "제목4임", contents: "내용임"},
] 

app.get('/boards/:id', (req, res) => {
    //1. 데이터 조회(DB에서 데이터 꺼내오기)
    const id = req.params.id
    const query = req.query.number
    const result = boardDB.find(x => {
        return x.number == id;
    });   //DB 썼다고 가정
    //2. 결과 응답하기
    res.status(200).send(result);
})

app.get('/boards', (req, res) => {
    //1. 데이터 조회(DB에서 데이터 꺼내오기)
    const result = boardDB;   //DB 썼다고 가정
    //2. 결과 응답하기
    res.status(200).send(result);
    
    
})


app.post('/boards', (req, res) => {
    //1. 데이터 등록(DB에서 데이터 저장하기)
    const data = req.body;
    console.log(data);
    if(data.writer && data.title && data.contents){
        const object = {
            number: boardDB.length + 1,
            ...data
        }
        boardDB.push(object)
        //임의로 등록 했다고 가정
    
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

app.post('/tokens/phone', (req, res) => {
    //1. 데이터 등록(DB에서 데이터 저장하기)
    const phoneNumber = req.body.phone
    const isValid = checkPhoneLength(phoneNumber);
    if(isValid){
        //2. 핸드폰 토큰 6자리 생성
        const token = createToken(6);
        //3. 토큰 전송하기
        sendSMS(phoneNumber, token)
        res.send({success: true, token: token}); 
    }
    else{
        res.send({success: false, token: null})
    }
})





app.listen(3000, () => {
    console.log(`Example app listening on port ${3000}`);
})