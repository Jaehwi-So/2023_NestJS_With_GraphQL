class Monster { //클래스
    //생성자
    constructor(name, power){
        this.name = name;
        this.power = power;
    }
    //속성
    name;
    power = 10;

    //메서드(객체 안의 함수)
    attack = () => {
        console.log(this.name + " 공격한다 DMG: " + this.power);
    }
    run = () => {
        console.log(this.name + " 도망간다");
    }
}

const myMonster = new Monster("피카츄", 10);    //인스턴스
const myMonster2 = new Monster("라이츄", 20);

myMonster.attack();
myMonster2.attack();
myMonster2.run();