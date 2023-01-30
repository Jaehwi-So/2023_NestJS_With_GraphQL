import axios from "axios";
import cheerio from 'cheerio'

const scraping = async (data) => {
    //입력된 데이터에서 http로 시작되는 글자 있는지 찾기
    const url = data.split(" ").filter((element) => {
        return element.includes("http://") || element.includes("https://");
    })
    //있다면 찾은 주소로 axios.get요청해서 html 받아오기 -> 스크래핑
    if(url && url.length > 0){
        const result = await axios.get(url);
        //스크래핑 결과에서 OG(오픈그래프) 코드 골라내서 변수에 저장하기(사이트 미리보기)
        const $ = cheerio.load(result.data);
        const obj = {};
        $("meta").each((index, element) => {    //<meta> 태그에서
            if($(element).attr("property")){    //property 속성이 있으면
                const key = $(element).attr("property").split(":")[1];
                const value = $(element).attr("content");
                obj[key] = value;
            }
        })
        console.log(obj);
    }
    
    
}

scraping("hi https://naver.com");