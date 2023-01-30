import {checkPhoneLength, sendSMS, createToken} from './phone.js'
function createPhoneToken(phone){
    //1. 휴대폰자리 자릿수 확인
    const isValid = checkPhoneLength(phone);

    if(isValid){
        //2. 핸드폰 토큰 6자리 생성
        const token = createToken(6);

        //3. 토큰 전송하기
        sendSMS(phone, token)

        
    }
    
}

createPhoneToken('01074099910');