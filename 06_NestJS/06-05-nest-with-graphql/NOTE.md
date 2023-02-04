# NestJS에서 GraphQL 사용하기

yarn add @nestjs/graphql @nestjs/apollo graphql apollo-server-express

- GraphQL애서는 Controller 명칭보다 Resolver라는 명칭을 많이 씀
- main.ts에 GraphQLModule Importa하여 사용
- autoSchemaFile에 데코레이션을 통해 자동으로 생성된 스키마를 저장할 디렉터리 지정

# prettier 자동 사용하기

prettier은 줄바꿈 등 코드 정리 방식을 정해두고 사용할 수 있게 한다.  
자동으로 되게 하는 방법

- 프로젝트 최상단에 .vscode dir 생성
- 안에 settings.json 생성
- VScode에 prettier 확장 프로그램 설치
- settings.json 작성

```
{
  "editor.formatOnSave": true, //저장할때마다 포멧 저장
  "editor.defaultFormatter": "esbenp.prettier-vscode"
}
```
