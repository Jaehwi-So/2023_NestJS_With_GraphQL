import coolsms from 'coolsms-node-sdk';
import dotenv from 'dotenv'
dotenv.config();


const API_KEY = process.env.API_KEY
const API_SECRET = process.env.API_SECRET
const SENDER_PHONE = process.env.SENDER_PHONE
export function checkPhoneLength(phone){
    if(phone.length != 10 && phone.length != 11){
        console.log('휴대폰 번호 자릿수 확인 요망')
        return false;
    } else{
        return true;
    }
}


//n자리의 랜덤값
export function createToken(length){
    //undefined와 null의 차이 : null은 강제로 비워졌을 때
    if(length === undefined){
        console.log('Error occured');
        return null;
    } else if(length <= 0) {
        console.log('Error occured');
        return null;
    }
    const token = String(Math.floor(Math.random() * 10 ** length)).padStart(length, "0"); // **은 거듭제곱 연산
    return token;
}

//인증문자 발송
export async function sendSMS(phone, token) {
    const mysms = coolsms.default;
    const messageService = new mysms(API_KEY, API_SECRET);
    const result = await messageService.sendOne({
        to: phone,
        from: SENDER_PHONE,
        text: `인증문자가 발송됩니다. ${token}`
    })
    console.log(`${phone}으로 ${token}을 전송합니다.` , result)
    return true;
}
