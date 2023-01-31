import { CashService } from "./services/cash.service.js";
import { ProductService } from "./services/product.service.js";

export class ProductController {

    constructor(cashService, productService) {
        this.cashService = cashService;
        this.productService = productService
    }

    buyProduct = (req, res) => {
        //1. 가진돈 검증하는 코드
        //const cashservice = new CashService();
        const hasMoney = this.cashService.checkValue();
        //2. 판매여부 검증하는 코드
        //const productService = new ProductService();
        const isSoldOut = this.productService.checkSoldOut();
    
        if(hasMoney && isSoldOut){
            //3. 상품 구매하는 코드
            res.send({
                message: "상품 구매완료"
            })
        }
        else{
            res.send({
                message: "상품 구매실패"
            })
        }
    }

    refundProduct = (req, res) => {
        //1. 판매여부 검증하는 코드
        //const productService = new ProductService();
        const isSoldOut = this.productService.checkSoldOut();
    
        if(isSoldOut){
            //2. 상품 환불하는 코드
            res.send({
                message: "상품 환불완료"
            })
        }
        else{
            res.send({
                message: "상품 환불실패"
            })
        }
    
    }
}