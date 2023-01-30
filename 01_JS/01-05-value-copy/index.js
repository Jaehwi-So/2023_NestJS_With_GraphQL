//값의 복사
let a = "철수";
let b = a;
console.log(`${a}, ${b}`);
b = "훈이";
console.log(`${a}, ${b}`);

/*
1. 얕은 복사(Shallow Copy)
복사된 객체의 인스턴스 변수는 원본 객체와 같은 메모리 주소를 참조한다.
값이 변경되면 원본 및 복사 객체의 인스턴스 변수 값은 같이 변경된다.

2. 깊은 복사(Deep Copy)
객체를 복사 할 때, 해당 객체와 인스턴스 변수까지 복사하는 방식.
전부를 복사하여 새 주소에 담기 때문에 참조를 공유하지 않는다.
*/

//1. 객체 & 배열의 복사
let profile = {
    name : "짱구",
    age : 5
}
let copProfile = profile;   //같은 매모리 주소 참조
copProfile.name = "맹구";
console.log(profile);
console.log(copProfile);

let arr = [1, 2, 3];
let arr2 = arr;
arr2.push(4);
console.log(arr, arr2)

//2. 객체 & 배열의 복사 (스프레드 연산을 이용한 복사)

let copProfile2 = {
    ...profile
}   //다른 메모리 주소 참조

copProfile2.name = "유리";
console.log(profile);
console.log(copProfile2);

//# 스프레드 연산 이용
let copProfile3 = {
    ...profile,
    schhol: "떡잎유치원"
} 
console.log(copProfile3);

let arr3 = [...arr];
arr3.push(5);
console.log(arr, arr3);

//# REST 파라미터
const child = {
    name: "철수",
    age : 6,
    hobby: "수영",
    school: "떡잎유치원"
}

//원본또한 지워짐.
const child2 = child;
delete child2.school;
console.log(child);

//REST 파라미터 이용
const {age , ...child3} = child;
console.log("REST ", child3, child)


//스프레드 연산을 통한 복사의 문제점 
let member = {
    name : "짱구",
    age : 5,
    hobby: {
        hobby1: "운동",
        hobby2: "게임"
    }
}

let member2 = {
    ...member
}
member2.hobby.hobby2 = "독서";
console.log(member);    //원본이 변경됨. hobby는 객체. 같은 메모리 주소를 바라봄 (얕은 복사)
console.log(member2);

//# Fix. 그러나 Object가 복잡해질수록 한계
let member3 = {
    name: member.name,
    age: member.age,
    hobby: {
        ...member.hobby
    }
}
console.log(member3);

//3. 객체 & 배열의 복사 (깊은 복사)
//객체 -> JSON String -> 객체
let memberString = JSON.stringify(member);
let member4 = JSON.parse(memberString);
member4.hobby.hobby2 = "코딩";
console.log(member, member4);

//라이브러리 이용
import lodash from 'lodash'
const member5 = lodash.cloneDeep(member)
member5.hobby.hobby2 = "볼링";
console.log(member, member5);

//객체 안 Value를 Const형태로 유지하기
const people = Object.freeze({
    name : "짱구",
    age : 5,
    hobby: {
        hobby1: "운동",
        hobby2: "게임"
    }
});
//people.name = "맹구";
console.log(people)

