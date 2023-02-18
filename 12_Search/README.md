# 트리거와 프로시저

- 트리거 : 이벤트가 발생되면 실행
- 프로시저 : DB에서 함수 만들기

# 트리거와 BigQuery

- GCP에서도 제공해주는 용량이 제한없는 테이블.
- 용량 제한 없이 로그와 같은 것을 기록하기에 용이
- @google-cloud/bigquery
- 중요한 데이터의 처리는 트리거 사용 지양

# 프로시저

```
create procedure INSERT_PRODUCT_DUMMY_DATA()
begin
	declare i int default 1;	-- 반복문
	while i <= 5000000 do
		insert into board(writer, title, contents)
		values("더미사용자", rand(), "내용입니당");
		set i = i + 1;
	end while;
end;

```

# 인덱스

- Select의 성능 개선
- PK, FK, UNIQUE는 자동으로 인덱스 생성
  - show index from board;
- 인덱스가 걸려있는 컬럼을 포함하여 검색 시 빠르게 찾음
- 다른 컬럼에도 인덱스를 걸 수 있음
  - create index idx_title on board(title)
- 인덱스를 걸 시 조회할 때에는 빠르지만, 등록이나 수정이 느려짐 -> 무차별적인 인덱스는 위험
- 주로 검색조건에 빈번하게 사용되는 컬럼에만 선택적으로 인덱스를 거는 편

# DB의 검색특징

- 옵티마이저 : 검색을 효율적으로 해주는 데이터베이스의 내장기능
- 실행계획 : 효율적인 검색 계획(처음부터? 끝부터?)
- Explain 명령어 : 옵티마이저가 결정한 실행계획 보기
  - type에서 ALL이면 전체스캔, const면 인덱스로 검색(PK,FK,UNIQUE중)
  - ref에서 const 인덱스로 검색(내가 만든 인덱스중에서), range 인덱스에서 찾아볼 예정(크다, 작다 등 특정 범위 검색 중에서)
  - rows: 예상 검색 로우개수

# Redis

- 메모리기반 데이터베이스 (휘발성) -> 덤프를 통해 영구저장도 가능
- 임시 저장용 : Write-Back 패턴 -> Write시 Redis에 저장해 둔후 그 데이터를 MySQL에 저장
- 빠른 검색용 : Cache-Aside 패턴 -> 캐시가 있을 시 (cache-hit) MySQL이 아닌 Redis에서 검색, 없을 시 (cache-miss) MySQL에서 검색 후 Redis에 캐싱

# Redis 명령어

- redis-cli : cli 접속
- keys \* : 키 목록
- set mykey 1234 : 키 설정
- get mykey : 키의 값 얻어오기
- ttl mykey : 만료시간
- expire mykey 120 : 만료시간 설정

# Redis 사용을 위한 패키지

- yarn add redis cache-manager-redis-store@2.0.0 cache-manager@4.0.1
- yarn add @types/cache-manager-redis-store
