import { getToday } from "./utils.js";


export function getWelcomeTemplate({name, age, school}){
    //const {name, age, schhol, createAt } = Object 의 형태로 구조분해할당됨

    const createdAt = getToday();
    const result = `
        <html>
            <body>
                <h1>${name}님 가입을 환영합니다.</h1>
                <hr/>
                <div>이름 : ${name}</div>
                <div>나이 : ${age}</div>
                <div>학교 : ${school}</div>
                <div>가입일 : ${createdAt}</div>
            </body>
        </html>
    `
    //console.log(result);
    return result;
}

export function checkValidationEmail(email){
    if(!email || !(email.includes("@"))){
        console.log("이메일 형식이 올바르지 않습니다.")
        return false;
    }else{
        return true;
    }
}

export function sendTemplateToEmail(email, template){
    console.log(`${email}로 ${template}을 전송합니다.`)
}