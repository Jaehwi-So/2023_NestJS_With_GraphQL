REST vs GraphQL
둘다 HTTP 통신임

REST 
주소처럼 생김 http://IP/board/1
응답 데이터에서 API가 반환해주는 모든 데이터를 받아야 함(Body가 무거워짐, 네트워크 비용(속도 감소, 실제 바용) 증가)'
프론트엔드 axios 사용 : yarn add axios
- CRUD : POST GET PUT DELETE
REST를 알아야 하는 이유
1. 기업들에서 예전부터 가장 많이 사용하는 방식.
2. 오픈API 제공방식이 REST의 형태인 곳이 많음

GraphQL 
페이스북이 창시, 사용자가 많은 서비스들(인스타, 깃허브, 에어비앤비, 페이스북 등이 채용)에 유리
함수처럼 생김 : board(1)
API의 응답 데이터에서 필요한 데이터만 받을 수 있음
프론트엔드 apollo client 사용 : yard add @apollo/client
- CUD : MUTATION (데이터의 변경 여부)
- R : QUERY (데이터를 변경하지 않음)

# 플레이그라운드 사용
# Write your query or mutation

- Insert
mutation{
  createProduct(seller:"재휘", createProductInput: {
    name:"축구공", detail: "한반두가 쓰던 공", price: 100
  }){
    _id
    number
    message
  }
}


- Update
mutation{
  updateProduct(productId: "0ea3e720-5dca-4c91-a20e-2ed9f913d8ef", updateProductInput: {
    name:"축구공", detail: "메시가 쓰던 공", price: 10000000
  }){
    _id
    number
    message
  }
}

- Argumant X
query{
  fetchBoardsCount
}

JSON
Javascript object notation
자바스크립트 객체 표기법
헤더 : 요약정보 (발신지, 내용포멧 등)
바디 : 내용(JSON, HTML 등)

API 테스트 : POSTMAN(REST), 플레이그라운드(GraphQL)
API 설명서 : Swagger(REST), 플레이그라우드(GraphQL)


yarn 사용법
yarn add express 
yarn remove express
yarn install -> package.json을 기반으로 node_modules 설치
yarn start : package.json의 스크립트 start 

Swagger 패키지
yarn add swagger-ui-express
yarn add swagger-jsdoc