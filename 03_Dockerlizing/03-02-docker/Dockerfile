#DockerHub에서 Node.js Image Pull
FROM node:14

#index.js를 컨테이너 디렉터리로 복사. 없으면 알아서 폴더생성
COPY ./index.js /project/

WORKDIR /project/

# RUN node index.js 
#RUN은 여러번 사용 가능하다.

CMD node index.js
#CMD : 한번 사용 가능하다. CMD 이전에 완성된 부분까지 빌드시 진행되며, RUN시 CMD가 실행된다.

