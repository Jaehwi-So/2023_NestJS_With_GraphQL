

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

export function sendSMS(phone, token) {
    console.log(`${phone}으로 ${token}을 전송합니다.`)
}



//함수 : 하나의 함수는 하나의 기능만 설계하는 것이 원칙 -> 퍼사드 패턴
