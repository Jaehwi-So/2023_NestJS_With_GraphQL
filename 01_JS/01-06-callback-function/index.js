//1. 일반 Function과 Arrow Function
function foo(x){
    return x;
}
const bar = (x) => {
    return x;
}

//2. 함수를 리턴하는 함수, Closure 함수 선언. 내부적으로 접근할 수 있는 함수 선언
const getDiscount = function(rate){
    return (function(price){
      return price * rate;
    });
  }
  
const getDiscount2 = rate => price => rate * price;

const getDiscount3 = (rate) => {
    return (price) => {
        return rate * price;
    };
};

console.log(getDiscount(0.5)(1000));    //500

//3. Function vs Arrow Function

//arrow function은 기존 함수의 this의 범위와 달리 본인의 컨텍스트를 고려하지 않고
//global 객체의 this를 사용한다.

function test1(arg) {
    //this.str = 'global'인 상태
    console.log('global this`:', this.str); //global
    return {
      str: 'inside',
      out: function(){
          console.log('inside this`:', this.str)    //일반 함수 : inside
        }
    };
  }
  
  //call(this, [arg1, arg2..]) : this값 및 전달된 인수와 함께 함수 호출
  test1.call({str : 'global'}, 'foo').out(); //this를 전달. 오버라이딩

  function test2(arg) {
    //this.str = 'global'인 상태
    console.log('global this`:', this.str); //global
    return {
      str: 'inside',
      out: () => console.log('inside this`:', this.str),  //Arrow function : global
    };
  }
  test2.call({str : 'global'}, 'bar').out();

  //call() 메소드는 주어진 this 값 및 각각 전달된 인수와 함께 함수를 호출합니다.


