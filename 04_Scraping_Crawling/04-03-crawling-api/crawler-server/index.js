import puppeteer from 'puppeteer'
import mongoose from 'mongoose'
import { Stock } from './models/stock.model.js'

const crawling = async () => {
    const browser = await puppeteer.launch({headless: false}); //headless:브라우저 감춤 여부
    const page = await browser.newPage()
    await page.setViewport({width: 1280, height: 720})    //브라우저 창크기
    await page.goto("https://finance.naver.com/item/sise.naver?code=005930");   // url 뒤에 /robots.txt를 붙여 크롤링 허용 여부를 확인할 수 있다.
    //goto시 html을 한번에 받아오기 때문에 goto를 남발하지만 않는것이 좋다.
    await page.waitForTimeout(1000);    //타임아웃 기다림

    for(let i = 3; i <= 7; i++){
        //iframe 요소 안의 내용을 가져올 때
        const framePage = await page.frames().find((el) => (
            el.url().includes('/item/sise_day.naver?code=005930')
        ))
        const date = await framePage.$eval(
            `body > table.type2 > tbody > tr:nth-child(${i}) > td:nth-child(1)`,
            (el) => (el.textContent)
        )
        const price = await framePage.$eval(
            `body > table.type2 > tbody > tr:nth-child(${i}) > td:nth-child(2) > span`,
            (el) => (el.textContent)
        )
        console.log(date, price);
        const stock = new Stock({
            name: "삼성전자",
            date: date,
            price: Number(price.replace(",", ""))
        })

        await stock.save();
    }
    
    await browser.close();
}

//Mongodb connect
mongoose.connect('mongodb://localhost:27017/mydocker03'); //docker-compose로 연결되어 있으므로 네임리졸루션사용가능

crawling();