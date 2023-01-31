import express from 'express'
import { ProductController } from './controllers/product.controller.js'
import { CouponController } from './controllers/coupon.controller.js'
import { CashService } from './controllers/services/cash.service.js';
import { ProductService } from './controllers/services/product.service.js';
import { PointService } from './controllers/services/point.service.js';
const app = express();

const cashService = new CashService();  //한번의 생성으로 재사용(싱글톤 패턴)
const productService = new ProductService();
const pointService = new PointService();

//Nest.js가 의존성 주입을 해주는 것 -> 제어의 역전(IoC)
const productController = new ProductController(cashService, productService);
app.post('/products/buy', productController.buyProduct) //상품 구매하기
app.post('/products/refund', productController.refundProduct) //상품 환불하기


const couponController = new CouponController(pointService);
app.post('/coupons/buy', couponController.buyCoupon) //쿠폰 구매하기
app.listen(3000, () => {
    console.log('App listen')
})
app.listen