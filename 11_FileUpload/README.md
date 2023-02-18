# 파일 업로드 프로세스

- 파일은 데이터베이스에 BLOB으로 저장하면 용량이 너무 큼
- 서버 내부 파일 저장소나 스토리지에 보관
- 클라우드에서 스토리지 제공 : AWS, GCP, Azure..

1. 파일 업로드 요청 시 스토리지에 저장 후 URL 반환받음
2. 게시글과 함께 URL을 DB에 등록하는 요청을 함
3. 게시글을 얻어올 때 딸려온 URL로 이미지를 요청함

# Multer

- REST API Upload

# GraphQL Upload

- yarn add graphql-upload@13.0.0
- yarn add --dev @types/graphql-upload@8.0.11
- "graphql-upload": "^13.0.0",
- "@types/graphql-upload": "^8.0.11",
- graphQL 업로드 사용을 위해 main.ts에 추가
- Postman에서의 양식 확인

- yarn add @google-cloud/storage
