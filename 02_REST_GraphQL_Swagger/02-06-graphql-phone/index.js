import { ApolloServer, gql } from 'apollo-server'
import {checkPhoneLength, sendSMS, createToken} from './phone.js'
//yarn add applo-server graphql

// The GraphQL schema


//hello 요청 시 String이 반환됨
//
const typeDefs = gql`
  type BoardModel { # Output의 타입선언
    number: Int
    writer: String
    title: String
    contents: String
  }
  type ResponseModel {
    success: Boolean
    message: String
  }
  input BoardInputModel { #Input의 타입선언
    writer: String, 
    title: String, 
    contents: String
  }
  type Query { 
    fetchBoards: [BoardModel] # => 배열 안에 객체 하나 이상을 의미
  }
  type Mutation {
    createBoard(boardInput: BoardInputModel): ResponseModel
    createTokenOfPhone(phone: String): ResponseModel
  }
`;

let boardDB= [
  {number: 1, writer: "철수", title: "제목1임", contents: "내용임"},
  {number: 2, writer: "유리", title: "제목2임", contents: "내용임"},
  {number: 3, writer: "훈이", title: "제목3임", contents: "내용임"},
  {number: 4, writer: "맹구", title: "제목4임", contents: "내용임"},
] 

// A map of functions which return data for the schema.
const resolvers = {
  Query: {
    fetchBoards: () => {
      //1. 데이터 조회(DB에서 데이터 꺼내오기)
      const result = boardDB;   //DB 썼다고 가정
      //2. 결과 응답하기
      return result;
    }
  },
  Mutation: {
    createBoard: (parent, args, context, info) => {
      //context: requset, response 정보
      //args: 파라미터 => args.writer, args.title...
      //API to API => createBoard({writer: 철수, title: 제목...})을 호출하면 parent에 인자가 담겨옴

      //1. 데이터 등록(DB에서 데이터 저장하기)
      const data = args.boardInput;
      if(data.writer && data.title && data.contents){
          const object = {
              number: boardDB.length + 1,
              ...data
          }
          boardDB.push(object)
          //임의로 등록 했다고 가정

          //2. 결과 응답하기
          return {
            success: true,
            message: '등록성공'
          }
      }
      else{
        return {
          success: false,
          message: '등록성공'
        }
      }
    },

    createTokenOfPhone: (_, args) => {
      //1. 데이터 등록(DB에서 데이터 저장하기)
      const phoneNumber = args.phone
      const isValid = checkPhoneLength(phoneNumber);
      if(isValid){
          //2. 핸드폰 토큰 6자리 생성
          const token = createToken(6);
          //3. 토큰 전송하기
          sendSMS(phoneNumber, token)
          return {
            success: true,
            message: '인증완료'
          }
      }
      else{
        return {
          success: false,
          message: '인증실패'
        }
      }
    }
  }
};



const server = new ApolloServer({
  typeDefs : typeDefs,
  resolvers : resolvers,
});

server.listen(3001).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});

/*
mutation CreateBoard {
  createBoard(boardInput: {title: "짱구는", contents: "못말려", writer: "짱구"}
  ) {
    success
  }
}

query Query {
  fetchBoards {
    contents number
    title
    writer
  }
}
*/
