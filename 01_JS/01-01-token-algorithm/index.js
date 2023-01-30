createPhoneToken('01074099910', 6);

function createPhoneToken(phone, length){
    //1. 휴대폰자리 자릿수 확인
    if(phone.length != 10 && phone.length != 11){
        console.log('휴대폰 번호 자릿수 확인 요망')
    }

    //2. 핸드폰 토큰 6자리 생성
    //undefined와 null의 차이 : null은 강제로 비워졌을 때
    if(length === undefined){
        console.log('Error occured');
        return;
    } else if(length <= 0) {
        console.log('Error occured');
        return;
    }
    const token = String(Math.floor(Math.random() * 10 ** length)).padStart(length, "0"); // **은 거듭제곱 연산

    //3. 토큰 전송하기
    console.log(`${phone}으로 ${token}을 전송합니다.`)
}



//함수 : 하나의 함수는 하나의 기능만 설계하는 것이 원칙
