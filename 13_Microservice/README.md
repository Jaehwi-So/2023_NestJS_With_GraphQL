# 마이크로서비스

- 서비스(API와 데이터베이스의 묶음)를 나누는 것
- 나누어진 프로젝트들의 진입점인 프로젝트를 하나 만들어 API 게이트웨이로 사용
- 규모가 커질 때 마이크로서비스를 도입하게 되고, 서비스마다 팀 단위로 운영됨

## 장점

- 장애가 날 때에도 일부 서비스만 마비되므로 타격이 상대적으로 덜하다.
- 일부 서비스가 수정될 때에도 전체를 빌드하지 않고 일부만 빌드하여 재배포하면 된다.

## 단점

- 전체적인 기술 복잡도의 증가

# REST

- yarn add@nestjs/microservices@9.2.1

# Graphql

- GateWay

  - yarn add @apollo/gateway yarn add @nestjs/apollo yarn add @nestjs/graphql yarn add apollo-server-express yarn add graphql

- Services
  - yarn add @apollo/federation yarn add @apollo/subgraph yarn add @nestjs/apollo yarn add @nestjs/graphql yarn add apollo-server-express yarn add graphql

# 인증?

- 인증을 따로따로 할 것인가? 혹은 게이트웨이에서 인증을 할 것인가??
