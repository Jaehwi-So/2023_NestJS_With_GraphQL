FROM node:14

WORKDIR /project2/

# 패키지 먼저 카피 후 인스톨해야 캐시를 사용할 수 있음. 전체 복사를 한 이후 하면 캐싱을 사용하지 않음
COPY ./package.json /project2/
COPY ./yarn.lock /project2/
RUN yarn install

COPY . /project2/

# RUN yarn install

CMD yarn dev