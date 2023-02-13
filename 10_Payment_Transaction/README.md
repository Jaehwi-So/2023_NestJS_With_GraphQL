# 결제

1. PG사와 계약 -> PG사(NHN, 나이스페이, KG이니시스..)가 카드사와의 결제 프로세스를 제공 -> PG사마다 프로세스가 다름
2. 결제솔루션 iamport -> API 제공(결제, 영수증, 결제취소.. )로 PG사들과 연계를 도와줌
3. iamport는 결제에 대한 uid를 제공하는데 이것을 DB에 저장하여 기록해주어야함.
4. 결제해 대해서는 카드사들의 승인을 받아야 함 -> iamport와 PG사의 승인요청 필요 -> 승인 기간에만 1달 이상이 소요되니 프로젝트 기간 선정에 유의해야 한다.
5. 웹훅 : 무통장 입금 Case : 은행에서 돈을 넣으면 아임포트가 Backend에 알려주는 역할

# GraphQL과 REST

POST /boards , GET /boards  
여러개의 엔드포인트, 응답 데이터의 규칙이 벡엔드에서 정해져있음  
두번을 패칭하고 싶으면 두번 요청을 해야함 -> 언더패칭(Underfatching)  
준비된 것을 모두 받아야 한다. -> 오버패칭(Overfatching)
->.  
POST /graphql (body : {createBoard() { }, fetchBoard() { } ).
BODY에 실행시킬 함수와 함수에서 받을 데이터를 담아서 graphql이라는 하나의 엔드포인트로 변경  
언더패칭, 오버패칭 문제를 개선  
언더패칭 개선을 위해 동시에 질의를 할 시에 둘 중하나만 성공하거나 해도 무조건 200

POST http://localhost:3000/graphql

- Header : content-type=application/json
- Body

```
{
    "query": "query { fetchProducts {name, description} }"
}
```

# 데이터 오염

- 일련의 과정에서 일부 성공 후 나머지 과정이 실패하였을 경우
- Transaction을 이용하여 일련의 과정을 묶어서 실패시 롤백시켜야함

# ACID(Atomicity, Consistency, Isolation, Durability) 트랜잭션

- A : 원자성, 모두 성공 or 모두 실패
- C : 같은 쿼리는 조회할 때마다 동일해야 함
- I : 1을 처리하는 동안 2는 기다려야 함
- D : 한번 성공했으면 장애가 발생해도 살아있어야 함

# 격리 수준

1. Read-Uncommitted : 커밋이 되지 않은 데이터를 조회 가능한 수준
2. Read-Committed : 커밋이 된 데이터만 조회 가능한 수준, 동일한 쿼리에 다른 결과가 나올 수 있음
3. Repeatable-Read : 동일한 쿼리에 동일한 결과를 보장, Phantom Read
4. Serializable : Phantom Read X, 자원에 대한 동시 접근을 Lock을 통해 막음

- 낙관적 Lock
- 비관적 Lock

  - 공유락 : Shared Lock, SLock, 읽기가능, 쓰기잠금 (pessimistic_read)
  - 베타락 : Exclusive Lock, XLock, 읽기쓰기 모두잠금 (pessimistic_write)  
    공유 자원에 대한 데드락에 유의 (User -> Board) 조회에 락을 건다면 역방향 조회 트랜잭션 락 X (Board->User X)

- MySQL에서는 Repeatable-Read가 Default
