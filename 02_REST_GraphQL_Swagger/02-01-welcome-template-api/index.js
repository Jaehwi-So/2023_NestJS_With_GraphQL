import {getWelcomeTemplate, checkValidationEmail, sendTemplateToEmail} from "./email.js";

function createUser(user){
    const isValid = checkValidationEmail(user.email);
    if(isValid){
        const template = getWelcomeTemplate(user);
        sendTemplateToEmail(user.email, template);
    }
}

const obj = {
    name: "재휘",
    age: "26",
    email: "asd@gmail.com",
    school: "상명대학교",
    createdAt: "2023-01-01"
}
createUser(obj);
