```
# 더미 데이터 프로지서

create procedure INSERT_PRODUCT_DUMMY_DATA()
begin
declare i int default 1; -- 반복문
while i <= 5000000 do
insert into board(writer, title, contents)
values("더미사용자", rand(), "내용입니당");
set i = i + 1;
end while;
end;

select \* from board
where number = 4088000

select \* from board
where title = '0.4650073120975935'

# 옵티마이저 계획확인

explain
select \* from board
where number = 4088000

explain
select \* from board
where title = '0.4650073120975935'

create index idx_title on board(title)
```
