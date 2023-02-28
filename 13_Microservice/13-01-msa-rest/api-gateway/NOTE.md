# NestJS 프로젝트 생선
- cli 설치 : npm i -g @nestjs/cli
- nest new project-name : 새 프로젝트 만들기
- npx nest new project-name : 설치없이

* KT망에서 nest가 init되지않는분제 : https://velog.io/@librarian/ts-jest-%EC%84%A4%EC%B9%98-%EC%95%88%EB%90%98%EB%8A%94-%ED%98%84%EC%83%81

- ls -al : 숨겨진 파일보기
- cli로 init할때 git이 자동생성굄 -> 삭제 rm -rf .git

# NestJS 프로젝트 구조
- 초기 프로젝트 구조(보일러 플레이트)
* /test : 테스트 주도
* .eslintrc.js : 코딩문법규칙(==금지 등) 정의
* .prettirerrc : 코딩정리규칙(줄바꿈 등) 정의
* nest-cli.json: Nest 설정파일
* tsconfig.build.json / tsconfig.json : Typescript 설정파일

- dedvDependency : npm install --production 시 해당 디펜던시는 설치하지 않음

