import { CashService } from "./services/cash.service.js";

export class CouponController {
    constructor(cashService) {
        this.cashService = cashService  //CouponController는 CashService에 의존, 외부에서 Injection하는 의존성 주입
    }

    buyCoupon = (req, res) => {
        //1. 가진돈 검증하는 코드
        //const cashservice = new CashService();  //강한 결합. Tight Coupling <-> 약한 결합(느슨한 결합)
        const hasMoney = this.cashService.checkValue();
    
        if(hasMoney){
            //2. 쿠폰 구매하는 코드
            res.send({
                message: "쿠폰 구매완료"
            })
        }
        else{
            res.send({
                message: "쿠폰 구매실패"
            })
        }
    
    }
}