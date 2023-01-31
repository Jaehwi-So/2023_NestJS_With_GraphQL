class Monster { //클래스
    constructor(name, power){
        this.name = name;
        this.power = power;
    }
    name;
    power = 10;

    attack = () => {
        console.log(this.name + " 공격한다 DMG: " + this.power);
    }
    run = () => {
        console.log(this.name + " 도망간다");
    }
}

//클래스 상속
class SkyMonster extends Monster { 
    constructor(name, power, speed){
        super(name, power)  //부모 생성자로 넘겨주기
        this.speed = speed;
    }
    run = () => {
        console.log(`${this.name} ${this.speed}로 날아서 도망간다`);
    }
}
class GroundMonster extends Monster { 
    run = () => {
        console.log(this.name + " 뛰어서 도망간다");
    }
}

const myMonster = new SkyMonster("피존투", 10, "1km/m");    
const myMonster2 = new GroundMonster("라이츄", 20);

myMonster.attack();
myMonster.run();
myMonster2.attack();
myMonster2.run();