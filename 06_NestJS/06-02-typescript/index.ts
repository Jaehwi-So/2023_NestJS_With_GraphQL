// 타입추런
let a = "Hello"; //String

// 타입 명시
let b : string = "Hello";

//타입명시 필요한 상황
let c : string | number = "Hello";
c = 10;

//Boolean!!
let e : boolean = true;
//e = 'false'   문자열 불 회피에 유용

//배열
let f : number[] = [1, 2, 3, 4, 5];
let g : (string | number)[]= ["A", 1, 2, "B"]

//Object
interface Profile {
    name: string;
    age: number;
    school: string;
    hobby?: string; //Nullable
}

let h : Profile = {
    name: "철수",
    age: 10,
    school: "상명대학교"
};

h.hobby = "축구";


// Function
const add = (money1: number, money2: number, unit: string) : string => {
    return (money1 + money2) + unit;
}

const result = add(1000, 2000, "원");