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

# 역인덱스(역색인)와 ElasticSearch

- 제목을 단어로 검색하려고 할 때 로우가 많으면 검색속도가 느림
- Board의 검색 전용 BoardSearch 테이블을 만듬
- Board 테이블에 한 줄이 들어오면 BoardSearch에 트리거로 데이터를 Insert시킴(역인덱스)
- 문장을 단어 단위로 쪼개서, 검색어별 글번호를 매칭시킴 (안녕 - 1,2,3 / 철수 - 1,2,6,7 / 점심 3, 8)
- 해당 검색방법을 자동으로 운용하게 가능한 ElasticSearch가 나옴
- 캐싱되었던 데이터는 Redis로, 없다면 ElasticSearch를 통해 검색 엔진이 운용됨
- 데이터의 사이즈가 작을 시에는 오버엔지니어링이므로 단순 SQL문을 이용

# 인덱스 vs 역인덱스

- 빠른 검색을 위한 인덱스 -> 이름이 "철수"인 사람 찾기
- 빠른 전문(Full-Text) 검색 -> 내옹에 "철수"가 포함된 내용 찾기

# ElasticSearch와 ELK

- Kibana : ElasticSearch을 차트로 시각화
- ElasticSearch는 백엔드를 거치지 않고 URL을 통해서 바로 데이터를 요청할 수 있음
- 대규모 서비스에서 많이 쓰이며, 컴퓨터에 분산하여 저장하고 사용한다.
- Data Node(컴퓨터)에 분산 저장하며, Master Node가 총괄
- elasticsearch, logstash, kibana는 Docker 사용 시 네임리졸루션을 고정시키는 것이 좋다(주소가 연결되어 있음)
- 엘라스틱서치 가이드북의 레퍼런스를 참고하자
- ELK는 Elasticsearch, Kibana, logstash

# ElasticSearch 연결

- yarn add @elastic/elasticsearch
- yarn add @nestjs/elasticsearch
- product.module.ts와 resolver에서 사용

# logstash 연결

- MySQL의 데이터는 Logstash가 ElasticSearch에 문장 검색용 데이터를 저장해준다.(폴링)
- logstash는 엘라스틱서치와 SQL의 연결통로
- elk 폴더 안에서 설정파일

# Analyzer

- "안녕하세요 철수입니다" 에서 안녕으로 검색했을 때에는 검색되지 않음
- Elasticsearch의 저장 구조는 단어인 토큰과 데이터를 가리키는 문서로 이루어짐
- 안녕하세요, 철수입니다를 각각 토큰으로 저장.
- Analyzer
  - 특수문자 없애주고(Character-filter), 공백으로 잘라주고(Tokenizer), 대문자는 소문자로 바꿔주는 기능(Token-filter)이 자동으로 들어감
- Analyzer 종류
  - standard : 디폴트 에널라이저
  - whitespace : 공백으로만 잘라줌(only Tokenizer)
  - keyword : 똑같이 입력했을 때에만 검색됨
  - 세개 이외에 Analyzer은 많음

# Setting과 Mapping

- Setting
  - 사용하고 싶은 에널라이저, 토크나이저, 토큰 필터 등을 미리 등록한다.
- Mappings
  - 어떤 컬럼을 어떤 에널라이저를 사용하여 분석할 것인지 미리 등록한다.
  - 이미 데이터가 들어간 상태에서 매핑을 바꾸는 것은 어렵다.
