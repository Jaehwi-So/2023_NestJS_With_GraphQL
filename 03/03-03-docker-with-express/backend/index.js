import express from 'express'
import swaggerUi from 'swagger-ui-express';
import swaggerJsDoc from 'swagger-jsdoc';
import {swaggerOptions} from './swagger/config.js'
import cors from 'cors'
import {checkPhoneLength, sendSMS, createToken} from './service/phone.js'
import {getWelcomeTemplate, checkValidationEmail, sendTemplateToEmail} from "./service/email.js";

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

app.post('/tokens/phone', async (req, res) => {
    //1. 데이터 등록(DB에서 데이터 저장하기)
    const phoneNumber = req.body.phone
    const isValid = checkPhoneLength(phoneNumber);
    if(isValid){
        //2. 핸드폰 토큰 6자리 생성
        const token = createToken(6);
        //3. 토큰 전송하기
        await sendSMS(phoneNumber, token)
        res.send({success: true, token: token}); 
    }
    else{
        res.send({success: false, token: null})
    }
})


app.post('/users', async (req, res) => {
    const user = req.body.user;
    const isValid = checkValidationEmail(user.email);
    if(isValid){
        const template = getWelcomeTemplate(user);
        await sendTemplateToEmail(user.email, template);
        res.send({success: true, message: "가입완료"}); 
    }
    else{
        res.send({success: false, message: "가입실패"})
    }
})





app.listen(3001, () => {
    console.log(`Example app listening on port ${3001}`);
})

