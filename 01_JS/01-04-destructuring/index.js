
//객체의 구조분해할당
function getWelcomeTemplate({name, age, school, createdAt}){
    //const {name, age, schhol, createAt } = Object 의 형태로 구조분해할당됨
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
    console.log(result);
}

const obj = {
    name: "재휘",
    age: "26",
    school: "상명대학교",
    createdAt: "2023-01-01"
}
getWelcomeTemplate(obj);

const name = "철수";
const age = 15;
const school = "대신고등학교";
const date = "2022-01-02"

getWelcomeTemplate({name, age, school, createdAt : date})  //프로퍼티 이름이 같아야 구조분해할당이됨.