- @Guard를 통해서 인가

- @UseGuards(AuthGuard('myAuth')) -> REST API에서는 여기까지만 하면 됨
- user.resolver와 commons/auth에 req 객체를 graphQL에서 사용할 수 있는 형태로 변경하는 AuthGuard 구현 및 이용
- @CurrentUser() currentUser: any -> req.user을 graphQL에서 사용할 수 있도록 커스텀 데코레이터를 생성(gql-user.param.ts)

# 브라우저

- localStorage : 브라우저를 껏다켜도 남아있음
- Cookie : 브라우저를 껏다켜도 남아있음, 별도의 로직처리를 하지 않아도 자동으로 요청에 첨부됨, 만료시간O, httpOnly, Secure
- sessionStorage: 브라우저를 껏다키면 사라짐

# Access Token과 RefreshToken

- 엑세스 토근은 30분~2시간
- 리프레쉬 토큰은 2주~2달
- 리프레쉬 토큰은 쿠키에 포함되어 요청할 때 함께 전달
- 엑세스 토큰 만료 시 쿠키에 포함된 리프레쉬 토큰으로 엑세스 토큰을 재발급받도록 함
- 재발급 로직은 리프레쉬토큰을 검증하여 인가한다.

# Cookie Parser 부착하기

main.ts에 app.use()로 설정
